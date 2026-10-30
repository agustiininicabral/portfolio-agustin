import { Children, cloneElement, useEffect, useRef, useState } from 'react'
import ProjectMedia from './ProjectMedia.jsx'
import { projects } from './data/projects.js'

const focusAreas = [
  {
    number: '01',
    label: 'QA AUTOMATION',
    title: 'Automatización de pruebas.',
    description:
      'Suites para validar flujos de interfaz, contratos REST, permisos y regresiones mediante pruebas repetibles e integración continua.',
    tags: ['Python', 'pytest', 'Playwright', 'GitHub Actions'],
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m7 16 6 6L25 10" />
        <circle cx="16" cy="16" r="12" />
      </svg>
    ),
  },
  {
    number: '02',
    label: 'PERFORMANCE & API',
    title: 'Calidad, seguridad y rendimiento.',
    description:
      'Pruebas de API, controles de acceso y cargas acotadas. Analizo latencias p95/p99 y comparo resultados con umbrales de regresión.',
    tags: ['FastAPI', 'Locust', 'API Testing', 'Security'],
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 23h5l4-14 6 18 4-11h5" />
        <path d="M4 28h24" />
      </svg>
    ),
  },
  {
    number: '03',
    label: 'DATA ANALYTICS',
    title: 'SQL, BI y calidad de datos.',
    description:
      'Modelado relacional y dimensional, consultas analíticas, validación de fuentes y definición de KPIs para Excel y Power BI.',
    tags: ['SQL', 'PostgreSQL', 'DuckDB', 'Excel', 'Power BI'],
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 25V15m7 10V7m7 18V12m7 13V4M3 25h26" />
      </svg>
    ),
  },
  {
    number: '04',
    label: 'IA · EVALUACIÓN',
    title: 'Evaluación de RAG y LLMs.',
    description:
      'Experimentos offline para medir recuperación, comparar respuestas con baselines y detectar regresiones en aplicaciones basadas en LLMs.',
    tags: ['Python', 'RAG', 'Retrieval Metrics', 'Regression'],
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 4v4m0 16v4M4 16h4m16 0h4M7.5 7.5l2.8 2.8m11.4 11.4 2.8 2.8m0-17-2.8 2.8m-11.4 11.4-2.8 2.8" />
        <circle cx="16" cy="16" r="6" />
      </svg>
    ),
  },
]

const steps = [
  ['01', 'Entender', 'Primero, el problema y las personas que lo viven.'],
  ['02', 'Explorar', 'Investigar opciones y elegir la herramienta adecuada.'],
  ['03', 'Construir', 'Probar, aprender y mejorar en cada iteración.'],
]

const testResultLabels = {
  passed: 'OK',
  partial: 'PARCIAL',
  failed: 'FALLÓ',
}

function getExternalUrl(value, host) {
  if (!value) return null

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || (host && url.hostname !== host)) return null
    return url.href
  } catch (error) {
    if (error instanceof TypeError) return null
    throw error
  }
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m-5-5 5 5-5 5" />
    </svg>
  )
}

function ScrollLetters({ text }) {
  return (
    <span className="scroll-letters" aria-hidden="true">
      {text}
    </span>
  )
}

