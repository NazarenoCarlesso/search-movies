import React from 'react'
import { useFavorites } from '../hooks/useFavorites'

export function ListOfMovies ({ movies }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()

  return (
    <ul className='movies'>
      {movies.map(movie => (
        <li className='movie' key={movie.id}>
          <div className='top'>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
          <img src={movie.poster} alt={`${movie.title} Poster`} />
          {
            favorites.some(favorite => favorite.id === movie.id)
              ? (
                <button onClick={() => removeFromFavorites(movie)}>
                  <span>Remove from favorites</span>
                </button>)
              : (
                <button onClick={() => addToFavorites(movie)}>
                  <span>Add to favorites</span>
                </button>)
          }
        </li>
      ))}
    </ul>
  )
}

export function NoMovies () {
  return (
    <p style={{ fontSize: '1.3rem' }}>No se encontraron películas para esta búsqueda</p>
  )
}

export default function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMovies />
  )
}
