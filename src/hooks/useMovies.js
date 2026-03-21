import { useState, useEffect } from 'react'
import {
  getMoviesNowPlaying,
  getMoviesPopular,
  getTVOnTheAir,
} from '../services/api'

const useMovies = (activeTab) => {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let result

        if (activeTab === 'cartaz')    result = await getMoviesNowPlaying()
        if (activeTab === 'populares') result = await getMoviesPopular()
        if (activeTab === 'series')    result = await getTVOnTheAir()

        setData(result.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab]) // re-executa quando a aba muda

  return { data, loading, error }
}

export default useMovies