import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { filter, catchError, takeUntil, map, mergeMap } from 'rxjs/operators';
import { normalize, schema } from 'normalizr';
import { State } from '../rootReducer';
import { PaginationAction, Movie } from '../pagination/types';
import {
  getFetchPaginationStartType,
  fetchPaginationFailure,
  fetchPaginationSuccess,
  getFetchPaginationCancellationType
} from '../pagination/actions';
import { EntityState } from '../entities/types';

const movieSchema = { results: [new schema.Entity('movies')] };

export const fetchMovies: Epic<PaginationAction, any, State> = action$ =>
  action$.pipe(
    filter(action => action.type === getFetchPaginationStartType(action.movieType)),
    mergeMap(action =>
      ajax(action.url!).pipe(
        map(res => {
          const resolvedData = normalize(res.response, movieSchema);

          return fetchPaginationSuccess(action.movieType, {
            result: {
              page: resolvedData.result.page,
              ids: resolvedData.result.results,
              loading: false,
              totalPages: resolvedData.result.total_pages,
              totalResults: resolvedData.result.total_results
            },
            entities: resolvedData.entities as { movies: EntityState<Movie> }
          });
        }),
        takeUntil(
          action$.pipe(
            filter(action => action.type === getFetchPaginationCancellationType(action.movieType))
          )
        ),
        catchError(() => of(fetchPaginationFailure(action.movieType)))
      )
    )
  );
