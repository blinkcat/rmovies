import { createSelector } from 'reselect';
import { State } from '../rootReducer';
import { MovieId, Movie, PaginationState } from './types';
import { EntityState } from '../entities/types';
import { MovieType } from '../ui/types';

export const getSelectedTypeMovies = createSelector<
  State,
  MovieType,
  MovieId[],
  EntityState<Movie>,
  Movie[]
>(
  (state, type) => state.pagination[type || state.ui.selectedMovieType].ids,
  state => state.entities.movies,
  (ids, movieEntity) => ids.map(id => movieEntity[id!])
);

export function hasMoreMovies(pagination: PaginationState) {
  return pagination.totalPages == null ? true : pagination.page < pagination.totalPages;
}
