import {Component} from 'react'
import './index.css'

class SingleMovieDetails extends Component {
  state = {
    movieDetails: {
      posterPath: '',
      title: '',
      overview: '',
      rating: '',
      releaseDate: '',
      genres: [],
      runtime: '',
    },
    castDetails: [],
  }

  componentDidMount() {
    this.getSingleMovieDetails()
  }

  getSingleMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = 'b359c218f84bec9c9bff7daf5c4cfd8d'
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const movieUrlResponse = await fetch(movieUrl)
    const movieUrlResponseData = await movieUrlResponse.json()
    const movieDetails = {
      title: movieUrlResponseData.title,
      posterPath: movieUrlResponseData.poster_path,
      overview: movieUrlResponseData.overview,
      rating: movieUrlResponseData.vote_average,
      releaseDate: movieUrlResponseData.release_date,
      genres: movieUrlResponseData.genres,
      runtime: movieUrlResponseData.runtime,
    }
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const castUrlResponse = await fetch(castUrl)
    const castUrlResponseData = await castUrlResponse.json()
    console.log(castUrlResponseData)
    const {cast} = castUrlResponseData
    const castDetails = cast.map(eachCast => ({
      name: eachCast.name,
      id: eachCast.id,
      character: eachCast.character,
      profilePath: eachCast.profile_path,
    }))
    this.setState({movieDetails, castDetails})
  }

  render() {
    const {movieDetails, castDetails} = this.state
    console.log(castDetails)
    const {posterPath, title, overview, rating} = movieDetails
    const {releaseDate, genres, runtime} = movieDetails
    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
    const genreNames = genres.map(eachGenre => eachGenre.name).join(',')
    return (
      <div className="single-movie-cast-details-container">
        <div className="single-movie-details-container">
          <img src={imageUrl} alt={imageUrl} className="single-movie-image" />
          <div>
            <h1 className="single-movie-title">{title}</h1>
            <p className="single-movie-genre">{genreNames}</p>
            <p className="single-movie-genre">{runtime} min</p>
            <p className="single-movie-genre">{overview}</p>
            <p className="single-movie-genre">Rating: {rating}</p>
            <p className="single-movie-genre">Released on {releaseDate}</p>
          </div>
        </div>
        <div>
          <ul className="single-cast-details-ul-container">
            {castDetails.map(eachCast => (
              <li
                key={eachCast.id}
                className="single-cast-details-each-container"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${eachCast.profilePath}`}
                  alt={eachCast.name}
                  className="single-cast-image"
                />
                <h1 className="single-cast-name">{eachCast.name}</h1>
                <p className="single-cast-character">{eachCast.character}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default SingleMovieDetails
