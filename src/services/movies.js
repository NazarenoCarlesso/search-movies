export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    return await fetch(`https://www.omdbapi.com/?apikey=a5f64ce4&s=${search}`)
      .then(response => response.json())
      .then(data => data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      })))
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
