import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { nav, site } from '../../data/site.js'

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const linkClass = ({ isActive }) =>
    `font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-brass ${
      isActive ? 'text-brass' : 'text-bone-dim'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-ink-600 bg-ink-950/95 backdrop-blur-sm">
      <div className="page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold uppercase tracking-wide text-bone">{site.name}</span>
          <span className="label hidden sm:inline">{site.role}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="btn-ghost min-h-[40px] px-4 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-ink-600 bg-ink-950 lg:hidden">
          <ul className="page py-2">
            {nav.map((item) => (
              <li key={item.to} className="border-b border-ink-700 last:border-0">
                <NavLink to={item.to} className={(s) => `${linkClass(s)} block py-4`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-600">
      <div className="page flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="h3">
            Looking for a Level Designer, Combat Designer or Game Designer?
          </p>
          <p className="body mt-3">I'd be happy to discuss my work.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn">
            Get in touch
          </Link>
          <Link to="/resume" className="btn-ghost">
            Resume
          </Link>
        </div>
      </div>
      <div className="page flex flex-wrap justify-between gap-3 border-t border-ink-700 py-6">
        <span className="label">{site.positioning}</span>
        <span className="label">
          © {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="btn sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50">
        Skip to content
      </a>
      <Header />
      <main id="main" key={pathname} className="page-in flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
