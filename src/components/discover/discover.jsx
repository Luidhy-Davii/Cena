import { useState } from 'react'
import useMovies from '../../hooks/useMovies'
import { IMAGE_URL, getVideos } from '../../services/api'
import './_discover.scss'

const TABS = [
  { id: 'cartaz',    label: 'Em cartaz' },
  { id: 'populares', label: 'Populares' },
  { id: 'series',    label: 'Séries em alta' },
]

// Modal
function MovieModal({ item, onClose, isTV }) {
  const [trailerKey,     setTrailerKey]     = useState(null)
  const [loadingTrailer, setLoadingTrailer] = useState(false)

  if (!item) return null

  const title    = item.title || item.name
  const year     = (item.release_date || item.first_air_date)?.slice(0, 4)
  const score    = item.vote_average?.toFixed(1)
  const votes    = item.vote_count?.toLocaleString('pt-BR')
  const lang     = item.original_language?.toUpperCase()
  const overview = item.overview || 'Sem descrição disponível.'

  const handleTrailer = async () => {
    if (trailerKey) { setTrailerKey(null); return }
    setLoadingTrailer(true)
    try {
      const data    = await getVideos(item.id, isTV)
      const trailer = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
      if (trailer) setTrailerKey(trailer.key)
      else alert('Trailer não disponível para este título.')
    } catch {
      alert('Erro ao buscar trailer.')
    } finally {
      setLoadingTrailer(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Detalhes de ${title}`}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        {trailerKey ? (
          <div className="modal__player">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`Trailer de ${title}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          item.backdrop_path && (
            <div className="modal__backdrop" aria-hidden="true">
              <img src={`${IMAGE_URL}/w780${item.backdrop_path}`} alt="" />
            </div>
          )
        )}

        <button className="modal__close" onClick={onClose} aria-label="Fechar">✕</button>

        <div className="modal__inner">
          <div className="modal__poster">
            <img src={`${IMAGE_URL}/w342${item.poster_path}`} alt={`Poster de ${title}`} />
          </div>

          <div className="modal__info">
            <div className="modal__badges">
              <span className="modal__badge modal__badge--type">{isTV ? 'Série' : 'Filme'}</span>
              {item.adult && <span className="modal__badge modal__badge--adult">+18</span>}
            </div>

            <h2 className="modal__title">{title}</h2>

            <div className="modal__meta">
              <span className="modal__score">★ {score}</span>
              <span className="modal__meta-sep" aria-hidden="true"></span>
              <span>{year}</span>
              <span className="modal__meta-sep" aria-hidden="true"></span>
              <span>{lang}</span>
              <span className="modal__meta-sep" aria-hidden="true"></span>
              <span>{votes} votos</span>
            </div>

            <p className="modal__overview">{overview}</p>

            <div className="modal__popularity">
              <span className="modal__popularity-label">Popularidade</span>
              <div className="modal__popularity-bar">
                <div className="modal__popularity-fill" style={{ width: `${Math.min(item.popularity / 5, 100)}%` }}></div>
              </div>
              <span className="modal__popularity-val">{item.popularity?.toFixed(0)}</span>
            </div>

            <div className="modal__actions">
              <button className="modal__btn modal__btn--primary" onClick={handleTrailer} disabled={loadingTrailer}>
                {loadingTrailer ? 'Carregando...' : trailerKey ? '✕ Fechar trailer' : '▶ Ver trailer'}
              </button>
              <button className="modal__btn modal__btn--ghost">♡ Favoritar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Card
function MovieCard({ item, index, onClick }) {
  const title = item.title || item.name
  const year  = (item.release_date || item.first_air_date)?.slice(0, 4)
  const score = item.vote_average?.toFixed(1)

  return (
    <article
      className="discover__card"
      onClick={() => onClick(item)}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(item)}
      aria-label={`${title} — clique para ver detalhes`}
      role="button"
    >
      <div className="discover__card-poster">
        {item.poster_path ? (
          <img src={`${IMAGE_URL}/w342${item.poster_path}`} alt={`Poster de ${title}`} loading="lazy" />
        ) : (
          <div className="discover__card-empty">sem imagem</div>
        )}
        <div className="discover__card-overlay" aria-hidden="true">
          <p className="discover__card-overview">
            {item.overview?.slice(0, 120)}{item.overview?.length > 120 ? '...' : ''}
          </p>
          <span className="discover__card-cta">Ver detalhes →</span>
        </div>
        <span className="discover__card-score">★ {score}</span>
        <span className="discover__card-rank" aria-hidden="true">#{index + 2}</span>
      </div>

      <div className="discover__card-info">
        <h4 className="discover__card-title">{title}</h4>
        <div className="discover__card-meta">
          <span>{year}</span>
          <span className="discover__card-dot" aria-hidden="true"></span>
          <span className="discover__card-score-inline">★ {score}</span>
        </div>
      </div>
    </article>
  )
}

// Main
function Discover({ activeTab, setActiveTab }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [page,         setPage]         = useState(1)
  const { data, totalPages, loading, error } = useMovies(activeTab, page)

  const featured = data[0]
  const rest     = data.slice(1) // Controle de cards
  const isTV     = activeTab === 'series'

  const getTitle = (item) => item?.title || item?.name || '—'
  const getYear  = (item) => (item?.release_date || item?.first_air_date)?.slice(0, 4) ?? '—'
  const getScore = (item) => item?.vote_average?.toFixed(1) ?? '—'

  // Reset de página ao trocar de aba
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="discover" id="descobrir">

        <header className="discover__header">
          <div className="discover__header-left">
            <span className="discover__eyebrow">Explorar</span>
            <h2 className="discover__title">O que assistir <em>hoje</em></h2>
          </div>

          <nav className="discover__tabs" role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`discover__tab${activeTab === tab.id ? ' discover__tab--active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="discover__content">

          {loading && (
            <div className="discover__loading" aria-live="polite">
              <div className="discover__spinner" aria-hidden="true"></div>
              <span>Carregando...</span>
            </div>
          )}

          {error && (
            <p className="discover__error" role="alert">Erro ao carregar dados. Tente novamente.</p>
          )}

          {!loading && !error && data.length > 0 && (
            <>
              {/* Destaque só aparece na primeira página */}
              {featured && page === 1 && (
                <article className="discover__featured" aria-label={`Destaque: ${getTitle(featured)}`}>
                  <div className="discover__featured-bg" aria-hidden="true">
                    <img
                      src={featured.backdrop_path
                        ? `${IMAGE_URL}/w1280${featured.backdrop_path}`
                        : `${IMAGE_URL}/w780${featured.poster_path}`}
                      alt=""
                    />
                  </div>

                  <div className="discover__featured-inner">
                    <div className="discover__featured-poster" aria-hidden="true">
                      <img src={`${IMAGE_URL}/w500${featured.poster_path}`} alt="" loading="lazy" />
                    </div>

                    <div className="discover__featured-info">
                      <div className="discover__featured-badges">
                        <span className="discover__badge discover__badge--violet">{isTV ? 'Série' : 'Filme'}</span>
                        <span className="discover__badge discover__badge--outline">#1 desta semana</span>
                      </div>

                      <h3 className="discover__featured-title">{getTitle(featured)}</h3>

                      <div className="discover__featured-meta">
                        <span className="discover__meta-score">★ {getScore(featured)}</span>
                        <span className="discover__meta-sep" aria-hidden="true"></span>
                        <span className="discover__meta-item">{getYear(featured)}</span>
                        <span className="discover__meta-sep" aria-hidden="true"></span>
                        <span className="discover__meta-item">{featured.original_language?.toUpperCase()}</span>
                        {featured.vote_count > 0 && (
                          <>
                            <span className="discover__meta-sep" aria-hidden="true"></span>
                            <span className="discover__meta-item">{featured.vote_count.toLocaleString('pt-BR')} votos</span>
                          </>
                        )}
                      </div>

                      {featured.overview && (
                        <p className="discover__featured-overview">
                          {featured.overview.length > 200 ? `${featured.overview.slice(0, 200)}...` : featured.overview}
                        </p>
                      )}

                      <div className="discover__featured-actions">
                        <button className="discover__btn discover__btn--primary" onClick={() => setSelectedItem(featured)}>
                          Ver detalhes
                        </button>
                        <button className="discover__btn discover__btn--ghost">♡ Favoritar</button>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              <div className="discover__subhead">
                <div>
                  <span className="discover__sub-eyebrow">
                    {activeTab === 'cartaz'    && 'Esta semana'}
                    {activeTab === 'populares' && 'Mais assistidos'}
                    {activeTab === 'series'    && 'Streaming agora'}
                  </span>
                  <h3 className="discover__sub-title">
                    {activeTab === 'cartaz'    && <>Também em <em>cartaz</em></>}
                    {activeTab === 'populares' && <>Em <em>alta</em> agora</>}
                    {activeTab === 'series'    && <>Séries para <em>maratonar</em></>}
                  </h3>
                </div>
              </div>

              <div className="discover__grid">
                {rest.map((item, i) => (
                  <MovieCard key={item.id} item={item} index={i} isTV={isTV} onClick={setSelectedItem} />
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <nav className="discover__pagination" aria-label="Paginação">
                  <button
                    className="discover__page-btn"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    aria-label="Página anterior"
                  >←</button>

                  {page > 3 && (
                    <>
                      <button className="discover__page-btn" onClick={() => handlePageChange(1)}>1</button>
                      <span className="discover__page-ellipsis">...</span>
                    </>
                  )}

                  {page > 1 && (
                    <button className="discover__page-btn" onClick={() => handlePageChange(page - 1)}>{page - 1}</button>
                  )}

                  <button className="discover__page-btn discover__page-btn--active" aria-current="page">{page}</button>

                  {page < totalPages && (
                    <button className="discover__page-btn" onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
                  )}

                  {page < totalPages - 2 && (
                    <>
                      <span className="discover__page-ellipsis">...</span>
                      <button className="discover__page-btn" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                    </>
                  )}

                  <button
                    className="discover__page-btn"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Próxima página"
                  >→</button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {selectedItem && (
        <MovieModal item={selectedItem} isTV={isTV} onClose={() => setSelectedItem(null)} />
      )}
    </>
  )
}

export default Discover