const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)$/i
const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/

function getVideoSource(videoUrl) {
  if (!videoUrl) return null

  try {
    const url = new URL(videoUrl, window.location.origin)
    const isLocalFile = videoUrl.startsWith('/') && !videoUrl.startsWith('//')
    const isHttps = url.protocol === 'https:'

    if ((isLocalFile || isHttps) && VIDEO_FILE_PATTERN.test(url.pathname)) {
      return { type: 'file', url: url.href }
    }

    if (!isHttps) return null

    const hostname = url.hostname.toLowerCase()
    const isYouTube = hostname === 'youtube.com'
      || hostname.endsWith('.youtube.com')
      || hostname === 'youtu.be'

    if (isYouTube) {
      const pathParts = url.pathname.split('/').filter(Boolean)
      const videoId = hostname === 'youtu.be'
        ? pathParts[0]
        : url.searchParams.get('v') || pathParts[pathParts.length - 1]

      if (videoId && YOUTUBE_ID_PATTERN.test(videoId)) {
        return {
          type: 'embed',
          url: `https://www.youtube-nocookie.com/embed/${videoId}`,
        }
      }
    }

    const isVimeo = hostname === 'vimeo.com'
      || hostname.endsWith('.vimeo.com')

    if (isVimeo) {
      const videoId = url.pathname.split('/').filter(Boolean).reverse()
        .find((part) => /^\d+$/.test(part))

      if (videoId) {
        const embedUrl = new URL(`https://player.vimeo.com/video/${videoId}`)
        const hash = url.searchParams.get('h')
        if (hash) embedUrl.searchParams.set('h', hash)
        return { type: 'embed', url: embedUrl.href }
      }
    }
  } catch (error) {
    if (error instanceof TypeError) return { type: 'invalid' }
    throw error
  }

  return { type: 'invalid' }
}

export default function ProjectMedia({ video, poster, title }) {
  const source = getVideoSource(video)

  if (source?.type === 'file') {
    return (
      <video
        className="project-media-content"
        controls
        preload="metadata"
        poster={poster}
        playsInline
        aria-label={`Video de demostración: ${title}`}
      >
        <source src={source.url} />
        Tu navegador no puede reproducir este video.
      </video>
    )
  }

  if (source?.type === 'embed') {
    return (
      <iframe
        className="project-media-content"
        src={source.url}
        title={`Video de demostración: ${title}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  if (source?.type === 'invalid') {
    return (
      <div className="project-media-placeholder project-media-error" role="status">
        <span className="media-play" aria-hidden="true">!</span>
        <span>REVISÁ EL ENLACE DEL VIDEO</span>
      </div>
    )
  }

  if (poster) {
    return <img className="project-media-content" src={poster} alt={`Vista previa de ${title}`} loading="lazy" />
  }

  return (
    <div className="project-media-placeholder" role="img" aria-label={`Sin vista previa disponible para ${title}`}>
      <span className="media-play" aria-hidden="true">↗</span>
      <span>VISTA PREVIA NO DISPONIBLE</span>
    </div>
  )
}
