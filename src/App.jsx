import { useCallback, useState } from 'react'
import './App.css'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import { useFavorites } from './hooks/useFavorites'

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

  const { favorites } = useFavorites()

  return (
    <div className='page'>
      <header>
        <nav>
          <h1 className='showcase'>SHOWCASE</h1>
          <div style={{ flexGrow: 1 }} />
          <form className='form' onSubmit={handleSubmit}>
            <input
              style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent', width: 230 }}
              value={search} onChange={handleChange} placeholder='Avengers, Star Wars, The matrix...'
            />
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </nav>
      </header>
      <div style={{ minHeight: 60 }} />
      <main>
        <h1 className='title'>Search</h1>
        <div className='catalog'>
          {
            loading ? <div className='loader' /> : <Movies movies={movies} />
          }
        </div>
        <h1 className='title'>Trending</h1>
        <div className='catalog'>
          <section>
            <img src='https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' alt='Blade Runner 2020' />
            <img src='https://m.media-amazon.com/images/M/MV5BN2Y2OWU4MWMtNmIyMy00YzMyLWI0Y2ItMTcyZDc3MTdmZDU4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' alt='12 Monkeys' />
            <img src='https://m.media-amazon.com/images/M/MV5BMTkzMzA1OTI3N15BMl5BanBnXkFtZTYwMzUyMDg5._V1_SX300.jpg' alt='Equilibrium' />
            <img src='https://m.media-amazon.com/images/M/MV5BNTE1OWI1YzgtZjEyMy00MjQ4LWE0NWMtYTNhYjc0ZDQ3ZGRkXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX300.jpg' alt='The Book of Eli' />
            <img src='https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' alt='American Psycho' />
            <img src='https://m.media-amazon.com/images/M/MV5BNzU1MDI1NDM1NF5BMl5BanBnXkFtZTcwMzU5OTkyMQ@@._V1_SX300.jpg' alt='Land of the Dead' />
          </section>
        </div>
        <h1 className='title'>Favorites</h1>
        <div className='catalog'>
          <Movies movies={favorites} />
        </div>
      </main>
      <footer>
        <span>{'<>'} Nazareno Carlesso</span>
      </footer>
    </div>
  )
}

export default App
