import './_hero.scss'

function Hero() {
  

  return (
    <section className="hero">
      <div className="hero__container">
        
        <span className="hero__eyebrow">
          Descubra. Assista. Repita.
        </span>

        <h1 className="hero__title">
          <div className="hero__title-line">
            <span className="hero__title-italic">Toda grande</span> 
            <em className="hero__title-outline">história</em>
          </div>
          <div className="hero__title-line">
            <span className="hero__title-outline">começa</span> numa 
            <em className="hero__title-italic hero__title-italic--rose">cena.</em>
          </div>
        </h1>

        <p className="hero__description">
          Explore milhares de filmes e séries. Salve favoritos,
          descubra lançamentos e encontre o que assistir hoje.
        </p>

      </div>

      <a href='/' className="hero__scroll">
        <span className="hero__scroll-text">Explorar</span>
        <span className="hero__scroll-icon">↓</span>
      </a>
    </section>
  )
}

export default Hero