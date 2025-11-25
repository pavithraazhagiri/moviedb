import {Component} from 'react'
import EachMovie from '../EachMovie'
import './index.css'

class PopularMovies extends Component {
  state = {popularMoviesList: []}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const apiKey = 'b359c218f84bec9c9bff7daf5c4cfd8d'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(url)
    console.log(response)
    const responseData = await response.json()
    console.log(responseData)
    const {results} = responseData
    const popularMoviesList = results.map(eachMovieDetails => ({
      id: eachMovieDetails.id,
      posterPath: eachMovieDetails.poster_path,
      title: eachMovieDetails.title,
      voteAverage: eachMovieDetails.vote_average,
    }))
    this.setState({popularMoviesList})
  }

  render() {
    const {popularMoviesList} = this.state
    console.log(popularMoviesList)
    return (
      <div className="movies-container">
        <ul className="movies-ul-list">
          {popularMoviesList.map(eachMovieDetails => (
            <EachMovie
              key={eachMovieDetails.id}
              movieDetails={eachMovieDetails}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default PopularMovies
