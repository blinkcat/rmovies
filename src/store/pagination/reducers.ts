import { combineReducers, Reducer } from 'redux';
import { PaginationState, PaginationAction } from './types';
import { MovieType } from '../ui/types';
import {
  getFetchPaginationSuccessType,
  getResetType,
  getFetchPaginationStartType,
  getFetchPaginationFailureType,
  getFetchPaginationCancellationType
} from './actions';

const pagination = combineReducers({
  popular: createPagination(MovieType.popular),
  nowPlaying: createPagination(MovieType.nowPlaying),
  upcoming: createPagination(MovieType.upcoming),
  topRated: createPagination(MovieType.topRated),
  searchMovie: createPagination(MovieType.searchMovie)
});

export default pagination;

function createPagination(type: MovieType): Reducer<PaginationState, PaginationAction> {
  const initialState: PaginationState = {
    page: 0,
    ids: [],
    loading: false
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case getFetchPaginationStartType(type):
        return { ...state, loading: true };
      case getFetchPaginationFailureType(type):
        return { ...state, loading: false };
      case getFetchPaginationSuccessType(type):
        const ids = state.ids.concat(action.payload?.result.ids || []);
        return { ...state, ...action.payload?.result, ids };
      case getFetchPaginationCancellationType(type):
        return { ...state, loading: false };
      case getResetType(type):
        return initialState;
      default:
        return state;
    }
  };
}
