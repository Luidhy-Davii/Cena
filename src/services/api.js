const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const API_KEY  = import.meta.env.VITE_TMDB_API_KEY
export const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
}

// Função base de fetch
const fetchTMDB = async (endpoint, params = '') => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR&${params}`
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`)
  }

  return response.json()
}

// Endpoints
export const getMoviesNowPlaying = () =>
  fetchTMDB('/movie/now_playing')

export const getMoviesPopular = () =>
  fetchTMDB('/movie/popular')

export const getTVOnTheAir = () =>
  fetchTMDB('/tv/on_the_air')

export const getVideos = (id, isTV = false) => {
  const type = isTV ? 'tv' : 'movie'
  return fetchTMDB(`/${type}/${id}/videos`)
}