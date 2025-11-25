import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {searchInput: ''}

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    const {history} = this.props
    const {searchInput} = this.state
    if (searchInput === '') {
      return
    }
    history.replace(`/movie/search/${searchInput}`)
    this.setState({searchInput: ''})
  }

  render() {
    const {searchInput} = this.state
    console.log('header render')
    console.log(searchInput)
    return (
      <nav>
        <h1 className="movie-db-heading">movieDB</h1>
        <div className="header-buttons-container">
          <Link to="/" className="header-link">
            <button type="button" className="header-button">
              Popular
            </button>
          </Link>
          <Link to="/top-rated" className="header-link">
            <button type="button" className="header-button">
              Top Rated
            </button>
          </Link>
          <Link to="/upcoming" className="header-link">
            <button type="button" className="header-button">
              Upcoming
            </button>
          </Link>
          <input
            type="text"
            value={searchInput}
            className="header-input"
            onChange={this.onChangeInput}
          />
          <button
            type="button"
            className="header-button header-search-button"
            onClick={this.onSearch}
          >
            Search
          </button>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
