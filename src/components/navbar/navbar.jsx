import { useState, useEffect } from 'react'
import './_navbar.scss'

function Navbar({ setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
    const handleEsc = (e) => { if (e.key === 'Escape') closeMenu() }
    const handleScroll = () => { if (menuOpen) closeMenu() }
    const handleResize = () => { if (window.innerWidth > 768) closeMenu() }

    if (menuOpen) {
      window.addEventListener('keydown', handleEsc)
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [menuOpen])

  return (
    <header className="navbar">
      {menuOpen && <div className="navbar__overlay" onClick={closeMenu}></div>}
      <nav className="navbar__nav">

        <a href="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-dot"></span>
          Cena
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li>

            <a href="#descobrir"
              className="navbar__link"
              onClick={() => { setActiveTab('cartaz'); closeMenu() }}
            >
              Em cartaz
            </a>
          </li>

          <li>

            <a href="#descobrir"
              className="navbar__link"
              onClick={() => { setActiveTab('populares'); closeMenu() }}
            >
              Populares
            </a>
          </li>

          <li>

            <a href="#descobrir"
              className="navbar__link"
              onClick={() => { setActiveTab('series'); closeMenu() }}
            >
              Séries
            </a>
          </li>
        </ul>

      </nav>
    </header>
  )
}

export default Navbar