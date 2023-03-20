import './App.css'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const { movies } = useMovies()
  const { search, error, updateSearch } = useSearch()

  const handleChange = (event) => {
    const newSearch = event.target.value

    if (newSearch.startsWith(' ')) return

    updateSearch(newSearch)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'green' }}
            value={search} onChange={handleChange} placeholder='Avengers, Star Wars, The matrix...'
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
