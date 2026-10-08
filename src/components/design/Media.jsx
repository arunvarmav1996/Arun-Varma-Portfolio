import { useState } from 'react'

/*
  Placeholder: a labelled frame that says exactly what asset belongs here.
  Rendered automatically by the media components when `src` is empty.
*/
export function Placeholder({ slot = '[ADD IMAGE]', spec, ratio = '16 / 9', className = '' }) {
  return (
    <div
      className={`hatch flex flex-col items-center justify-center gap-3 border border-dashed border-ink-600 bg-ink-900 p-6 text-center ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="font-mono text-sm tracking-[0.1em] text-brass">{slot}</span>
      {spec && <span className="max-w-md text-sm text-bone-mute">{spec}</span>}
    </div>
  )
}

/*
  AnnotatedScreenshot: image with numbered callouts.
  annotations = [{ n, x, y, title, why }] with x/y as percentages of the image.
*/
export function AnnotatedScreenshot({ src, alt = '', slot, spec, caption, annotations = [], ratio }) {
  const [active, setActive] = useState(null)
  if (!src) return <Placeholder slot={slot || '[ADD LEVEL BLOCKOUT IMAGE]'} spec={spec} ratio={ratio} />
  return (
    <figure>
      <div className="relative border border-ink-600">
        <img src={src} alt={alt} loading="lazy" className="block w-full" />
        {annotations.map((a) => (
          <button
            key={a.n}
            type="button"
            aria-label={`Annotation ${a.n}: ${a.title}`}
            onMouseEnter={() => setActive(a.n)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(a.n)}
            onBlur={() => setActive(null)}
            className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass font-mono text-xs transition-colors ${
              active === a.n ? 'bg-brass text-ink-950' : 'bg-ink-950/90 text-bone'
            }`}
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
            {String(a.n).padStart(2, '0')}
          </button>
        ))}
      </div>
      {annotations.length > 0 && (
        <ol className="mt-3 divide-y divide-ink-700 border-y border-ink-700">
          {annotations.map((a) => (
            <li key={a.n} className={`grid grid-cols-[2.5rem_1fr] gap-x-3 px-2 py-3 ${active === a.n ? 'bg-ink-800' : ''}`}>
              <span className="font-mono text-sm text-bone-mute">{String(a.n).padStart(2, '0')}</span>
              <div>
                <p className="label text-bone">{a.title}</p>
                <p className="mt-1 text-[15px] text-bone-dim">{a.why}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {caption && <figcaption className="mt-2 text-sm text-bone-mute">{caption}</figcaption>}
    </figure>
  )
}

// VideoEmbed: a hosted file (mp4/webm) or an embed URL (YouTube/Vimeo).
export function VideoEmbed({ src, embed, poster, title = 'Gameplay video', spec }) {
  if (embed)
    return (
      <div className="border border-ink-600" style={{ aspectRatio: '16 / 9' }}>
        <iframe src={embed} title={title} loading="lazy" allowFullScreen className="h-full w-full" />
      </div>
    )
  if (src)
    return (
      <video src={src} poster={poster} controls preload="metadata" className="block w-full border border-ink-600">
        <track kind="captions" />
      </video>
    )
  return <Placeholder slot="[ADD GAMEPLAY VIDEO]" spec={spec} />
}

// ImageComparison: drag between two images taken from the same camera position.
export function ImageComparison({ before, after, beforeLabel = 'Before', afterLabel = 'After', spec }) {
  const [pos, setPos] = useState(50)
  if (!before || !after)
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Placeholder slot="[ADD ITERATION SCREENSHOT]" spec={`${beforeLabel}. ${spec || 'Same camera position as the after shot.'}`} ratio="4 / 3" />
        <Placeholder slot="[ADD ITERATION SCREENSHOT]" spec={`${afterLabel}. Same camera position.`} ratio="4 / 3" />
      </div>
    )
  return (
    <div>
      <div className="relative overflow-hidden border border-ink-600">
        <img src={after} alt={afterLabel} className="block w-full" />
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <div className="absolute inset-y-0 w-px bg-brass" style={{ left: `${pos}%` }} />
        <span className="label absolute left-3 top-3 bg-ink-950/90 px-2 py-1 text-bone">{beforeLabel}</span>
        <span className="label absolute right-3 top-3 bg-ink-950/90 px-2 py-1 text-bone">{afterLabel}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal before or after"
        className="mt-3 w-full accent-[#C8A24A]"
      />
    </div>
  )
}
export const BeforeAfter = ImageComparison

// DocumentPreview: a document cover with its contents and a link when the file exists.
export function DocumentPreview({ name, project, contains = [], file }) {
  return (
    <article className="panel flex flex-col p-5">
      <div className="mb-5 flex items-start justify-between gap-3">
        <svg width="30" height="38" viewBox="0 0 30 38" aria-hidden="true">
          <path d="M1 1 H20 L29 10 V37 H1 Z" fill="none" stroke="#8F8B82" strokeWidth="1.5" />
          <path d="M20 1 V10 H29" fill="none" stroke="#8F8B82" strokeWidth="1.5" />
          <line x1="6" y1="18" x2="24" y2="18" stroke="#3D424A" strokeWidth="1.5" />
          <line x1="6" y1="24" x2="24" y2="24" stroke="#3D424A" strokeWidth="1.5" />
          <line x1="6" y1="30" x2="17" y2="30" stroke="#3D424A" strokeWidth="1.5" />
        </svg>
        <span className="label">PDF</span>
      </div>
      <h3 className="font-display text-2xl font-semibold uppercase leading-none tracking-wide">{name}</h3>
      <p className="label mt-2">From: {project}</p>
      <ul className="mt-4 flex-1 space-y-1 text-[15px] text-bone-dim">
        {contains.map((c) => (
          <li key={c} className="flex gap-2">
            <span aria-hidden="true" className="text-bone-mute">
              /
            </span>
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        {file ? (
          <a href={file} target="_blank" rel="noreferrer" className="btn-ghost w-full">
            View document
          </a>
        ) : (
          <span className="btn-disabled w-full">[ADD DESIGN DOCUMENT]</span>
        )}
      </div>
    </article>
  )
}
