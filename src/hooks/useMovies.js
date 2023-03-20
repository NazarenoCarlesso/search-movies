// import withResults from '../mocks/with-results.json'
// import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [responseMovies, setResponseMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // const movies = responseMovies.Search
  const getMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      setResponseMovies(await searchMovies({ search }))
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { movies: responseMovies, getMovies, loading, error }
}
