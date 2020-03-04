import { PaginationActionType, PaginationAction, PaginationPaylod } from './types';
import { MovieType } from '../ui/types';

export function getFetchPaginationStartType(type: MovieType): PaginationActionType {
  return `fetch-${type}-pagination-start`;
}

export function getFetchPaginationSuccessType(type: MovieType): PaginationActionType {
  return `fetch-${type}-pagination-success`;
}

export function getFetchPaginationFailureType(type: MovieType): PaginationActionType {
  return `fetch-${type}-pagination-failure`;
}

export function getResetType(type: MovieType): PaginationActionType {
  return `reset-${type}-pagination`;
}

export function getFetchPaginationCancellationType(type: MovieType): PaginationActionType {
  return `fetch-${type}-pagination-cancellation`;
}

export function fetchPaginationStart(type: MovieType, page = 1): PaginationAction {
  return {
    type: getFetchPaginationStartType(type),
    movieType: type,
    page
  };
}

export function queryPaginationStart(query: string, page = 1): PaginationAction {
  return {
    type: getFetchPaginationStartType(MovieType.searchMovie),
    movieType: MovieType.searchMovie,
    query,
    page
  };
}

export function fetchPaginationSuccess(
  type: MovieType,
  payload: PaginationPaylod
): PaginationAction {
  return {
    type: getFetchPaginationSuccessType(type),
    movieType: type,
    payload
  };
}

export function fetchPaginationFailure(type: MovieType): PaginationAction {
  return {
    type: getFetchPaginationFailureType(type),
    movieType: type
  };
}

export function fetchPaginationCancellation(type: MovieType): PaginationAction {
  return {
    type: getFetchPaginationCancellationType(type),
    movieType: type
  };
}

export function resetPagination(type: MovieType): PaginationAction {
  return {
    type: getResetType(type),
    movieType: type
  };
}