function Carousel({ id, label, className, children, autoRotate = true }) {
  const trackRef = useRef(null)
  const settleTimerRef = useRef(null)
  const isNormalizingRef = useRef(false)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [canScrollForward, setCanScrollForward] = useState(false)
  const [activePhysicalIndex, setActivePhysicalIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [resumedWhileFocused, setResumedWhileFocused] = useState(false)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cards = Children.toArray(children)
  const cardCount = cards.length
  const isRotating = autoRotate && !isPaused && !isHovered
    && (!isFocused || resumedWhileFocused) && !prefersReducedMotion

  const scrollToCard = (physicalIndex, behavior = 'smooth') => {
    const track = trackRef.current
    const targetIndex = autoRotate
      ? physicalIndex
      : Math.max(0, Math.min(physicalIndex, cardCount - 1))
    const card = track?.children[targetIndex]
    if (!track || !card) return

    const cardBounds = card.getBoundingClientRect()
    const left = track.scrollLeft + cardBounds.left - track.getBoundingClientRect().left
      - (track.clientWidth - cardBounds.width) / 2

    track.scrollTo({
      left,
      behavior: prefersReducedMotion ? 'auto' : behavior,
    })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track || cardCount === 0) return undefined

    const findCenteredCard = () => {
      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2
      let closestIndex = 0
      let closestDistance = Infinity

      Array.from(track.children).forEach((card, index) => {
        const bounds = card.getBoundingClientRect()
        const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActivePhysicalIndex(closestIndex)
      return closestIndex
    }

    const normalizeLoopPosition = () => {
      if (!autoRotate || isNormalizingRef.current) return
      const centeredCard = findCenteredCard()
      if (centeredCard >= cardCount && centeredCard < cardCount * 2) return

      const equivalentIndex = centeredCard < cardCount
        ? centeredCard + cardCount
        : centeredCard - cardCount

      isNormalizingRef.current = true
      scrollToCard(equivalentIndex, 'auto')
      requestAnimationFrame(() => {
        isNormalizingRef.current = false
        findCenteredCard()
      })
    }

    const scheduleNormalization = () => {
      if (!autoRotate) return
      window.clearTimeout(settleTimerRef.current)
      settleTimerRef.current = window.setTimeout(normalizeLoopPosition, 500)
    }

    const handleScroll = () => {
      findCenteredCard()
      if (autoRotate) {
        scheduleNormalization()
      } else {
        setCanScrollBack(track.scrollLeft > 2)
        setCanScrollForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 2)
      }
    }

    setCanScrollBack(autoRotate ? cardCount > 1 : false)
    setCanScrollForward(cardCount > 1)
    track.addEventListener('scroll', handleScroll, { passive: true })
    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(findCenteredCard)
    resizeObserver?.observe(track)
    Array.from(track.children).forEach((card) => resizeObserver?.observe(card))
    const initialFrame = requestAnimationFrame(() => {
      scrollToCard(autoRotate ? cardCount : 0, 'auto')
      findCenteredCard()
    })

    return () => {
      cancelAnimationFrame(initialFrame)
      window.clearTimeout(settleTimerRef.current)
      track.removeEventListener('scroll', handleScroll)
      resizeObserver?.disconnect()
    }
  }, [autoRotate, cardCount])

  useEffect(() => {
    if (!isRotating || cardCount < 2) return undefined

    const timer = window.setInterval(() => {
      scrollToCard(activePhysicalIndex + 1)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [activePhysicalIndex, cardCount, isRotating])

  const renderCards = (group) => cards.map((child, index) => {
    const physicalIndex = group * cardCount + index
    return cloneElement(child, {
      key: `${child.key ?? index}-${group}`,
      className: `${child.props.className ?? ''} carousel-item${physicalIndex === activePhysicalIndex ? ' is-active' : ''}`,
      'data-carousel-index': index,
      'data-carousel-active': physicalIndex === activePhysicalIndex ? 'true' : 'false',
      'aria-hidden': group === 1 ? undefined : 'true',
      inert: group !== 1,
      tabIndex: group === 1 ? child.props.tabIndex : -1,
    })
  })

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-controls" role="group" aria-label={`Controles de ${label}`}>
        <button
          className="carousel-control carousel-control--previous"
          type="button"
          aria-label={`Ver elementos anteriores de ${label}`}
          aria-controls={id}
          disabled={!canScrollBack}
          onClick={() => scrollToCard(activePhysicalIndex - 1)}
        >
          <ArrowIcon />
        </button>
        <button
          className="carousel-control"
          type="button"
          aria-label={`Ver más ${label}`}
          aria-controls={id}
          disabled={!canScrollForward}
          onClick={() => scrollToCard(activePhysicalIndex + 1)}
        >
          <ArrowIcon />
        </button>
        {autoRotate && (
          <button
            className="carousel-control carousel-control--toggle"
            type="button"
            aria-label={isPaused ? `Reanudar carrusel de ${label}` : `Pausar carrusel de ${label}`}
            aria-controls={id}
            aria-pressed={isPaused}
            disabled={prefersReducedMotion}
            onClick={() => {
              setIsPaused((paused) => !paused)
              if (isPaused) setResumedWhileFocused(true)
            }}
          >
            <span aria-hidden="true">{isPaused ? '▶' : 'Ⅱ'}</span>
          </button>
        )}
      </div>
      <div
        className={`carousel-track ${className}`}
        id={id}
        ref={trackRef}
        role="region"
        aria-label={label}
        aria-roledescription="carrusel"
        tabIndex="0"
        onFocusCapture={() => {
          setIsFocused(true)
          setResumedWhileFocused(false)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scrollToCard(activePhysicalIndex - 1)
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            scrollToCard(activePhysicalIndex + 1)
          }
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsFocused(false)
            setResumedWhileFocused(false)
          }
        }}
      >
        {autoRotate ? <>{renderCards(0)}{renderCards(1)}{renderCards(2)}</> : renderCards(0)}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <main className="portfolio">
      <a className="skip-link" href="#inicio">Saltar al contenido</a>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Agustín Cabral, inicio">
          <span className="wordmark-mark">A</span>
          <span>AGUSTÍN<span className="wordmark-dot">.</span></span>
        </a>

        <nav className="nav" aria-label="Navegación principal">
          <a href="#perfil">Perfil</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#enfoque">Áreas</a>
          <a className="nav-contact" href="#contacto">
            Contacto <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio" aria-labelledby="main-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> DESARROLLO · DATOS · CALIDAD DE SOFTWARE</p>
          <h1 id="main-title" aria-label="Datos, calidad y software.">
            <ScrollLetters text="Datos, calidad" />
            <br />
            <span><ScrollLetters text="y software." /></span>
          </h1>
          <p className="hero-description">
            Soy Agustín Cabral. Desarrollo proyectos de análisis de datos,
            automatización de pruebas y software con Python, SQL y herramientas
            de CI. También exploro la evaluación de aplicaciones con IA generativa.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">
              Ver proyectos <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#contacto">
              Contactar <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-meta">
            <span>PYTHON</span><span>ANÁLISIS DE DATOS</span><span>TESTING</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-cross cross-one">+</div>
          <div className="visual-cross cross-two">+</div>
          <div className="visual-panel">
            <div className="panel-top">
              <span className="panel-lights"><i /><i /><i /></span>
              <span>ideas.py</span>
              <span className="panel-menu">···</span>
            </div>
            <div className="panel-content">
              <p className="code-comment"># una idea, muchas posibilidades</p>
              <p><span className="code-purple">def</span> <span className="code-yellow">crear_solucion</span>():</p>
              <p className="code-indent"><span className="code-blue">problema</span> = entender_contexto()</p>
              <p className="code-indent"><span className="code-blue">ideas</span> = explorar(tecnologia)</p>
              <p className="code-indent"><span className="code-purple">return</span> iterar(ideas)</p>
              <div className="panel-divider" />
              <div className="panel-bottom">
                <span className="panel-check">✓</span>
                <span>aprendiendo y construyendo</span>
                <span className="panel-cursor" />
              </div>
            </div>
          </div>
          <div className="visual-note note-top">
            <span className="note-spark">✳</span>
            <span>curiosidad<br />en acción</span>
          </div>
          <div className="visual-note note-bottom">
            <span className="note-line" />
            <span>CONSTRUIR · PROBAR · MEJORAR</span>
          </div>
          <span className="visual-index">01 — 03</span>
        </div>
      </section>

      <section className="profile-strip" id="perfil" aria-labelledby="profile-title">
        <h2 className="strip-label" id="profile-title">UN POCO SOBRE MÍ</h2>
        <p className="strip-copy">
          En este portafolio reúno proyectos personales de QA Automation,
          análisis de datos, automatización y desarrollo con Python. Cada caso
          incluye su alcance, tecnologías y enlace al código para que puedas
          revisar qué está implementado y qué sigue en evolución.
        </p>
        <a className="strip-link" href="#contacto" aria-label="Ir a contacto">
          <ArrowIcon />
        </a>
      </section>

      <section className="focus-section" id="enfoque" aria-labelledby="focus-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LO QUE ME MUEVE</p>
            <h2 id="focus-title" aria-label="Habilidades e intereses."><ScrollLetters text="Habilidades e intereses" /><span>.</span></h2>
          </div>
          <p className="section-intro">
            Áreas demostradas en proyectos publicados, con ejemplos concretos de
            automatización, análisis y evaluación de software.
          </p>
        </div>

        <Carousel id="interest-carousel" label="de intereses y enfoque" className="focus-grid">
          {focusAreas.map((area) => (
            <article className="focus-card" key={area.number}>
              <div className="card-topline">
                <span>{area.number} / {area.label}</span>
                <span className="card-icon">{area.icon}</span>
              </div>
              <h3 aria-label={area.title}><ScrollLetters text={area.title} /></h3>
              <p className="card-description">{area.description}</p>
              <div className="tag-list">
                {area.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </Carousel>
      </section>

      <section className="projects-section" id="proyectos" aria-labelledby="projects-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TRABAJO Y APRENDIZAJE</p>
            <h2 id="projects-title" aria-label="Proyectos y pruebas."><ScrollLetters text="Proyectos y pruebas" /><span>.</span></h2>
          </div>
          <p className="section-intro">
            Una selección de proyectos de QA, datos, desarrollo e IA aplicada. Cada
            descripción aclara el alcance real y enlaza al repositorio para
            consultar el código y la documentación.
          </p>
        </div>

        {projects.length > 0 ? (
          <Carousel id="projects-carousel" label="de proyectos" className="projects-grid" autoRotate={false}>
            {projects.map((project) => {
              const repositoryUrl = getExternalUrl(project.repository, 'github.com')
              const demoUrl = getExternalUrl(project.demo)

              return (
                <article className={`work-card work-card--${project.id}`} key={project.id}>
                  <div className="project-media">
                    <ProjectMedia
                      video={project.video}
                      poster={project.poster}
                      title={project.title}
                    />
                  </div>
                  <div className="work-card-body">
                    <div className="work-card-heading">
                      <div>
                        <p className="work-category">{project.category}</p>
                        <h3 aria-label={project.title}><ScrollLetters text={project.title} /></h3>
                      </div>
                      {project.status && <span className="project-status">{project.status}</span>}
                    </div>
                    <p className="work-description">{project.description}</p>
                    {project.technologies?.length > 0 && (
                      <div className="tag-list">
                        {project.technologies.map((technology) => (
                          <span className="tag" key={technology}>{technology}</span>
                        ))}
                      </div>
                    )}
                    {project.tests?.length > 0 && (
                      <div className="project-tests">
                        <h4>Pruebas realizadas</h4>
                        <ul>
                          {project.tests.map((test) => {
                            const resultLabel = testResultLabels[test.result] ?? 'REVISAR'
                            const resultClass = testResultLabels[test.result]
                              ? `test-${test.result}`
                              : 'test-invalid'

                            return (
                              <li className={`test-result ${resultClass}`} key={test.name}>
                                <span className="test-indicator" aria-hidden="true" />
                                <span>
                                  <strong>{test.name}</strong>
                                  {test.details && <span className="test-details">{test.details}</span>}
                                </span>
                                <span className="test-label">{resultLabel}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                    {(repositoryUrl || demoUrl) && (
                      <div className="project-links">
                        {repositoryUrl && (
                          <a
                            href={repositoryUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Ver el repositorio de ${project.title} en GitHub (se abre en una pestaña nueva)`}
                          >
                            Ver en GitHub <span aria-hidden="true">↗</span>
                          </a>
                        )}
                        {demoUrl && (
                          <a href={demoUrl} target="_blank" rel="noreferrer" aria-label={`Abrir la demo de ${project.title} (se abre en una pestaña nueva)`}>
                            Abrir demo <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </Carousel>
        ) : (
          <div className="projects-empty">
            <span className="empty-icon" aria-hidden="true">＋</span>
            <div>
              <h3>Los proyectos se están preparando.</h3>
              <p>
                Esta sección está lista para mostrar demos, videos, código en
                GitHub y resultados de pruebas.
              </p>
            </div>
            <a href="https://github.com/agustiininicabral" target="_blank" rel="noreferrer">
              Explorar GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="process-heading">
          <p className="eyebrow">MI MANERA DE ENCARARLO</p>
          <h2 id="process-title" aria-label="Curiosidad, método y ganas de hacerlo bien.">
            <ScrollLetters text="Curiosidad, método" /><br />
            <ScrollLetters text="y ganas de hacerlo bien." />
          </h2>
          <p className="process-intro">
            Un ciclo simple para abordar ideas y seguir aprendiendo con cada proyecto.
          </p>
        </div>
        <div className="process-list">
          {steps.map(([number, title, description]) => (
            <article className="process-step" key={number}>
              <span className="step-number">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="step-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="social-section" aria-labelledby="social-title">
        <div className="social-heading">
          <p className="eyebrow">REDES Y COMUNIDAD</p>
          <h2 id="social-title">Encontrame en la web<span>.</span></h2>
        </div>
        <div className="social-fan">
          <a
            className="social-card social-card-linkedin"
            href="https://www.linkedin.com/in/agustincabral13"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn, abre en una pestaña nueva"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5.2 8.7H2.1V22h3.1V8.7ZM3.7 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM22 14.4c0-4-2.1-5.9-4.8-5.9a4.2 4.2 0 0 0-3.7 2v-1.8h-3V22h3.1v-7.4c0-2 1-3.1 2.6-3.1s2.4 1.1 2.4 3.1V22H22v-7.6Z" />
            </svg>
            <span className="social-card-name">LinkedIn</span>
            <span className="social-card-note">Perfil profesional</span>
            <span className="social-card-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            className="social-card social-card-github"
            href="https://github.com/agustiininicabral"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub, abre en una pestaña nueva"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.5 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.6 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3 0 4.2-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            <span className="social-card-name">GitHub</span>
            <span className="social-card-note">Código y proyectos</span>
            <span className="social-card-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            className="social-card social-card-youtube"
            href="https://www.youtube.com/@techconagustin"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube, canal Tech con Agustín, abre en una pestaña nueva"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
            </svg>
            <span className="social-card-name">YouTube</span>
            <span className="social-card-note">@techconagustin</span>
            <span className="social-card-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            className="social-card"
            href="https://www.tiktok.com/@tech.con.agustin"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok, abre en una pestaña nueva"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.6 6.2a5.8 5.8 0 0 1-3.5-1.2v8.4a6.2 6.2 0 1 1-5.4-6.1v3.4a2.9 2.9 0 1 0 2 2.8V0h3.4c.2 2.1 1.4 3.9 3.5 4.6v1.6Z" />
            </svg>
            <span className="social-card-name">TikTok</span>
            <span className="social-card-note">@tech.con.agustin</span>
            <span className="social-card-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="contact-section" id="contacto">
        <div className="contact-main">
          <p className="eyebrow">CONVERSEMOS</p>
          <h2 aria-label="Hagamos algo interesante.">
            <ScrollLetters text="Hagamos algo" /><br />
            <span><ScrollLetters text="interesante." /></span>
          </h2>
          <p className="contact-copy">
            Estoy abierto a conversar sobre oportunidades, tecnología y proyectos.
          </p>
          <a
            className="button button-light email-cta"
            href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=agustinkbral2013%40gmail.com"
            aria-label="Escribime un email"
          >
            <ScrollLetters text="Escribime un email" /> <ArrowIcon />
          </a>
        </div>
        <div className="contact-aside">
          <span className="aside-label">TAMBIÉN ME ENCONTRÁS EN</span>
          <a href="https://www.linkedin.com/in/agustincabral13/" target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href="https://github.com/agustiininicabral" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=agustinkbral2013%40gmail.com">
            Email <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <a className="footer-brand" href="#inicio">AGUSTÍN<span>.</span></a>
          <p>Diseñado y construido con curiosidad.</p>
          <p>© {new Date().getFullYear()} Agustín Cabral</p>
        </div>
      </footer>
    </main>
  )
}
