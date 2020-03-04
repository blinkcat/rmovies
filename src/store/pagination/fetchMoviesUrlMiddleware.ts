import { Middleware } from 'redux';
import { getFetchPaginationStartType } from './actions';
import { MovieType } from '../ui/types';
import { State } from '../rootReducer';

const urls = {
  [MovieType.popular]: '/movie/popular',
  [MovieType.nowPlaying]: '/movie/now_playing',
  [MovieType.topRated]: '/movie/top_rated',
  [MovieType.upcoming]: '/movie/upcoming',
  [MovieType.searchMovie]: '/search/movie'
};

const fetchMoviesUrlMiddleware: Middleware<any, State> = () => next => action => {
  if (action.movieType && getFetchPaginationStartType(action.movieType) === action.type) {
    if (action.movieType === MovieType.searchMovie) {
      action.url = `https://api.themoviedb.org/3${urls[action.movieType as MovieType]}?page=${
        action.page
      }&query=${encodeURIComponent(action.query)}&api_key=1329f6fe0ea9aee966eade5d2d5da1d4`;
    } else {
      action.url = `https://api.themoviedb.org/3${urls[action.movieType as MovieType]}?page=${
        action.page
      }&api_key=1329f6fe0ea9aee966eade5d2d5da1d4`;
    }
  }
  return next(action);
};

export default fetchMoviesUrlMiddleware;
