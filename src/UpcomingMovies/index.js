import {Component} from 'react'
import EachMovie from '../EachMovie'

class UpcomingMovies extends Component {
  state = {upcomingMoviesList: []}

  componentDidMount() {
    this.getUpcomingMoviesList()
  }

  getUpcomingMoviesList = async () => {
    const apiKey = 'b359c218f84bec9c9bff7daf5c4cfd8d'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(url)
    console.log(response)
    const responseData = await response.json()
    console.log(responseData)
    const {results} = responseData
    const upcomingMoviesList = results.map(eachMovieDetails => ({
      id: eachMovieDetails.id,
      posterPath: eachMovieDetails.poster_path,
      title: eachMovieDetails.title,
      voteAverage: eachMovieDetails.vote_average,
    }))
    this.setState({upcomingMoviesList})
  }

  render() {
    const {upcomingMoviesList} = this.state
    console.log(upcomingMoviesList)
    return (
      <div className="movies-container">
        <ul className="movies-ul-list">
          {upcomingMoviesList.map(eachMovieDetails => (
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

export default UpcomingMovies
