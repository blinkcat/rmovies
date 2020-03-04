import { combineReducers, Reducer } from 'redux';
import { EntityState } from './types';
import { PaginationAction, Movie } from '../pagination/types';
import { getFetchPaginationSuccessType } from '../pagination/actions';

const entities = combineReducers({
  movies: createEntities<Movie>('movies')
});

export default entities;

function createEntities<T>(name: string): Reducer<EntityState<T>, PaginationAction> {
  return (state = {}, action) => {
    switch (action.type) {
      case getFetchPaginationSuccessType(action.movieType):
        return { ...state, ...(action.payload!.entities as any)[name] };
      default:
        return state;
    }
  };
}
