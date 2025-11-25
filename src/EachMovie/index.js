import {Link} from 'react-router-dom'
import './index.css'

const EachMovie = props => {
  const {movieDetails} = props
  const {id, title, voteAverage, posterPath} = movieDetails
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`

  return (
    <li className="each-movie-container">
      <img src={imageUrl} alt={imageUrl} className="each-movie-image" />
      <h1 className="each-movie-title">{title}</h1>
      <div className="each-movie-rating-container">
        <p className="each-movie-rating">Rating:</p>
        <p className="each-movie-rating">{voteAverage}</p>
      </div>
      <button type="button" className="each-movie-button">
        <Link to={`/movie/${id}`}>View Details</Link>
      </button>
    </li>
  )
}

export default EachMovie
