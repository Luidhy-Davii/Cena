import { useState, useEffect } from 'react'
import { getMoviesNowPlaying, getMoviesPopular, getTVOnTheAir } from '../services/api'

const useMovies = (activeTab, page = 1) => {
  const [data,       setData]       = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        let result
        if (activeTab === 'cartaz')    result = await getMoviesNowPlaying(page)
        if (activeTab === 'populares') result = await getMoviesPopular(page)
        if (activeTab === 'series')    result = await getTVOnTheAir(page)

        setData(result.results)
        // A API retorna o total de páginas disponíveis — limitamos a 20
        setTotalPages(Math.min(result.total_pages, 20))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [activeTab, page]) // re-executa quando aba ou página muda

  return { data, totalPages, loading, error }
}

export default useMovies