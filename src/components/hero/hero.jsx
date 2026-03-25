import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './_hero.scss'

function Hero() {
  const eyebrowRef = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const descRef    = useRef(null)
  const scrollRef  = useRef(null)

  useEffect(() => {
    // Respeita preferência do sistema — não anima se o usuário pediu menos movimento
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Define estado inicial: todos invisíveis e deslocados 40px para baixo
    gsap.set([eyebrowRef.current, line1Ref.current, line2Ref.current, descRef.current, scrollRef.current], {
      opacity: 0,
      y: 40,
    })

    // Timeline: cada elemento entra em sequência, sobrepondo levemente o anterior
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(line1Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, '-=0.4') // começa 0.4s antes do anterior terminar
      .to(line2Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
      .to(descRef.current,    { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(scrollRef.current,  { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')

    // Limpa a timeline ao desmontar o componente
    return () => tl.kill()
  }, [])

  return (
    <section className="hero">
      <div className="hero__container">
        <span className="hero__eyebrow" ref={eyebrowRef}>
          Descubra. Assista. Repita.
        </span>
        <h1 className="hero__title">
          <div className="hero__title-line" ref={line1Ref}>
            <span className="hero__title-italic">Toda grande</span>
            <em className="hero__title-outline">história</em>
          </div>
          <div className="hero__title-line" ref={line2Ref}>
            <span className="hero__title-outline">começa</span> numa
            <em className="hero__title-italic hero__title-italic--rose">cena.</em>
          </div>
        </h1>
        <p className="hero__description" ref={descRef}>
          Explore milhares de filmes e séries. Salve favoritos,
          descubra lançamentos e encontre o que assistir hoje.
        </p>
      </div>
      <a href='#descobrir' className="hero__scroll" ref={scrollRef}>
        <span className="hero__scroll-text">Explorar</span>
        <span className="hero__scroll-icon">↓</span>
      </a>
    </section>
  )
}

export default Hero