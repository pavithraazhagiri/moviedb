import {Switch, Route} from 'react-router-dom'
import './App.css'
import Header from './Header'
import PopularMovies from './PopularMovies'
import TopRatedMovies from './TopRatedMovies'
import UpcomingMovies from './UpcomingMovies'
import SingleMovieDetails from './SingleMovieDetails'
import SearchedMovies from './SearchedMovies'

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={PopularMovies} />
      <Route exact path="/top-rated" component={TopRatedMovies} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/movie/:id" component={SingleMovieDetails} />
      <Route
        exact
        path="/movie/search/:searchInput"
        component={SearchedMovies}
      />
    </Switch>
  </div>
)

export default App
