import { useState, useEffect } from 'react'
import './_navbar.scss'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu  = () => setMenuOpen(false)

  // Inteligência do Menu (Acessibilidade e Usabilidade)
  useEffect(() => {
    // 1. Trava o scroll do corpo da página
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';

    // 2. Fecha no ESC
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    // 3. Fecha ao tentar scrollar (Usabilidade mobile)
    const handleScroll = () => {
      if (menuOpen) closeMenu();
    };

    // 4. Fecha se a tela for redimensionada para Desktop (Evita bugs)
    const handleResize = () => {
      if (window.innerWidth > 768) closeMenu();
    };

    if (menuOpen) {
      window.addEventListener('keydown', handleEsc);
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
    }

    // Cleanup: Remove os ouvintes ao desmontar ou fechar
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <header className="navbar">
      {/* Overlay invisível para fechar ao clicar fora do menu */}
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
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><a href="/" className="navbar__link" onClick={closeMenu}>Descobrir</a></li>
          <li><a href="/filmes" className="navbar__link" onClick={closeMenu}>Filmes</a></li>
          <li><a href="/series" className="navbar__link" onClick={closeMenu}>Séries</a></li>
          <li><a href="/em-cartaz" className="navbar__link" onClick={closeMenu}>Em cartaz</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar