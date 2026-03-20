import { useState, useEffect } from 'react'
import './_navbar.scss'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Trava o scroll do fundo quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu  = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <nav className="navbar__nav">

        <a href="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-dot"></span>
          Cena
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li>
            <a href="/" className="navbar__link" onClick={closeMenu}>
              Descobrir
            </a>
          </li>
          <li>
            <a href="/filmes" className="navbar__link" onClick={closeMenu}>
              Filmes
            </a>
          </li>
          <li>
            <a href="/series" className="navbar__link" onClick={closeMenu}>
              Séries
            </a>
          </li>
          <li>
            <a href="/em-cartaz" className="navbar__link" onClick={closeMenu}>
              Em cartaz
            </a>
          </li>
        </ul>

      </nav>
    </header>
  )
}

export default Navbar