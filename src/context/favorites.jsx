import { createContext, useReducer } from 'react'

// 1. Crear el contexto
export const FavoritesContext = createContext()

// update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('favorites', JSON.stringify(state))
}

const initialState = JSON.parse(window.localStorage.getItem('favorites')) || []
const favoritesReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_TO_FAVORITES': {
      const movieInFavorites = state.some(movie => movie.id === payload.id)

      if (movieInFavorites) return state

      const newState = [...state, payload]

      updateLocalStorage(newState)
      return newState
    }
    case 'REMOVE_FROM_CART': {
      const newState = state.filter(movie => movie.id !== payload.id)
      updateLocalStorage(newState)

      return newState
    }
    case 'CLEAR_CART': {
      updateLocalStorage([])
      return []
    }
  }
  return state
}

// 2. Crear el provider
export function FavoritesProvider ({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)

  const addToFavorites = movie => dispatch({
    type: 'ADD_TO_FAVORITES',
    payload: movie
  })

  const removeFromFavorites = movie => dispatch({
    type: 'REMOVE_FROM_FAVORITES',
    payload: movie
  })

  const clearFavorites = () => dispatch({
    type: 'CLEAR_FAVORITES'
  })

  return (
    <FavoritesContext.Provider value={{
      favorites: state,
      addToFavorites,
      removeFromFavorites,
      clearFavorites
    }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
