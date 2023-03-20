import './App.css'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })

  const handleChange = (event) => {
    const newSearch = event.target.value

    if (newSearch.startsWith(' ')) return

    updateSearch(newSearch)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
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
