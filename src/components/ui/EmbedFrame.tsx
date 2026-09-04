import { useEffect, useRef } from 'react'
import './EmbedFrame.css'

type EmbedFrameProps = {
  src: string
  title: string
  className?: string
  minHeight?: number
}

export function EmbedFrame({ src, title, className = '', minHeight = 420 }: EmbedFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data?.height !== 'number' || !frameRef.current) return
      frameRef.current.style.height = `${event.data.height}px`
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className={`embed-frame ${className}`.trim()}>
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        loading="lazy"
        style={{ minHeight }}
        className="embed-frame__iframe"
      />
    </div>
  )
}
