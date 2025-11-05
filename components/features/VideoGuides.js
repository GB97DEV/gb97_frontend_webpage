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
  CardBody,
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

/**
  Cambios solicitados:
  - Continuar viendo:
    • UX/UI mejorado.
    • En desktop ocupa todo el ancho (full-bleed) y toda la altura visible (100vh) con tarjetas grandes.
    • En móvil se mantiene carrusel horizontal con tarjetas táctiles.
  - Móvil:
    • Quitar del header el título "Tutoriales GB97" y el botón de búsqueda (no hay barra superior).
    • El buscador va debajo del bloque "Portal de tutoriales", con fondo blanco.
    • Footer (botones Índice y FAQ) con color #231F8C.
    • Índice (sheet móvil) con color #231F8C.
  - Reproductor:
    • Mantiene ratio 16:9 en modo normal.
    • En pantalla completa el contenedor ocupa toda la pantalla y video/iframe usan object-fit: contain (sin recortes).
    • YouTube con playsinline, enablejsapi y origin. Skeleton hasta cargar para evitar pantalla negra.
*/

const NAV_PURPLE = "#231F8C"; // color requerido para índice y footer en móvil
const ContinueGridMin = 360;  // ancho mínimo para tarjetas en desktop "continuar viendo"

const VideoGuides = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  // Dispositivo
  const [isMobile, setIsMobile] = useState(false);

  // Data y filtros
  const [apiApps, setApiApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showUnwatchedOnly, setShowUnwatchedOnly] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Índice (sheet)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Video modal
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

  // Player (interno)
  const modalVideoRef = useRef(null);
  const videoContainerRef = useRef(null); // para fullscreen controlado
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);
  const [duration, setDuration] = useState(0);

  // Relacionados y previews
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadingPreview, setLoadingPreview] = useState(null);
  const videoRefs = useRef({});
  const refs = useRef({});
  const searchInputRef = useRef(null);

  // FAQ
  const [openFAQ, setOpenFAQ] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  // Vistos y progreso
  const [watchedVideos, setWatchedVideos] = useState({});
  const [videoProgress, setVideoProgress] = useState({});
  const [resumeTime, setResumeTime] = useState(null);

  // YouTube skeleton
  const [externalLoaded, setExternalLoaded] = useState(true);

  // Detección de móvil
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 992);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Debounce búsqueda
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 220);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Lock scroll con índice abierto
  useEffect(() => {
    if (!isMobile) return;
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, isMobile]);

  // Auth
  useEffect(() => {
    if (!isLoggedIn) router.push("/acceso");
  }, [isLoggedIn, router]);

  // Persistencia vistos/progreso
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

  useEffect(() => {
    localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));
  }, [watchedVideos]);

  useEffect(() => {
    localStorage.setItem("videoProgress", JSON.stringify(videoProgress));
  }, [videoProgress]);

  // Fetch
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

  // Helpers video externo
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

  // Abrir modal
  const markVideoAsWatched = useCallback((id) => {
    setWatchedVideos((p) => {
      const n = { ...p, [id]: true };
      localStorage.setItem("watchedVideos", JSON.stringify(n));
      return n;
    });
  }, []);

  const openVideoModal = (videoData, appIndex, moduleIndex, videoIndex) => {
    // detener previews
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

    // relacionados
    setRelatedVideos(
      module.videos
        .filter((v, i) => i !== videoIndex)
        .map((v) => ({ ...v, isExternal: isExternalVideo(v.videoUrl) }))
    );

    // reanudar
    const prog = videoProgress[videoData._id];
    if (prog?.duration > 0) {
      const pct = (prog.time / prog.duration) * 100;
      setResumeTime(pct > 3 && pct < 95 ? prog.time : null);
    } else setResumeTime(null);

    setModalVideoOpen(true);
  };

  // Reproductor en modal
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
    if (isMobile) return; // en móvil usamos controles nativos
    const t = setTimeout(() => {
      const vid = modalVideoRef.current;
      if (!vid) return;
      vid.volume = volume;
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVideoOpen]);

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

  // Fullscreen sobre el contenedor para controlar ratio en FS
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

  // Controles
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

  // Sidebar helpers
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

  // Métricas
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

  // Continuar viendo
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
    // opcional: orden descendente por progreso
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

      {/* SIN header móvil adicional (se elimina la barra superior con "Tutoriales GB97" y búsqueda) */}

      {/* Overlay índice móvil */}
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

      {/* ÍNDICE (sheet) móvil con color #231F8C */}
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

              {/* Track */}
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

              {/* FAQ */}
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
          // Desktop sidebar
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

      {/* MAIN */}
      <main className={styles.videoGuidesMain}>
        {/* Encabezado */}
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.mainHeader}>
                <FaPlayCircle className={styles.headerIcon} />
                Portal de Tutoriales - GB97
              </h1>
              <p className={styles.subHeader}>Aprende con nuestros tutoriales paso a paso</p>
            </div>
            <HeaderStats totalVideos={totalVideos} totalModules={totalModules} />
          </div>
          <div className={styles.headerGradient}></div>
        </div>

        {/* Buscador: en móvil se muestra aquí, en blanco */}
        <div className={styles.searchUploadContainer} style={isMobile ? { marginTop: 10 } : undefined}>
          <div className={styles.searchUploadBar}>
            <div
              className={styles.searchBar}
              onClick={() => searchInputRef.current?.focus()}
              style={
                isMobile
                  ? {
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.12)",
                      borderRadius: 14,
                    }
                  : undefined
              }
            >
              <Input
                innerRef={searchInputRef}
                placeholder="Buscar vídeos por descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar videos"
                className={styles.searchInput}
                style={isMobile ? { color: "#0a0e19" } : undefined}
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

        {/* Continuar viendo: Solo móvil (en desktop se oculta). */}
        {isMobile && continueWatching.length > 0 && (
          <ContinueWatching
            isMobile={isMobile}
            items={continueWatching}
            openVideoModal={openVideoModal}
            isExternalVideo={isExternalVideo}
            getYouTubeThumbnail={getYouTubeThumbnail}
          />
        )}

        {/* GRID/LIST DE VIDEOS */}
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
                      <span className={styles.moduleNumber}>{i + 1}.</span>
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
                            <Card className={styles.videoCard} onClick={() => openVideoModal(v, appIndex, i, j)} style={{ cursor: "pointer" }}>
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
                                    <span className={styles.loadingText}>Cargando vista previa...</span>
                                  </div>
                                )}

                                {watchedVideos[v._id] && (
                                  <div className={styles.watchedBadge}>
                                    <FaCheckCircle />
                                  </div>
                                )}

                                {external ? (
                                  <img src={thumb} alt={`Miniatura de ${v.title}`} className={styles.videoThumbImage} loading="lazy" />
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
                                    aria-label={`Vista previa de ${v.title}`}
                                  />
                                )}

                                {/* Share */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare(v.videoUrl);
                                  }}
                                  aria-label="Compartir video"
                                  style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    background: "rgba(0,0,0,0.55)",
                                    border: "none",
                                    color: "white",
                                    padding: 8,
                                    borderRadius: 8,
                                  }}
                                >
                                  <FaShareAlt />
                                </button>

                                <div className={styles.playIcon} role="button" tabIndex={0} aria-hidden>
                                  <FaPlayCircle size={isMobile ? 36 : 48} />
                                </div>
                                <div className={styles.videoOverlay}></div>

                                {/* Progreso */}
                                {pct > 0 && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      height: 4,
                                      background: "rgba(255,255,255,0.15)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: `${pct}%`,
                                        height: "100%",
                                        background: "linear-gradient(90deg, rgba(0,200,120,0.95), rgba(0,180,255,0.95))",
                                      }}
                                    />
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
                              <CardBody>
                                <p className={styles.videoTitle}>
                                  <span className={styles.videoNumber}>{i + 1}.{j + 1}</span>
                                  {v.title}
                                  {watchedVideos[v._id] && <FaCheckCircle className={styles.watchedIconSmall} />}
                                </p>
                                <p className={styles.videoDescription}>{v.description}</p>
                              </CardBody>
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

        {/* EMPTY STATE */}
        {noResults && (
          <div
            style={{
              marginTop: 24,
              padding: 18,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: 6, fontWeight: 700 }}>Sin resultados</p>
            <p style={{ marginBottom: 10, color: "rgba(255,255,255,0.75)" }}>
              Intenta con otra palabra clave o desactiva filtros.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <Button size="sm" onClick={() => setSearchTerm("")}>
                Limpiar búsqueda
              </Button>
              {showUnwatchedOnly && (
                <Button size="sm" onClick={() => setShowUnwatchedOnly(false)} color="secondary">
                  Mostrar todos
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Paginación */}
        <div
          className={styles.paginationControls}
          style={
            isMobile
              ? {
                  position: "sticky",
                  bottom: 56 + 8,
                  zIndex: 5,
                  background: "rgba(10,14,25,0.9)",
                  backdropFilter: "blur(6px)",
                  padding: "10px 12px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }
              : undefined
          }
        >
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className={styles.paginationButton}>
            Anterior
          </Button>
          <span className={styles.paginationText}>Página {currentPage} de {totalPages}</span>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className={styles.paginationButton}>
            Siguiente
          </Button>
        </div>

        {/* FAQ */}
        {openFAQ && (
          <section id="FAQ" ref={(el) => (refs.current.FAQ = el)} className={styles.faqSection} aria-labelledby="faq-heading">
            <div className={styles.faqHeader}>
              <h2 id="faq-heading">
                <FaQuestionCircle className={styles.faqHeaderIcon} />
                Preguntas Frecuentes
              </h2>
              <p>Encuentra respuestas a las preguntas más comunes sobre nuestro portal de videos</p>
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
                    aria-expanded={faqOpenIndex === k}
                  >
                    <h5>
                      <span className={styles.faqNumber}>{k + 1}.</span>
                      {q.question}
                    </h5>
                    <FaChevronDown className={`${styles.faqChevron} ${faqOpenIndex === k ? "open" : ""}`} />
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

            <div className={styles.questionFormSection}>
              <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>
                  <FaEnvelope className={styles.formIcon} />
                  ¿Tienes otra pregunta?
                </h3>
                <p className={styles.formDescription}>
                  Si no encontraste respuesta a tu pregunta, envíanos un mensaje y nuestro equipo te responderá a la brevedad.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!question.trim()) {
                      toast.error("Por favor, escribe tu pregunta");
                      return;
                    }
                    setIsSubmitting(true);
                    setTimeout(() => {
                      const mailtoLink = `mailto:info@gb97.com?subject=Nueva pregunta sobre GB97&body=${encodeURIComponent(question)}`;
                      window.location.href = mailtoLink;
                      setIsSubmitting(false);
                      setQuestion("");
                      toast.success("Tu pregunta ha sido enviada");
                    }, 1200);
                  }}
                >
                  <div className={styles.formGroup}>
                    <Input
                      type="textarea"
                      name="question"
                      placeholder="Escribe tu pregunta aquí..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                      rows={5}
                      className={styles.questionInput}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button type="submit" color="primary" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner size="sm" /> Enviando...
                      </>
                    ) : (
                      "Enviar pregunta a info@gb97.com"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </section>
        )}

        <UpButton />

        {/* Footer móvil con color #231F8C */}
        {isMobile && (
          <nav
            aria-label="Navegación inferior"
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 30,
              background: NAV_PURPLE,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                alignItems: "center",
                textAlign: "center",
                height: 56,
              }}
            >
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  gap: 2,
                  fontSize: 12,
                }}
              >
                <FaBook />
                Índice
              </button>
              <button
                onClick={() => setShowUnwatchedOnly((p) => !p)}
                aria-pressed={showUnwatchedOnly}
                style={{
                  background: showUnwatchedOnly ? "#fff" : "transparent",
                  border: "none",
                  color: showUnwatchedOnly ? NAV_PURPLE : "#fff",
                  display: "grid",
                  placeItems: "center",
                  gap: 2,
                  fontSize: 12,
                  borderRadius: showUnwatchedOnly ? 16 : 0,
                  padding: showUnwatchedOnly ? "6px 10px" : 0,
                  margin: showUnwatchedOnly ? "0 6px" : 0,
                }}
              >
                <FaEyeSlash />
                {showUnwatchedOnly ? "No vistos" : "Todos"}
              </button>
              <button
                onClick={() => {
                  setOpenFAQ(true);
                  setTimeout(() => scrollTo("FAQ"), 100);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  gap: 2,
                  fontSize: 12,
                }}
              >
                <FaQuestionCircle />
                FAQ
              </button>
            </div>
          </nav>
        )}

        {/* MODAL VIDEO: ratio normal 16:9, fullscreen con contain (video y YouTube) */}
        <Modal
          isOpen={modalVideoOpen}
          toggle={() => setModalVideoOpen(false)}
          className={`${styles.videoModal} ${styles.fullscreenModal}`}
          size="xl"
          centered
          backdrop="static"
        >
          <ModalHeader toggle={() => setModalVideoOpen(false)} className={styles.modalVideoHeader}>
            <div className={styles.modalHeaderContent} style={{ gap: 8 }}>
              <h3 className={styles.truncateTitle} style={{ fontSize: isMobile ? 16 : undefined }}>
                {modalVideoData.title}
              </h3>
              <div className={styles.moduleTag} style={isMobile ? { fontSize: 12, padding: "4px 8px" } : undefined}>
                {modalVideoData.module}
                {watchedVideos[modalVideoData.key] && <FaCheckCircle className={styles.watchedIconModal} />}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className={styles.youtubeStyleModal}>
              <div
                ref={videoContainerRef}
                style={{
                  position: "relative",
                  width: "100%",
                  background: "#000",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Normal: caja 16:9 */}
                {!isFullscreen && (
                  <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                    {modalVideoData.isExternal ? (
                      <div style={{ position: "absolute", inset: 0 }}>
                        {!externalLoaded && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "grid",
                              placeItems: "center",
                              background: "#000",
                            }}
                          >
                            <Spinner color="light" />
                          </div>
                        )}
                        <iframe
                          src={getYouTubeEmbedUrl(modalVideoData.path)}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            border: 0,
                            background: "#000",
                          }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                          allowFullScreen
                          title={modalVideoData.title}
                          referrerPolicy="strict-origin-when-cross-origin"
                          onLoad={() => setExternalLoaded(true)}
                        />
                      </div>
                    ) : (
                      <video
                        ref={modalVideoRef}
                        src={modalVideoData.path}
                        onClick={togglePlayPause}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          backgroundColor: "#000",
                        }}
                        playsInline
                        controls={isMobile}
                      >
                        Tu navegador no soporta la reproducción de videos.
                      </video>
                    )}
                  </div>
                )}

                {/* Fullscreen: contenedor a pantalla completa y contenido con contain */}
                {isFullscreen && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      background: "#000",
                    }}
                  >
                    {modalVideoData.isExternal ? (
                      <iframe
                        src={getYouTubeEmbedUrl(modalVideoData.path)}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: 0,
                          background: "#000",
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        title={modalVideoData.title}
                      />
                    ) : (
                      <video
                        ref={modalVideoRef}
                        src={modalVideoData.path}
                        style={{
                          width: "100%",
                          height: "100%",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          backgroundColor: "#000",
                        }}
                        playsInline
                        controls
                        autoPlay
                      />
                    )}
                  </div>
                )}

                {/* Botón fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                  style={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    background: "rgba(0,0,0,0.55)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 999,
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    zIndex: 2,
                  }}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                  {isFullscreen ? "Salir" : "Pantalla completa"}
                </button>
              </div>

              {/* Controles personalizados (desktop) */}
              {!modalVideoData.isExternal && !isMobile && (
                <DesktopControls
                  progress={progress}
                  currentTime={currentTime}
                  duration={duration}
                  seekVideo={seekVideo}
                  updateHoverTime={updateHoverTime}
                  hoverTime={hoverTime}
                  formatTime={formatTime}
                  isPlaying={isPlaying}
                  togglePlayPause={togglePlayPause}
                  navigateVideo={(dir) => {
                    const { appIndex, moduleIndex, videoIndex } = modalVideoData;
                    const app = apiApps[appIndex];
                    const module = app.modules[moduleIndex];
                    const nIndex =
                      dir === "prev"
                        ? (videoIndex - 1 + module.videos.length) % module.videos.length
                        : (videoIndex + 1) % module.videos.length;
                    const nv = module.videos[nIndex];
                    openVideoModal(nv, appIndex, moduleIndex, nIndex);
                  }}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  volume={volume}
                  setVolume={setVolume}
                  isFullscreen={isFullscreen}
                  toggleFullscreen={toggleFullscreen}
                />
              )}

              {/* Relacionados */}
              <div className={styles.relatedVideosContainer} style={{ marginTop: 12 }}>
                <h4 className={styles.relatedTitle} style={isMobile ? { fontSize: 16 } : undefined}>
                  Más videos de {modalVideoData.module}
                </h4>
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
                          <div className={styles.thumbnailContainer}>
                            {external ? (
                              <img src={thumb} alt={`Miniatura de ${video.title}`} className={styles.relatedThumbImage} loading="lazy" />
                            ) : (
                              <Image
                                src={Thumbnail}
                                alt={`Miniatura de ${video.title}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                style={{ objectFit: "cover", borderRadius: "8px" }}
                                priority={false}
                              />
                            )}
                          </div>

                          <span className={styles.relatedDuration}>{video.duration}</span>
                          {watchedVideos[video._id] && <FaCheckCircle className={styles.watchedBadgeRelated} />}

                          <div className={styles.relatedPlayIcon}>
                            <FaPlayCircle />
                          </div>

                          <div className={styles.relatedOverlay}></div>
                        </div>

                        <div className={styles.relatedInfo}>
                          <h5 className={styles.relatedTitleText}>{video.title}</h5>
                          <div className={styles.relatedMeta}>
                            <span>
                              <FaEye /> {video.views || 0} visualizaciones
                            </span>
                            <span>
                              <FaClock /> {video.duration || "--:--"}
                            </span>
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

/* ========== Componentes Auxiliares ========== */

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

/**
 * Continuar viendo:
 * - Mobile: carrusel horizontal de tarjetas 16:9.
 * - Desktop: sección full-bleed (100vw) y altura completa (100vh) con grid de tarjetas grandes.
 *   Usa técnica de "full-bleed": width 100vw y margin-left calc(50% - 50vw).
 */
const ContinueWatching = ({ isMobile, items, openVideoModal, isExternalVideo, getYouTubeThumbnail }) => {
  if (isMobile) {
    return (
      <section id="continuar" style={{ marginBottom: 18, padding: "8px 0" }}>
        <h3 style={{ fontSize: 18, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <FaRedo /> Continuar viendo
        </h3>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridAutoFlow: "column",
            gridAutoColumns: "75%",
            overflowX: "auto",
            paddingBottom: 6,
            scrollSnapType: "x mandatory",
          }}
        >
          {items.map((v) => {
            const external = isExternalVideo(v.videoUrl);
            const yt = external && (v.videoUrl.includes("youtube.com") || v.videoUrl.includes("youtu.be"));
            const thumb = yt ? getYouTubeThumbnail(v.videoUrl) : Thumbnail.src;

            return (
              <div
                key={`cont-${v._id}`}
                onClick={() => openVideoModal(v, v.appIndex, v.moduleIndex, v.videoIndex)}
                style={{
                  position: "relative",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  scrollSnapAlign: "start",
                  cursor: "pointer",
                }}
              >
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#0a0e19" }}>
                  <img
                    src={thumb}
                    alt={`Miniatura de ${v.title}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 8,
                      right: 8,
                      bottom: 8,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.15 }}>{v.title}</div>
                    <span
                      style={{
                        fontSize: 12,
                        background: "rgba(0,0,0,0.45)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "2px 6px",
                        borderRadius: 8,
                      }}
                    >
                      {v.duration || "--:--"}
                    </span>
                  </div>

                  {/* Barra de progreso */}
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "rgba(255,255,255,0.15)" }}>
                    <div
                      style={{
                        width: `${v.progressPct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, rgba(0,200,120,0.95), rgba(0,180,255,0.95))",
                      }}
                    />
                  </div>
                </div>
                <div style={{ padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.moduleName}</span>
                    <span>•</span>
                    <span>
                      <FaClock /> {v.progressPct}% visto
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Desktop full-bleed (no se mostrará porque el render se condiciona por isMobile)
  return (
    <section
      id="continuar"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)", // full-bleed
        background:
          "linear-gradient(180deg, rgba(10,14,25,0.35) 0%, rgba(10,14,25,0.65) 40%, rgba(10,14,25,0.9) 100%)",
        padding: "42px 6vw",
        minHeight: "100vh", // ocupa toda la pantalla
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0, fontWeight: 800, letterSpacing: 0.2 }}>Continuar viendo</h2>
        <span style={{ opacity: 0.7 }}>{items.length} videos</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${ContinueGridMin}px, 1fr))`,
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {items.map((v) => {
          const external = isExternalVideo(v.videoUrl);
          const yt = external && (v.videoUrl.includes("youtube.com") || v.videoUrl.includes("youtu.be"));
          const thumb = yt ? getYouTubeThumbnail(v.videoUrl) : Thumbnail.src;

          return (
            <div
              key={`cont-${v._id}`}
              onClick={() => openVideoModal(v, v.appIndex, v.moduleIndex, v.videoIndex)}
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                <img
                  src={thumb}
                  alt={`Miniatura de ${v.title}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 70% 20%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <strong style={{ fontSize: 18, lineHeight: 1.15, letterSpacing: 0.2 }}>{v.title}</strong>
                    <span
                      style={{
                        fontSize: 12,
                        background: "rgba(0,0,0,0.45)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "2px 6px",
                        borderRadius: 8,
                      }}
                    >
                      {v.duration || "--:--"}
                    </span>
                  </div>
                </div>

                {/* Progreso */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "rgba(255,255,255,0.15)" }}>
                  <div
                    style={{
                      width: `${v.progressPct}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, rgba(0,200,120,0.95), rgba(0,180,255,0.95))",
                    }}
                  />
                </div>
              </div>

              <div style={{ padding: 12, display: "flex", gap: 12, alignItems: "center", color: "rgba(255,255,255,0.8)" }}>
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.moduleName}</span>
                <span>•</span>
                <span>
                  <FaClock /> {v.progressPct}% visto
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ThumbOverlays = ({ watched, duration, views, isExternal, isYouTube, onShare }) => (
  <>
    <div
      style={{
        position: "absolute",
        right: 8,
        top: 8,
        display: "flex",
        gap: 6,
        alignItems: "center",
      }}
    >
      {watched && (
        <span
          title="Visto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            borderRadius: 8,
            background: "rgba(0,200,120,0.18)",
            border: "1px solid rgba(0,200,120,0.45)",
            color: "rgb(0,200,120)",
          }}
        >
          <FaCheckCircle />
        </span>
      )}
      <button
        onClick={onShare}
        aria-label="Compartir video"
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.45)",
          color: "white",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaShareAlt />
      </button>
    </div>

    <div className={styles.videoOverlay}></div>
    <div className={styles.videoMeta} style={{ left: 8, right: 8, bottom: 8, display: "flex", gap: 10 }}>
      <span className={styles.metaItem}>
        <FaClock /> {duration || "--:--"}
      </span>
      <span className={styles.metaItem}>
        <FaEye /> {views || 0}
      </span>
      {isExternal && <span className={styles.externalBadge}>{isYouTube ? "YouTube" : "Ext"}</span>}
    </div>
  </>
);

