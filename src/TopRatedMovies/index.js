import {Component} from 'react'
import EachMovie from '../EachMovie'
import PaginationButtons from '../PaginationButtons'

class TopRatedMovies extends Component {
  state = {topRatedMoviesList: [], pageNumber: 1}

  componentDidMount() {
    this.getTopRatedMoviesList()
  }

  getTopRatedMoviesList = async () => {
    const apiKey = 'b359c218f84bec9c9bff7daf5c4cfd8d'
    const {pageNumber} = this.state
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    const response = await fetch(url)
    console.log(response)
    const responseData = await response.json()
    console.log(responseData)
    const {results} = responseData
    const topRatedMoviesList = results.map(eachMovieDetails => ({
      id: eachMovieDetails.id,
      posterPath: eachMovieDetails.poster_path,
      title: eachMovieDetails.title,
      voteAverage: eachMovieDetails.vote_average,
    }))
    this.setState({topRatedMoviesList})
  }

  increasePageNumber = () => {
    this.setState(
      prevState => ({pageNumber: prevState.pageNumber + 1}),
      this.getTopRatedMoviesList,
    )
  }

  decreasePageNumber = () => {
    this.setState(
      prevState => ({pageNumber: prevState.pageNumber - 1}),
      this.getTopRatedMoviesList,
    )
  }

  render() {
    const {topRatedMoviesList, pageNumber} = this.state
    const disabledValue = pageNumber === 1
    console.log(topRatedMoviesList)
    return (
      <div className="movies-container">
        <PaginationButtons
          pageNumber={pageNumber}
          disabledValue={disabledValue}
          increasePageNumber={this.increasePageNumber}
          decreasePageNumber={this.decreasePageNumber}
        />
        <ul className="movies-ul-list">
          {topRatedMoviesList.map(eachMovieDetails => (
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

export default TopRatedMovies
