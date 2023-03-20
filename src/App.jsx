import { useCallback, useState } from 'react'
import './App.css'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      // console.log('search:', search)
      getMovies({ search })
    }, 300)
    , []
  )

  const handleChange = (event) => {
    const newSearch = event.target.value

    if (newSearch.startsWith(' ')) return

    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            value={search} onChange={handleChange} placeholder='Avengers, Star Wars, The matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando... </p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
