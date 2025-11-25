import {Component} from 'react'
import EachMovie from '../EachMovie'
import './index.css'

class SearchedMovies extends Component {
  state = {searchedMoviesList: []}

  componentDidMount() {
    console.log('componentDidMount')
    this.getSearchedMovies()
  }

  componentDidUpdate(prevProps) {
    console.log('componentdidupdate')
    console.log(prevProps)
    const prevSearchInput = this.getPrevSearchInput(prevProps)
    const currentSearchInput = this.getCurrentSearchInput()

    if (prevSearchInput !== currentSearchInput) {
      console.log('inside condition of componentdidupdate')
      this.getSearchedMovies()
    }
  }

  getPrevSearchInput = prevProps => {
    const {match} = prevProps
    const {params} = match
    const {searchInput} = params
    const prevSearchInput = searchInput
    return prevSearchInput
  }

  getCurrentSearchInput = () => {
    const {match} = this.props
    const {params} = match
    const {searchInput} = params
    const currentSearchInput = searchInput
    return currentSearchInput
  }

  getSearchedMovies = async () => {
    const apiKey = 'b359c218f84bec9c9bff7daf5c4cfd8d'
    const {match} = this.props
    const {params} = match
    const {searchInput} = params
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1`
    const response = await fetch(url)
    const responseData = await response.json()
    const {results} = responseData
    const searchedMoviesList = results.map(eachMovieDetails => ({
      id: eachMovieDetails.id,
      posterPath: eachMovieDetails.poster_path,
      title: eachMovieDetails.title,
      voteAverage: eachMovieDetails.vote_average,
    }))
    this.setState({searchedMoviesList})
  }

  render() {
    const {searchedMoviesList} = this.state
    console.log('render')
    return (
      <div className="movies-container">
        <ul className="movies-ul-list">
          {searchedMoviesList.map(eachMovieDetails => (
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

export default SearchedMovies
