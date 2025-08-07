/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { Row, Col, Collapse, Input, Button, Card, CardBody, Spinner, Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaUpload,
  FaPlayCircle,
  FaTimes,
  FaClock,
  FaEye,
  FaBook,
  FaChartLine,
  FaCogs,
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaStepBackward,
  FaStepForward,
  FaEnvelope
} from "react-icons/fa";
import { Pedido } from "../../interface/PedidoVideos";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import UpButton from "../basic/UpButton";
import { Track } from "../../interface/TrackGuide";
import { FAQ } from "../../interface/FAQ";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Thumbnail from "../../assets/images/thumbnail.png"
import styles from '../../styles/VideoGuides.module.css'

const VideoGuidesStatic = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [openSections, setOpenSections] = useState({
    pedidos: true,
    track: false,
    prod: false,
  });
  const [openFAQ, setOpenFAQ] = useState(false);
  const [modalVideoOpen, setModalVideoOpen] = useState(false);
  const [modalVideoData, setModalVideoData] = useState({ 
    title: "", 
    path: "",
    duration: "",
    views: 0,
    date: "",
    key: "",
    module: "",
    moduleIndex: 0,
    videoIndex: 0
  });
  const [loadingPreview, setLoadingPreview] = useState(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [durations, setDurations] = useState({});
  const refs = useRef({});
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const searchInputRef = useRef(null);
  const sidebarRef = useRef(null);
  
  // Estados para controles de video
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);

  // Nuevo estado para el formulario
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirección si no está logueado
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/acceso");
    }
  }, [isLoggedIn, router]);

  // Scroll a la sección de FAQ
  useEffect(() => {
    if (openFAQ && refs.current.FAQ) {
      refs.current.FAQ.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [openFAQ]);

  // Manejar reproducción en el modal
  useEffect(() => {
    if (modalVideoOpen && modalVideoRef.current) {
      setTimeout(() => {
        modalVideoRef.current.volume = volume;
        modalVideoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error al reproducir el video:", error);
        });
      }, 300);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVideoOpen]);

  // Actualizar tiempo del video
  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', updateProgress);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [modalVideoOpen]);

  // Control de volumen
  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.volume = volume;
    }
  }, [volume]);

  // Control de silencio
  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play();
        setIsPlaying(true);
      } else {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Cambiar tiempo de reproducción
  const seekVideo = (e) => {
    if (modalVideoRef.current) {
      const rect = e.target.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      modalVideoRef.current.currentTime = pos * modalVideoRef.current.duration;
    }
  };

  // Actualizar tiempo hover
  const updateHoverTime = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setHoverTime(pos * duration);
  };

  // Formatear tiempo (mm:ss)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle pantalla completa
  const toggleFullscreen = () => {
    const container = document.querySelector(`.${styles.videoContainer}`);
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Escuchar cambios en pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getVideoDuration = (videoPath, videoKey) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = videoPath;
      
      video.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        resolve({ [videoKey]: formattedDuration });
      });
      
      video.addEventListener('error', () => {
        resolve({ [videoKey]: "0:00" });
      });
    });
  };

  useEffect(() => {
    const loadDurations = async () => {
      const allVideos = Pedido.flatMap(m => m.videos);
      const promises = allVideos.map(v => getVideoDuration(v.path, v.key));
      const results = await Promise.all(promises);
      
      const durationsObj = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setDurations(durationsObj);
    };

    loadDurations();
  }, []);

  const filterVideos = (v) =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase());

  const scrollTo = (id) => {
    if (!refs.current[id]) return;
    
    setActiveSection(id);
    
    if (id.startsWith('modulo-') || id.startsWith('video-')) {
      if (!openSections.pedidos) {
        setOpenSections(prev => ({ ...prev, pedidos: true }));
        
        setTimeout(() => {
          if (refs.current[id]) {
            refs.current[id].scrollIntoView({ behavior: "smooth", block: "start" });
            
            // Scroll en sidebar después de abrir la sección
            setTimeout(() => {
              if (refs.current[id] && sidebarRef.current) {
                const activeItem = refs.current[id];
                sidebarRef.current.scrollTo({
                  top: activeItem.offsetTop - sidebarRef.current.offsetTop - 100,
                  behavior: 'smooth'
                });
              }
            }, 350);
          }
        }, 300);
        return;
      }
    }
    
    if (refs.current[id]) {
      refs.current[id].scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Scroll en sidebar
      setTimeout(() => {
        if (refs.current[id] && sidebarRef.current) {
          const activeItem = refs.current[id];
          sidebarRef.current.scrollTo({
            top: activeItem.offsetTop - sidebarRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const openVideoModal = (videoData, moduleIndex, videoIndex) => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setLoadingPreview(null);
    
    const module = Pedido[moduleIndex];
    
    setModalVideoData({ 
      title: videoData.title, 
      path: videoData.path,
      duration: durations[videoData.key] || "0:00",
      views: videoData.views || Math.floor(Math.random() * 1000) + 500,
      date: videoData.date || "15 Mar 2023",
      key: videoData.key,
      module: module.module,
      moduleIndex,
      videoIndex
    });
    
    // Obtener videos relacionados del mismo módulo
    const related = module.videos
      .filter((v, idx) => idx !== videoIndex)
      .map(v => ({
        ...v,
        thumbnail: v.thumbnail,
        duration: durations[v.key],
        views: v.views || Math.floor(Math.random() * 1000) + 500,
        date: v.date || "15 Mar 2023"
      }));
    
    setRelatedVideos(related);
    setModalVideoOpen(true);
  };
  
  const toggleFAQ = (index) => {
    setFaqOpenIndex(prev => prev === index ? null : index);
  };

  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleShare = (videoPath) => {
    navigator.clipboard.writeText(videoPath)
      .then(() => {
        toast.success("¡Enlace copiado al portapapeles!"); 
      })
      .catch(err => {
        console.error('Error al copiar: ', err);
        toast.error("Error al copiar el enlace");
      });
  };

  const handleDownload = (videoPath, videoTitle) => {
    const link = document.createElement('a');
    link.href = videoPath;
    link.setAttribute('download', `${videoTitle.replace(/\s+/g, '_')}.mp4`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Manejar clic en video relacionado
  const handleRelatedVideoClick = (video, moduleIndex) => {
    const videoIndex = Pedido[moduleIndex].videos.findIndex(v => v.key === video.key);
    openVideoModal(video, moduleIndex, videoIndex);
  };

  // Navegar al video anterior/siguiente
  const navigateVideo = (direction) => {
    const { moduleIndex, videoIndex } = modalVideoData;
    const module = Pedido[moduleIndex];
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = videoIndex === 0 ? module.videos.length - 1 : videoIndex - 1;
    } else {
      newIndex = videoIndex === module.videos.length - 1 ? 0 : videoIndex + 1;
    }
    
    const newVideo = module.videos[newIndex];
    openVideoModal(newVideo, moduleIndex, newIndex);
  };

  // Función para enviar preguntas
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error('Por favor, escribe tu pregunta');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envío con un timeout
    setTimeout(() => {
      const mailtoLink = `mailto:info@gb97.com?subject=Nueva pregunta sobre GB97&body=${encodeURIComponent(question)}`;
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setQuestion('');
      toast.success('Tu pregunta ha sido enviada');
    }, 1500);
  };

  // Renderiza un loader mientras se verifica el login
  if (!isLoggedIn) {
    return (
      <div className={styles.authLoader}>
        <div className={styles.loaderContent}>
          <Spinner color="light" />
          <p>Cargando contenido seguro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoGuidesLayout}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {/* SIDEBAR */}
      <aside ref={sidebarRef} className={styles.videoGuidesSidebar}>
        <div className={styles.sidebarHeaderContainer}>
          <h4 className={styles.sidebarHeader}>Índice de Contenido</h4>
          <div className={styles.sidebarDivider}></div>
        </div>

        {/* Sección Pedidos */}
        <div className={styles.sidebarSection}>
          <button 
            type="button" 
            onClick={() => toggleSection('pedidos')} 
            className={styles.sectionButton}
            aria-expanded={openSections.pedidos}
          >
            <FaBook className={styles.sectionIcon} />
            <span>GB97 Pedidos</span>
            <FaChevronDown className={`${styles.chevronIcon} ${openSections.pedidos ? 'open' : ''}`} />
          </button>
          <Collapse isOpen={openSections.pedidos}>
            {Pedido.map((m, i) => {
              const filteredVideos = m.videos.filter(filterVideos);
              if (filteredVideos.length === 0) return null;
              
              return (
                <div key={`module-${i}`} className={styles.itemGroup}>
                  <span 
                    className={`${styles.groupTitle} ${activeSection === `modulo-${m.module}` ? 'active' : ''}`} 
                    onClick={() => scrollTo(`modulo-${m.module}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && scrollTo(`modulo-${m.module}`)}
                    ref={(el) => (refs.current[`modulo-${m.module}`] = el)}
                  >
                    <span className={styles.moduleBadge}>{i + 1}</span>
                    {m.module}
                  </span>
                  {filteredVideos.map((v, j) => (
                    <span 
                      key={`video-${i}-${j}`}
                      className={`${styles.subItem} ${activeSection === `video-${v.key}` ? 'active' : ''}`} 
                      onClick={() => scrollTo(`video-${v.key}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && scrollTo(`video-${v.key}`)}
                      ref={(el) => (refs.current[`video-${v.key}`] = el)}
                    >
                      <span className={styles.videoBadge}>{i + 1}.{j + 1}</span>
                      {v.title}
                    </span>
                  ))}
                </div>
              );
            })}
          </Collapse>
        </div>

        {/* Sección Track */}
        <div className={styles.sidebarSection}>
          <button 
            type="button" 
            onClick={() => toggleSection('track')} 
            className={styles.sectionButton}
            aria-expanded={openSections.track}
          >
            <FaChartLine className={styles.sectionIcon} />
            <span>GB97 Track</span>
            <FaChevronDown className={`${styles.chevronIcon} ${openSections.track ? 'open' : ''}`} />
          </button>
          <Collapse isOpen={openSections.track}>
            {Track.map((t, i) => (
              <a 
                key={`track-${i}`}
                href={t.path} 
                className={styles.subItem} 
                target="_blank" 
                rel="noreferrer"
              >
                <span className={styles.trackBadge}>{i + 1}</span>
                {t.title}
              </a>
            ))}
          </Collapse>
        </div>
        
        {/* Sección Producción */}
        <div className={styles.sidebarSection}>
          <button 
            type="button" 
            onClick={() => toggleSection('prod')} 
            className={styles.sectionButton}
            aria-expanded={openSections.prod}
          >
            <FaCogs className={styles.sectionIcon} />
            <span>GB97 Producción</span>
            <FaChevronDown className={`${styles.chevronIcon} ${openSections.prod ? 'open' : ''}`} />
          </button>
          <Collapse isOpen={openSections.prod}>
            {Track.map((t, i) => (
              <a 
                key={`prod-${i}`}
                href={t.path} 
                className={styles.subItem} 
                target="_blank" 
                rel="noreferrer"
              >
                <span className={styles.prodBadge}>{i + 1}</span>
                {t.title}
              </a>
            ))}
          </Collapse>
        </div>

        {/* FAQ */}
        <div className={styles.sidebarSection}>
          <button 
            type="button" 
            onClick={() => {
              setOpenFAQ(true);
              scrollTo('FAQ');
            }} 
            className={`${styles.sectionButton} ${styles.faqButtonStyle}`}
          >
            <FaQuestionCircle className={styles.faqIcon} /> 
            <span>Preguntas frecuentes</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className={styles.videoGuidesMain}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.mainHeader}>
                <FaPlayCircle className={styles.headerIcon} />
                Portal de Videos Tutoriales - GB97
              </h1>
              <p className={styles.subHeader}>Aprende con nuestros tutoriales paso a paso</p>
            </div>
            <div className={styles.headerStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{Pedido.reduce((acc, curr) => acc + curr.videos.length, 0)}</span>
                <span className={styles.statLabel}>Videos</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{Pedido.length}</span>
                <span className={styles.statLabel}>Módulos</span>
              </div>
            </div>
          </div>
          <div className={styles.headerGradient}></div>
        </div>

        <div className={styles.searchUploadContainer}>
          <div className={styles.searchUploadBar}>
            <div className={styles.searchBar} onClick={focusSearch}>
              <Input
                innerRef={searchInputRef}
                placeholder="Buscar vídeos por descripcion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar videos"
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.clearSearch}
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpiar búsqueda"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GRID DE VIDEOS */}
        <section className={styles.videosGrid}>
          {Pedido.map((m, i) => {
            const filteredVideos = m.videos.filter(filterVideos);
            if (filteredVideos.length === 0) return null;
            
            return (
              <div key={`module-content-${i}`}>
                <h3 
                  id={`modulo-${m.module}`} 
                  ref={(el) => (refs.current[`modulo-${m.module}`] = el)} 
                  className={styles.moduleTitle}
                >
                  <span className={styles.moduleNumber}>{i + 1}.</span> 
                  <span className={styles.moduleName}>{m.module}</span>
                  <span className={styles.moduleCount}>{filteredVideos.length} videos</span>
                </h3>
                <Row>
                  {filteredVideos.map((v, j) => (
                    <Col 
                      md="4" 
                      sm="6" 
                      xs="12" 
                      key={`video-card-${j}`} 
                      id={`video-${v.key}`} 
                      ref={(el) => (refs.current[`video-${v.key}`] = el)}
                    >
                      <Card className={styles.videoCard}>
                        <div
                          className={styles.videoThumb}
                          onMouseEnter={(e) => {
                            if (isMobile) return;
                            const video = videoRefs.current[v.key];
                            if (video) {
                              setLoadingPreview(v.key);
                              video.play().catch(() => setLoadingPreview(null));
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isMobile) return;
                            const video = videoRefs.current[v.key];
                            if (video) {
                              video.pause();
                              video.currentTime = 0;
                              setLoadingPreview(null);
                            }
                          }}
                        >
                          {loadingPreview === v.key && (
                            <div className={styles.loadingOverlay}>
                              <Spinner size="sm" color="light" />
                              <span className={styles.loadingText}>Cargando vista previa...</span>
                            </div>
                          )}
                          <video
                            ref={el => (videoRefs.current[v.key] = el)}
                            poster={v.thumbnail}
                            src={v.path}
                            muted
                            loop
                            preload="metadata"
                            onCanPlay={() => setLoadingPreview(null)}
                            aria-label={`Vista previa de ${v.title}`}
                          />
                          <div 
                            className={styles.playIcon}
                            onClick={() => openVideoModal({
                              title: `${i + 1}.${j + 1} ${v.title}`,
                              path: v.path,
                              views: v.views || Math.floor(Math.random() * 1000) + 500,
                              date: v.date || "15 Mar 2023",
                              key: v.key
                            }, i, j)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && openVideoModal({
                              title: `${i + 1}.${j + 1} ${v.title}`,
                              path: v.path,
                              key: v.key
                            }, i, j)}
                            aria-label={`Reproducir video: ${v.title}`}
                          >
                            <FaPlayCircle size={isMobile ? 36 : 48} />
                          </div>
                          <div className={styles.videoOverlay}></div>
                          <div className={styles.videoMeta}>
                            <span className={styles.metaItem}>
                              <FaClock /> {durations[v.key] || "Cargando..."}                          
                            </span>
                            <span className={styles.metaItem}>
                              <FaEye /> {v.views || Math.floor(Math.random() * 1000) + 500}
                            </span>
                          </div>
                        </div>
                        <CardBody>
                          <p className={styles.videoTitle}>
                            <span className={styles.videoNumber}>{i + 1}.{j + 1}</span> 
                            {v.title}
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            );
          })}
        </section>

        {/* FAQ */}
        {openFAQ && (
          <section 
            id="FAQ" 
            ref={(el) => (refs.current.FAQ = el)} 
            className={styles.faqSection}
            aria-labelledby="faq-heading"
          >
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
                    onKeyDown={(e) => e.key === 'Enter' && toggleFAQ(k)}
                    aria-expanded={faqOpenIndex === k}
                  >
                    <h5>
                      <span className={styles.faqNumber}>{k + 1}.</span> 
                      {q.question}
                    </h5>
                    <FaChevronDown className={`${styles.faqChevron} ${faqOpenIndex === k ? 'open' : ''}`} />
                  </div>
                  <Collapse isOpen={faqOpenIndex === k}>
                    <div className={styles.faqAnswer}>
                      <p>{q.answer}</p>
                      {q.additional && (
                        <div className={styles.faqAdditional}>
                          {q.additional}
                        </div>
                      )}
                    </div>
                  </Collapse>
                </div>
              ))}
            </div>

            {/* FORMULARIO DE PREGUNTAS ADICIONALES */}
            <div className={styles.questionFormSection}>
              <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>
                  <FaEnvelope className={styles.formIcon} />
                  ¿Tienes otra pregunta?
                </h3>
                <p className={styles.formDescription}>
                  Si no encontraste respuesta a tu pregunta, envíanos un mensaje y nuestro equipo te responderá a la brevedad.
                </p>
                
                <form onSubmit={handleQuestionSubmit}>
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
                  
                  <Button 
                    type="submit" 
                    color="primary" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
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

        {/* MODAL DE VIDEO MEJORADO */}
        <Modal 
          isOpen={modalVideoOpen} 
          toggle={() => setModalVideoOpen(false)}
          className={`${styles.videoModal} ${styles.fullscreenModal}`}
          size="xl"
          centered
          backdrop="static"
        >
          <ModalHeader toggle={() => setModalVideoOpen(false)} className={styles.modalVideoHeader}>
            <div className={styles.modalHeaderContent}>
              <h3 className={styles.truncateTitle}>{modalVideoData.title}</h3>
              <div className={styles.moduleTag}>
                {modalVideoData.module}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className={styles.youtubeStyleModal}>
              <div className={styles.mainVideoContainer}>
                <div 
                  className={styles.videoContainer}
                  onMouseMove={() => setShowControls(true)}
                  onMouseLeave={() => setTimeout(() => setShowControls(false), 2000)}
                >
                  <video
                    ref={modalVideoRef}
                    src={modalVideoData.path}
                    className={styles.modalVideoPlayer}
                    onClick={togglePlayPause}
                  >
                    Tu navegador no soporta la reproducción de videos.
                  </video>
                  
                  {/* Controles personalizados */}
                  <div className={`${styles.videoControls} ${showControls ? 'visible' : ''}`}>
                    <div 
                      className={styles.progressBar} 
                      onClick={seekVideo}
                      onMouseMove={updateHoverTime}
                      onMouseLeave={() => setHoverTime(null)}
                    >
                      <div className={styles.progress} style={{ width: `${progress}%` }}>
                        <div className={styles.progressHandle}></div>
                      </div>
                      {hoverTime !== null && (
                        <div className={styles.hoverTime}>
                          {formatTime(hoverTime)}
                        </div>
                      )}
                      <div className={styles.progressTime}>
                        <span className={styles.currentTime}>{formatTime(currentTime)}</span>
                        <span className={styles.totalTime}>{formatTime(duration)}</span>
                      </div>
                    </div>
                    
                    <div className={styles.controlButtons}>
                      <button className={styles.controlBtn} onClick={() => navigateVideo('prev')}>
                        <FaStepBackward />
                      </button>
                      
                      <button className={styles.controlBtn} onClick={togglePlayPause}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      
                      <button className={styles.controlBtn} onClick={() => navigateVideo('next')}>
                        <FaStepForward />
                      </button>
                      
                      <div className={styles.timeDisplay}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                      
                      <div className={styles.volumeControl}>
                        <button className={styles.controlBtn} onClick={() => setIsMuted(!isMuted)}>
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
                        />
                      </div>
                      
                      <button className={`${styles.controlBtn} ${styles.fullscreenBtn}`} onClick={toggleFullscreen}>
                        {isFullscreen ? <FaCompress /> : <FaExpand />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.videoInfo}>
                  <div className={styles.infoItem}>
                    <FaClock /> Duración: {modalVideoData.duration}
                  </div>
                  <div className={styles.infoItem}>
                    <FaEye /> Visualizaciones: {modalVideoData.views.toLocaleString()}
                  </div>
                  <div className={styles.infoItem}>
                    Fecha: {modalVideoData.date}
                  </div>
                </div>
              
              </div>
              
              <div className={styles.relatedVideosContainer}>
                <h4 className={styles.relatedTitle}>
                  Más videos de {modalVideoData.module}
                </h4>
                <div className={styles.relatedVideosList}>
                  {relatedVideos.map((video, idx) => (
                    <div 
                      key={`related-${idx}`} 
                      className={styles.relatedVideoItem}
                      onClick={() => handleRelatedVideoClick(video, modalVideoData.moduleIndex)}
                    >
                      <div className={styles.relatedThumb}>
                        <div className={styles.thumbnailContainer}>
                          <Image
                            src={Thumbnail}
                            alt={`Miniatura de ${video.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                          />
                        </div>

                        <span className={styles.relatedDuration}>{video.duration}</span>

                        <div className={styles.relatedPlayIcon}>
                          <FaPlayCircle />
                        </div>

                        <div className={styles.relatedOverlay}></div>
                      </div>

                      <div className={styles.relatedInfo}>
                        <h5 className={styles.relatedTitleText}>{video.title}</h5>
                        <div className={styles.relatedMeta}>
                          <span><FaEye /> {video.views} visualizaciones</span>
                          <span><FaClock /> {video.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </main>
    </div>
  );
};

export default VideoGuidesStatic;