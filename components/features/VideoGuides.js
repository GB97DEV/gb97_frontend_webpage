/* eslint-disable @next/next/no-img-element */
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import {
  Row,
  Col,
  Collapse,
  Input,
  Button,
  Card,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaPlayCircle,
  FaTimes,
  FaClock,
  FaEye,
  FaBook,
  FaChartLine,
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaStepBackward,
  FaStepForward,
  FaEnvelope,
  FaCheckCircle,
  FaShareAlt,
  FaEyeSlash,
  FaRedo,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import UpButton from "../basic/UpButton";
import { Track } from "../../interface/TrackGuide";
import { FAQ } from "../../interface/FAQ";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Thumbnail from "../../assets/images/thumbnail.png";
import styles from "../../styles/VideoGuides.module.css";

const NAV_PURPLE = "#231F8C";
const ContinueGridMin = 360;

const VideoGuides = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(false);
  const [apiApps, setApiApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showUnwatchedOnly, setShowUnwatchedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [modalVideoOpen, setModalVideoOpen] = useState(false);
  const [modalVideoData, setModalVideoData] = useState({
    title: "",
    path: "",
    duration: "",
    views: 0,
    date: "",
    key: "",
    module: "",
    appIndex: 0,
    moduleIndex: 0,
    videoIndex: 0,
    isExternal: false,
  });
  const modalVideoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadingPreview, setLoadingPreview] = useState(null);
  const videoRefs = useRef({});
  const refs = useRef({});
  const searchInputRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState({});
  const [videoProgress, setVideoProgress] = useState({});
  const [resumeTime, setResumeTime] = useState(null);
  const [externalLoaded, setExternalLoaded] = useState(true);
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 992);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 220);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    if (!isMobile) return;
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, isMobile]);

  useEffect(() => {
    if (!isLoggedIn) router.push("/acceso");
  }, [isLoggedIn, router]);

  // Cargar datos de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("watchedVideos");
    if (saved) {
      try {
        setWatchedVideos(JSON.parse(saved));
      } catch {
        setWatchedVideos({});
      }
    }
    const savedP = localStorage.getItem("videoProgress");
    if (savedP) {
      try {
        setVideoProgress(JSON.parse(savedP));
      } catch {
        setVideoProgress({});
      }
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));
  }, [watchedVideos]);

  useEffect(() => {
    localStorage.setItem("videoProgress", JSON.stringify(videoProgress));
  }, [videoProgress]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(
        `https://api-dev-crm.gb97.ec/video-tutorial/filter?limit=10&page=${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (!resp.ok) throw new Error("Error al obtener datos");
      const data = await resp.json();
      if (data.response) {
        setApiApps(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        if ((data.data || []).length > 0) {
          setOpenSections((p) => ({ ...p, "app-0": true }));
        }
      } else {
        setApiApps([]);
        setTotalPages(1);
      }
    } catch (e) {
      console.error(e);
      toast.error("Error al cargar los videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData(currentPage);
  }, [isLoggedIn, currentPage]);

  const isExternalVideo = (url) =>
    !!url &&
    (url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.includes("vimeo.com") ||
      url.includes("dailymotion.com") ||
      url.includes("wistia.com"));

  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : null;
  };

  const getYouTubeEmbedUrl = (url) => {
    const id = getYouTubeVideoId(url);
    const origin =
      typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";
    if (!id) return url;
    return `https://www.youtube.com/embed/${id}?playsinline=1&rel=0&modestbranding=1&enablejsapi=1&iv_load_policy=3&autohide=1&fs=1&origin=${origin}`;
  };

  const getYouTubeThumbnail = (url) => {
    const id = getYouTubeVideoId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : Thumbnail.src;
  };

  const markVideoAsWatched = useCallback((id) => {
    setWatchedVideos((p) => {
      const n = { ...p, [id]: true };
      localStorage.setItem("watchedVideos", JSON.stringify(n));
      return n;
    });
  }, []);

  const openVideoModal = (videoData, appIndex, moduleIndex, videoIndex) => {
    Object.values(videoRefs.current).forEach((v) => {
      if (v?.pause) {
        v.pause();
        v.currentTime = 0;
      }
    });
    setLoadingPreview(null);
    setExternalLoaded(!isExternalVideo(videoData.videoUrl));

    const app = apiApps[appIndex];
    const module = app.modules[moduleIndex];
    const isExternal = isExternalVideo(videoData.videoUrl);

    setModalVideoData({
      title: videoData.title,
      path: videoData.videoUrl,
      duration: videoData.duration,
      views: videoData.views,
      date: new Date(videoData.uploadDate).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      key: videoData._id,
      module: module.name,
      appIndex,
      moduleIndex,
      videoIndex,
      isExternal,
    });

    setRelatedVideos(
      module.videos
        .filter((v, i) => i !== videoIndex)
        .map((v) => ({ ...v, isExternal: isExternalVideo(v.videoUrl) }))
    );

    const prog = videoProgress[videoData._id];
    if (prog?.duration > 0) {
      const pct = (prog.time / prog.duration) * 100;
      setResumeTime(pct > 3 && pct < 95 ? prog.time : null);
    } else setResumeTime(null);

    setModalVideoOpen(true);
    setShowControls(true);
  };

  // Auto-ocultar controles
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (!isFullscreen && !modalVideoData.isExternal) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => {
    if (modalVideoOpen && !modalVideoData.isExternal && !isFullscreen) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [modalVideoOpen, modalVideoData.isExternal, isFullscreen]);

  useEffect(() => {
    if (!modalVideoOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      setResumeTime(null);
      return;
    }
    if (modalVideoData.isExternal) {
      setIsPlaying(true);
      return;
    }
    if (isMobile) return;
    const t = setTimeout(() => {
      const vid = modalVideoRef.current;
      if (!vid) return;
      vid.volume = volume;
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    }, 200);
    return () => clearTimeout(t);
  }, [modalVideoOpen, modalVideoData.isExternal, isMobile, volume]);

  useEffect(() => {
    const vid = modalVideoRef.current;
    if (!vid || modalVideoData.isExternal) return;
    vid.volume = volume;
  }, [volume, modalVideoData.isExternal]);

  useEffect(() => {
    const vid = modalVideoRef.current;
    if (!vid || modalVideoData.isExternal) return;
    vid.muted = isMuted;
  }, [isMuted, modalVideoData.isExternal]);

  const handleVideoEnd = useCallback(() => {
    if (modalVideoData.key) markVideoAsWatched(modalVideoData.key);
  }, [modalVideoData.key, markVideoAsWatched]);

  useEffect(() => {
    if (modalVideoData.isExternal) return;
    const video = modalVideoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setDuration(video.duration);
      if (resumeTime && resumeTime < video.duration) {
        try {
          video.currentTime = resumeTime;
          setCurrentTime(resumeTime);
          setProgress((resumeTime / video.duration) * 100);
        } catch {}
      }
    };
    const onTime = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        const p = (video.currentTime / video.duration) * 100;
        setProgress(p);
        setVideoProgress((prev) => ({
          ...prev,
          [modalVideoData.key]: { time: video.currentTime, duration: video.duration },
        }));
        if (p > 95 && !watchedVideos[modalVideoData.key]) {
          setWatchedVideos((prev) => ({ ...prev, [modalVideoData.key]: true }));
        }
      }
    };
    const onEnd = () => {
      setVideoProgress((prev) => ({
        ...prev,
        [modalVideoData.key]: { time: 0, duration: video.duration || 0 },
      }));
      if (!watchedVideos[modalVideoData.key]) {
        setWatchedVideos((prev) => ({ ...prev, [modalVideoData.key]: true }));
      }
      handleVideoEnd();
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnd);
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnd);
    };
  }, [modalVideoOpen, modalVideoData.key, watchedVideos, modalVideoData.isExternal, handleVideoEnd, resumeTime]);

  const toggleFullscreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const onFS = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFS);
    return () => document.removeEventListener("fullscreenchange", onFS);
  }, []);

  const togglePlayPause = () => {
    if (modalVideoData.isExternal) return;
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };
  
  const seekVideo = (e) => {
    if (modalVideoData.isExternal) return;
    const v = modalVideoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    v.currentTime = pos * v.duration;
  };
  
  const updateHoverTime = (e) => {
    if (modalVideoData.isExternal) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setHoverTime(pos * duration);
  };
  
  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const toggleSection = (k) => setOpenSections((p) => ({ ...p, [k]: !p[k] }));
  const filterVideos = useCallback(
    (v) => {
      const txt = debouncedSearch;
      const matchesSearch =
        (v.title || "").toLowerCase().includes(txt) ||
        (v.description || "").toLowerCase().includes(txt);
      const matchesWatched = showUnwatchedOnly ? !watchedVideos[v._id] : true;
      return matchesSearch && matchesWatched;
    },
    [debouncedSearch, showUnwatchedOnly, watchedVideos]
  );
  
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    if (sidebarRef.current && refs.current[id]) {
      const activeItem = refs.current[id];
      sidebarRef.current.scrollTo({
        top: activeItem.offsetTop - sidebarRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
    if (isMobile) setIsSidebarOpen(false);
  };
  
  const toggleFAQ = (i) => setFaqOpenIndex((p) => (p === i ? null : i));

  const handleShare = (url) => {
    if (navigator.share && isMobile) {
      navigator
        .share({ title: "GB97 - Video", text: "Revisa este tutorial de GB97", url })
        .catch(() =>
          navigator.clipboard
            .writeText(url)
            .then(() => toast.success("¡Enlace copiado!"))
            .catch(() => toast.error("No se pudo compartir"))
        );
      return;
    }
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("¡Enlace copiado al portapapeles!"))
      .catch(() => toast.error("Error al copiar el enlace"));
  };

  const totalVideos = useMemo(
    () =>
      apiApps.reduce(
        (t, app) =>
          t + app.modules.reduce((s, m) => s + m.videos.filter(filterVideos).length, 0),
        0
      ),
    [apiApps, filterVideos]
  );
  const totalModules = useMemo(
    () =>
      apiApps.reduce(
        (t, app) => t + app.modules.filter((m) => m.videos.some(filterVideos)).length,
        0
      ),
    [apiApps, filterVideos]
  );

  const continueWatching = useMemo(() => {
    const items = [];
    apiApps.forEach((app, ai) => {
      app.modules.forEach((mod, mi) => {
        mod.videos.forEach((v, vi) => {
          const prog = videoProgress[v._id];
          if (prog?.duration > 0) {
            const pct = (prog.time / prog.duration) * 100;
            if (pct >= 3 && pct < 95) {
              items.push({
                appIndex: ai,
                moduleIndex: mi,
                videoIndex: vi,
                moduleName: mod.name,
                ...v,
                progressPct: Math.round(pct),
              });
            }
          }
        });
      });
    });
    return items.sort((a, b) => b.progressPct - a.progressPct);
  }, [apiApps, videoProgress]);

  const noResults = totalVideos === 0;

  if (!isLoggedIn || loading) {
    return (
      <div className={styles.authLoader}>
        <div className={styles.loaderContent}>
          <Spinner color="light" />
          <p>Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoGuidesLayout}>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 1039,
          }}
        />
      )}

      <aside
        ref={sidebarRef}
        className={styles.videoGuidesSidebar}
        style={
          isMobile
            ? {
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100dvh",
                maxHeight: "100svh",
                zIndex: 1040,
                display: "flex",
                flexDirection: "column",
                transform: `translateY(${isSidebarOpen ? "0%" : "102%"})`,
                transition: "transform 240ms cubic-bezier(.2,.8,.2,1)",
                background: NAV_PURPLE,
                color: "#fff",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {isMobile ? (
          <>
            <div
              style={{
                padding: "12px 12px 10px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.18)",
                background: NAV_PURPLE,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  aria-label="Cerrar índice"
                  onClick={() => setIsSidebarOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: 18,
                    padding: 6,
                  }}
                >
                  <FaTimes />
                </button>
                <div style={{ fontWeight: 800 }}>Índice de Contenido</div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "12px",
                background: NAV_PURPLE,
              }}
            >
              {apiApps.map((app, appIndex) => (
                <div
                  key={`app-${appIndex}`}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 12,
                    marginBottom: 12,
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(`app-${appIndex}`)}
                    className={styles.sectionButton}
                    aria-expanded={openSections[`app-${appIndex}`]}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px",
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                    }}
                  >
                    <FaBook className={styles.sectionIcon} />
                    <span style={{ fontWeight: 700 }}>{app.app}</span>
                    <FaChevronDown
                      className={`${styles.chevronIcon} ${openSections[`app-${appIndex}`] ? "open" : ""}`}
                      style={{ marginLeft: "auto" }}
                    />
                  </button>

                  <Collapse isOpen={openSections[`app-${appIndex}`]}>
                    <div style={{ padding: "6px 10px 12px 10px" }}>
                      {app.modules.map((m, i) => {
                        const filtered = m.videos.filter(filterVideos);
                        if (filtered.length === 0) return null;
                        return (
                          <div
                            key={`module-${i}`}
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: 10,
                              padding: 8,
                              marginBottom: 10,
                            }}
                          >
                            <span
                              onClick={() => scrollTo(`modulo-${m._id}`)}
                              ref={(el) => (refs.current[`modulo-${m._id}`] = el)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontWeight: 700,
                                color: "#fff",
                                cursor: "pointer",
                              }}
                            >
                              <span
                                className={styles.moduleBadge}
                                style={{
                                  background: "rgba(255,255,255,0.18)",
                                  border: "1px solid rgba(255,255,255,0.25)",
                                  color: "#fff",
                                }}
                              >
                                {i + 1}
                              </span>
                              {m.name}
                            </span>

                            <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
                              {filtered.map((v, j) => (
                                <span
                                  key={`video-${v._id}`}
                                  onClick={() => scrollTo(`video-${v._id}`)}
                                  ref={(el) => (refs.current[`video-${v._id}`] = el)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    color: "#fff",
                                    cursor: "pointer",
                                    padding: "8px 8px",
                                    borderRadius: 8,
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                  }}
                                >
                                  <span
                                    className={styles.videoBadge}
                                    style={{
                                      background: "rgba(0,200,120,0.25)",
                                      border: "1px solid rgba(255,255,255,0.25)",
                                      color: "#fff",
                                    }}
                                  >
                                    {i + 1}.{j + 1}
                                  </span>
                                  <span style={{ flex: 1 }}>{v.title}</span>
                                  {watchedVideos[v._id] && <FaCheckCircle style={{ color: "rgb(16,185,129)" }} />}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                </div>
              ))}

              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleSection("track")}
                  className={styles.sectionButton}
                  aria-expanded={openSections.track}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                  }}
                >
                  <FaChartLine className={styles.sectionIcon} />
                  <span style={{ fontWeight: 700 }}>GB97 Track Guias - PDF</span>
                  <FaChevronDown
                    className={`${styles.chevronIcon} ${openSections.track ? "open" : ""}`}
                    style={{ marginLeft: "auto" }}
                  />
                </button>
                <Collapse isOpen={openSections.track}>
                  <div style={{ padding: "6px 10px 12px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {Track.map((t, i) => (
                      <a
                        key={`track-${i}`}
                        href={t.path}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: "#fff",
                          textDecoration: "none",
                          padding: 8,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <span
                          className={styles.trackBadge}
                          style={{
                            background: "rgba(255,255,255,0.18)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            color: "#fff",
                          }}
                        >
                          {i + 1}
                        </span>
                        {t.title}
                      </a>
                    ))}
                  </div>
                </Collapse>
              </div>

              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenFAQ(true);
                    setIsSidebarOpen(false);
                    setTimeout(() => scrollTo("FAQ"), 50);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "transparent",
                    color: "#fff",
                  }}
                >
                  <FaQuestionCircle />
                  <span style={{ fontWeight: 700 }}>Preguntas frecuentes</span>
                </button>
              </div>
            </div>

            <div style={{ height: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }} />
          </>
        ) : (
          <div className={styles.videoGuidesSidebar}>
            <div className={styles.sidebarHeaderContainer}>
              <h4 className={styles.sidebarHeader}>Índice de Contenido</h4>
              <div className={styles.sidebarDivider}></div>
            </div>

            {apiApps.map((app, appIndex) => (
              <div className={styles.sidebarSection} key={`app-${appIndex}`}>
                <button
                  type="button"
                  onClick={() => toggleSection(`app-${appIndex}`)}
                  className={styles.sectionButton}
                  aria-expanded={openSections[`app-${appIndex}`]}
                >
                  <FaBook className={styles.sectionIcon} />
                  <span>{app.app}</span>
                  <FaChevronDown className={`${styles.chevronIcon} ${openSections[`app-${appIndex}`] ? "open" : ""}`} />
                </button>
                <Collapse isOpen={openSections[`app-${appIndex}`]}>
                  {app.modules.map((m, i) => {
                    const filtered = m.videos.filter(filterVideos);
                    if (filtered.length === 0) return null;
                    return (
                      <div key={`module-${i}`} className={styles.itemGroup}>
                        <span
                          className={`${styles.groupTitle} ${activeSection === `modulo-${m._id}` ? "active" : ""}`}
                          onClick={() => scrollTo(`modulo-${m._id}`)}
                          ref={(el) => (refs.current[`modulo-${m._id}`] = el)}
                        >
                          <span className={styles.moduleBadge}>{i + 1}</span>
                          {m.name}
                        </span>
                        {filtered.map((v, j) => (
                          <span
                            key={`video-${v._id}`}
                            className={`${styles.subItem} ${activeSection === `video-${v._id}` ? "active" : ""}`}
                            onClick={() => scrollTo(`video-${v._id}`)}
                            ref={(el) => (refs.current[`video-${v._id}`] = el)}
                          >
                            <span className={styles.videoBadge}>
                              {i + 1}.{j + 1}
                            </span>
                            {v.title}
                            {watchedVideos[v._id] && <FaCheckCircle className={styles.watchedIcon} />}
                          </span>
                        ))}
                      </div>
                    );
                  })}
                </Collapse>
              </div>
            ))}

            <div className={styles.sidebarSection}>
              <button
                type="button"
                onClick={() => toggleSection("track")}
                className={styles.sectionButton}
                aria-expanded={openSections.track}
              >
                <FaChartLine className={styles.sectionIcon} />
                <span>GB97 Track Guias - PDF</span>
                <FaChevronDown className={`${styles.chevronIcon} ${openSections.track ? "open" : ""}`} />
              </button>
              <Collapse isOpen={openSections.track}>
                {Track.map((t, i) => (
                  <a key={`track-${i}`} href={t.path} className={styles.subItem} target="_blank" rel="noreferrer">
                    <span className={styles.trackBadge}>{i + 1}</span>
                    {t.title}
                  </a>
                ))}
              </Collapse>
            </div>

            <div className={styles.sidebarSection}>
              <button
                type="button"
                onClick={() => {
                  setOpenFAQ(true);
                  scrollTo("FAQ");
                }}
                className={`${styles.sectionButton} ${styles.faqButtonStyle}`}
              >
                <FaQuestionCircle className={styles.faqIcon} />
                <span>Preguntas frecuentes</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      <main className={styles.videoGuidesMain}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.mainHeader}>
                <FaPlayCircle className={styles.headerIcon} />
                Tutoriales GB97
              </h1>
              <p className={styles.subHeader}>Aprende con nuestros tutoriales paso a paso</p>
            </div>
            <HeaderStats totalVideos={totalVideos} totalModules={totalModules} />
          </div>
        </div>

        <div className={styles.searchUploadContainer}>
          <div className={styles.searchUploadBar}>
            <div className={styles.searchBar} onClick={() => searchInputRef.current?.focus()}>
              <Input
                innerRef={searchInputRef}
                placeholder="Buscar vídeos por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar videos"
                className={styles.searchInput}
                inputMode="search"
                enterKeyHint="search"
              />
              {searchTerm && (
                <button className={styles.clearSearch} onClick={() => setSearchTerm("")} aria-label="Limpiar búsqueda">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {isMobile && continueWatching.length > 0 && (
          <ContinueWatching
            isMobile={isMobile}
            items={continueWatching}
            openVideoModal={openVideoModal}
            isExternalVideo={isExternalVideo}
            getYouTubeThumbnail={getYouTubeThumbnail}
          />
        )}

        <section className={styles.videosGrid}>
          {apiApps.map((app, appIndex) => (
            <div key={`app-content-${appIndex}`}>
              <h2 id={`app-${app._id}`} className={styles.appTitle}>
                {app.app}
              </h2>

              {app.modules.map((m, i) => {
                const filtered = m.videos.filter(filterVideos);
                if (filtered.length === 0) return null;

                return (
                  <div key={`module-content-${i}`}>
                    <h3 id={`modulo-${m._id}`} className={styles.moduleTitle} ref={(el) => (refs.current[`modulo-${m._id}`] = el)}>
                      <span className={styles.moduleNumber}>{i + 1}</span>
                      {m.name}
                      <span className={styles.moduleCount}>{filtered.length} videos</span>
                    </h3>

                    <Row>
                      {filtered.map((v, j) => {
                        const external = isExternalVideo(v.videoUrl);
                        const yt = external && (v.videoUrl.includes("youtube.com") || v.videoUrl.includes("youtu.be"));
                        const thumb = yt ? getYouTubeThumbnail(v.videoUrl) : Thumbnail.src;
                        const prog = videoProgress[v._id];
                        const pct = prog?.duration > 0 ? Math.min(99, Math.round((prog.time / prog.duration) * 100)) : 0;

                        return (
                          <Col md="4" sm="6" xs="12" key={`video-card-${j}`} id={`video-${v._id}`} ref={(el) => (refs.current[`video-${v._id}`] = el)}>
                            <Card className={styles.videoCard} onClick={() => openVideoModal(v, appIndex, i, j)}>
                              <div
                                className={styles.videoThumb}
                                onMouseEnter={() => {
                                  if (isMobile || external) return;
                                  const vid = videoRefs.current[v._id];
                                  if (vid) {
                                    setLoadingPreview(v._id);
                                    vid.play().catch(() => setLoadingPreview(null));
                                  }
                                }}
                                onMouseLeave={() => {
                                  if (isMobile || external) return;
                                  const vid = videoRefs.current[v._id];
                                  if (vid) {
                                    vid.pause();
                                    vid.currentTime = 0;
                                    setLoadingPreview(null);
                                  }
                                }}
                              >
                                {loadingPreview === v._id && (
                                  <div className={styles.loadingOverlay}>
                                    <Spinner size="sm" color="light" />
                                    <span className={styles.loadingText}>Cargando...</span>
                                  </div>
                                )}

                                {watchedVideos[v._id] && (
                                  <div className={styles.watchedBadge}>
                                    <FaCheckCircle />
                                  </div>
                                )}

                                {external ? (
                                  <img src={thumb} alt={v.title} className={styles.videoThumbImage} loading="lazy" />
                                ) : (
                                  <video
                                    ref={(el) => (videoRefs.current[v._id] = el)}
                                    poster={Thumbnail.src}
                                    src={v.videoUrl}
                                    muted
                                    loop
                                    preload="metadata"
                                    playsInline
                                    onCanPlay={() => setLoadingPreview(null)}
                                  />
                                )}

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare(v.videoUrl);
                                  }}
                                  className={styles.shareButton}
                                  aria-label="Compartir"
                                >
                                  <FaShareAlt />
                                </button>

                                <div className={styles.playIcon}>
                                  <FaPlayCircle size={isMobile ? 40 : 50} />
                                </div>
                                <div className={styles.videoOverlay}></div>

                                {pct > 0 && (
                                  <div className={styles.progressBarContainer}>
                                    <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                                  </div>
                                )}

                                <div className={styles.videoMeta}>
                                  <span className={styles.metaItem}>
                                    <FaClock /> {v.duration || "--:--"}
                                  </span>
                                  <span className={styles.metaItem}>
                                    <FaEye /> {v.views || 0}
                                  </span>
                                  {external && <span className={styles.externalBadge}>{yt ? "YouTube" : "Ext"}</span>}
                                </div>
                              </div>
                              <div className={styles.videoInfo}>
                                <p className={styles.videoTitle}>
                                  <span className={styles.videoNumber}>{i + 1}.{j + 1}</span>
                                  {v.title}
                                  {watchedVideos[v._id] && <FaCheckCircle className={styles.watchedIconSmall} />}
                                </p>
                                <p className={styles.videoDescription}>{v.description}</p>
                              </div>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                );
              })}
            </div>
          ))}
        </section>

        {noResults && (
          <div className={styles.emptyState}>
            <p>Sin resultados</p>
            <p>Intenta con otra palabra clave o desactiva los filtros</p>
            <div className={styles.emptyStateButtons}>
              <Button size="sm" onClick={() => setSearchTerm("")}>Limpiar búsqueda</Button>
              {showUnwatchedOnly && (
                <Button size="sm" onClick={() => setShowUnwatchedOnly(false)} color="secondary">
                  Mostrar todos
                </Button>
              )}
            </div>
          </div>
        )}

        <div className={styles.paginationControls}>
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className={styles.paginationButton}>
            Anterior
          </Button>
          <span className={styles.paginationText}>Página {currentPage} de {totalPages}</span>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className={styles.paginationButton}>
            Siguiente
          </Button>
        </div>

        {openFAQ && (
          <section id="FAQ" ref={(el) => (refs.current.FAQ = el)} className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2>
                <FaQuestionCircle className={styles.faqHeaderIcon} />
                Preguntas Frecuentes
              </h2>
              <p>Encuentra respuestas a las preguntas más comunes</p>
            </div>
            <div className={styles.faqGrid}>
              {FAQ.map((q, k) => (
                <div key={`faq-${k}`} className={styles.faqItem}>
                  <div
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(k)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && toggleFAQ(k)}
                  >
                    <h5>
                      <span className={styles.faqNumber}>{k + 1}</span>
                      {q.question}
                    </h5>
                    <FaChevronDown className={`${styles.faqChevron} ${faqOpenIndex === k ? styles.open : ""}`} />
                  </div>
                  <Collapse isOpen={faqOpenIndex === k}>
                    <div className={styles.faqAnswer}>
                      <p>{q.answer}</p>
                      {q.additional && <div className={styles.faqAdditional}>{q.additional}</div>}
                    </div>
                  </Collapse>
                </div>
              ))}
            </div>
          </section>
        )}

        <UpButton />

        {isMobile && (
          <nav className={styles.mobileFooter}>
            <button onClick={() => setIsSidebarOpen(true)}>
              <FaBook /> Índice
            </button>
            <button onClick={() => setShowUnwatchedOnly((p) => !p)} data-active={showUnwatchedOnly}>
              <FaEyeSlash /> {showUnwatchedOnly ? "No vistos" : "Todos"}
            </button>
            <button onClick={() => { setOpenFAQ(true); setTimeout(() => scrollTo("FAQ"), 100); }}>
              <FaQuestionCircle /> FAQ
            </button>
          </nav>
        )}

        {/* MODAL VIDEO - ESTILO YOUTUBE */}
        <Modal
          isOpen={modalVideoOpen}
          toggle={() => setModalVideoOpen(false)}
          className={styles.videoModal}
          size="xl"
          centered
          backdrop="static"
          modalClassName={styles.modalFullscreen}
        >
          <ModalHeader toggle={() => setModalVideoOpen(false)} className={styles.modalVideoHeader}>
            <div className={styles.modalHeaderContent}>
              <h3 className={styles.truncateTitle}>{modalVideoData.title}</h3>
              <div className={styles.moduleTag}>
                {modalVideoData.module}
                {watchedVideos[modalVideoData.key] && <FaCheckCircle className={styles.watchedIconModal} />}
              </div>
            </div>
          </ModalHeader>
          <ModalBody className={styles.modalBody}>
            <div className={styles.youtubeStyleModal}>
              <div 
                ref={videoContainerRef} 
                className={`${styles.videoContainer} ${isFullscreen ? styles.fullscreen : ""}`}
                onMouseMove={!modalVideoData.isExternal ? handleMouseMove : undefined}
              >
                <div className={styles.videoWrapper}>
                  {modalVideoData.isExternal ? (
                    <>
                      {!externalLoaded && (
                        <div className={styles.videoLoader}>
                          <Spinner color="light" />
                        </div>
                      )}
                      <iframe
                        src={getYouTubeEmbedUrl(modalVideoData.path)}
                        className={styles.videoIframe}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        title={modalVideoData.title}
                        onLoad={() => setExternalLoaded(true)}
                      />
                    </>
                  ) : (
                    <video
                      ref={modalVideoRef}
                      src={modalVideoData.path}
                      className={styles.videoPlayer}
                      onClick={togglePlayPause}
                      playsInline
                    />
                  )}
                </div>

                {/* Controles personalizados (solo para videos internos en desktop) */}
                {!modalVideoData.isExternal && !isMobile && (
                  <div className={`${styles.videoControlsOverlay} ${showControls ? styles.visible : ""}`}>
                    <div className={styles.controlsTop}>
                      <div className={styles.videoTitleControl}>{modalVideoData.title}</div>
                    </div>
                    
                    <div className={styles.controlsBottom}>
                      <div className={styles.progressBarContainer} onClick={seekVideo} onMouseMove={updateHoverTime}>
                        <div className={styles.progressBarTrack}>
                          <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
                          {hoverTime !== null && (
                            <div className={styles.hoverTimeIndicator} style={{ left: `${(hoverTime / duration) * 100}%` }}>
                              {formatTime(hoverTime)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className={styles.controlsRow}>
                        <div className={styles.controlsLeft}>
                          <button className={styles.controlBtn} onClick={togglePlayPause}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                          </button>
                          <button className={styles.controlBtn} onClick={() => {
                            const { appIndex, moduleIndex, videoIndex } = modalVideoData;
                            const app = apiApps[appIndex];
                            const module = app.modules[moduleIndex];
                            const prevIndex = (videoIndex - 1 + module.videos.length) % module.videos.length;
                            const prevVideo = module.videos[prevIndex];
                            openVideoModal(prevVideo, appIndex, moduleIndex, prevIndex);
                          }}>
                            <FaStepBackward />
                          </button>
                          <button className={styles.controlBtn} onClick={() => {
                            const { appIndex, moduleIndex, videoIndex } = modalVideoData;
                            const app = apiApps[appIndex];
                            const module = app.modules[moduleIndex];
                            const nextIndex = (videoIndex + 1) % module.videos.length;
                            const nextVideo = module.videos[nextIndex];
                            openVideoModal(nextVideo, appIndex, moduleIndex, nextIndex);
                          }}>
                            <FaStepForward />
                          </button>
                          <div className={styles.timeDisplay}>
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                        </div>
                        
                        <div className={styles.controlsRight}>
                          <div className={styles.volumeControl}>
                            <button className={styles.controlBtn} onClick={() => setIsMuted(!isMuted)}>
                              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={isMuted ? 0 : volume}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setVolume(val);
                                if (val > 0 && isMuted) setIsMuted(false);
                              }}
                              className={styles.volumeSlider}
                            />
                          </div>
                          <button className={styles.controlBtn} onClick={toggleFullscreen}>
                            {isFullscreen ? <FaCompress /> : <FaExpand />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botón flotante de fullscreen para móvil */}
                {isMobile && !modalVideoData.isExternal && (
                  <button className={styles.mobileFullscreenBtn} onClick={toggleFullscreen}>
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                )}
              </div>

              <div className={styles.relatedVideosContainer}>
                <h4 className={styles.relatedTitle}>Más videos de este módulo</h4>
                <div className={styles.relatedVideosList}>
                  {relatedVideos.map((video, idx) => {
                    const external = isExternalVideo(video.videoUrl);
                    const yt = external && (video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be"));
                    const thumb = yt ? getYouTubeThumbnail(video.videoUrl) : Thumbnail.src;

                    return (
                      <div
                        key={`related-${idx}`}
                        className={styles.relatedVideoItem}
                        onClick={() => {
                          const app = apiApps[modalVideoData.appIndex];
                          const module = app.modules[modalVideoData.moduleIndex];
                          const vIndex = module.videos.findIndex((v) => v._id === video._id);
                          openVideoModal(video, modalVideoData.appIndex, modalVideoData.moduleIndex, vIndex);
                        }}
                      >
                        <div className={styles.relatedThumb}>
                          {external ? (
                            <img src={thumb} alt={video.title} className={styles.relatedThumbImage} />
                          ) : (
                            <Image src={Thumbnail} alt={video.title} fill className={styles.relatedThumbImage} />
                          )}
                          <div className={styles.relatedPlayIcon}><FaPlayCircle /></div>
                          {watchedVideos[video._id] && <FaCheckCircle className={styles.watchedBadgeRelated} />}
                          <span className={styles.relatedDuration}>{video.duration}</span>
                        </div>
                        <div className={styles.relatedInfo}>
                          <h5 className={styles.relatedTitleText}>{video.title}</h5>
                          <div className={styles.relatedMeta}>
                            <span><FaEye /> {video.views || 0}</span>
                            <span><FaClock /> {video.duration || "--:--"}</span>
                            {external && <span className={styles.relatedExternalBadge}>{yt ? "YouTube" : "Ext"}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </main>
    </div>
  );
};

const HeaderStats = ({ totalVideos, totalModules }) => (
  <div className={styles.headerStats}>
    <div className={styles.statItem}>
      <span className={styles.statNumber}>{totalVideos}</span>
      <span className={styles.statLabel}>Videos</span>
    </div>
    <div className={styles.statItem}>
      <span className={styles.statNumber}>{totalModules}</span>
      <span className={styles.statLabel}>Módulos</span>
    </div>
  </div>
);

const ContinueWatching = ({ isMobile, items, openVideoModal, isExternalVideo, getYouTubeThumbnail }) => {
  if (!items.length) return null;

  if (isMobile) {
    return (
      <section className={styles.continueWatchingMobile}>
        <h3><FaRedo /> Continuar viendo</h3>
        <div className={styles.continueSlider}>
          {items.map((v) => {
            const external = isExternalVideo(v.videoUrl);
            const yt = external && (v.videoUrl.includes("youtube.com") || v.videoUrl.includes("youtu.be"));
            const thumb = yt ? getYouTubeThumbnail(v.videoUrl) : Thumbnail.src;

            return (
              <div key={v._id} className={styles.continueCard} onClick={() => openVideoModal(v, v.appIndex, v.moduleIndex, v.videoIndex)}>
                <div className={styles.continueThumb}>
                  <img src={thumb} alt={v.title} />
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressFill} style={{ width: `${v.progressPct}%` }} />
                  </div>
                  <span className={styles.continueDuration}>{v.duration}</span>
                </div>
                <div className={styles.continueInfo}>
                  <p className={styles.continueTitle}>{v.title}</p>
                  <span className={styles.continueProgress}>{v.progressPct}% visto</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return null;
};

export default VideoGuides;