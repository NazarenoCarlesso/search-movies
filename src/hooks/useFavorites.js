import { useContext } from 'react'
import { FavoritesContext } from '../context/favorites'

export const useFavorites = () => {
  const context = useContext(FavoritesContext)

  return context
}