const DesktopControls = ({
  progress,
  currentTime,
  duration,
  seekVideo,
  updateHoverTime,
  hoverTime,
  formatTime,
  isPlaying,
  togglePlayPause,
  navigateVideo,
  isMuted,
  setIsMuted,
  volume,
  setVolume,
  isFullscreen,
  toggleFullscreen,
}) => (
  <div className={`${styles.videoControls} visible`} style={{ marginTop: 10 }}>
    <div className={styles.progressBar} onClick={seekVideo} onMouseMove={updateHoverTime} onMouseLeave={() => {}}>
      <div className={styles.progress} style={{ width: `${progress}%` }}>
        <div className={styles.progressHandle}></div>
      </div>
      {hoverTime !== null && <div className={styles.hoverTime}>{formatTime(hoverTime)}</div>}
      <div className={styles.progressTime}>
        <span className={styles.currentTime}>{formatTime(currentTime)}</span>
        <span className={styles.totalTime}>{formatTime(duration)}</span>
      </div>
    </div>

    <div className={styles.controlButtons}>
      <button className={styles.controlBtn} onClick={() => navigateVideo("prev")} aria-label="Video anterior">
        <FaStepBackward />
      </button>

      <button className={styles.controlBtn} onClick={togglePlayPause} aria-label={isPlaying ? "Pausar" : "Reproducir"}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button className={styles.controlBtn} onClick={() => navigateVideo("next")} aria-label="Siguiente video">
        <FaStepForward />
      </button>

      <div className={styles.timeDisplay} aria-label="Tiempo de reproducción">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      <div className={styles.volumeControl}>
        <button className={styles.controlBtn} onClick={() => setIsMuted((m) => !m)} aria-label={isMuted ? "Activar sonido" : "Silenciar"}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className={styles.volumeSlider}
          aria-label="Control de volumen"
        />
      </div>

      <button className={`${styles.controlBtn} ${styles.fullscreenBtn}`} onClick={toggleFullscreen} aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}>
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  </div>
);

export default VideoGuides;