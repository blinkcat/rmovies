import { MovieType, UiAction } from './types';

export const SELECT_MOVIE_TYPE = 'select-movie-type';
export const SET_SEARCH_LINK_VISIBLE = 'set-search-link-visible';
export const SET_CLOSE_LINK_VISIBLE = 'set-close-link-visible';

export function selectMovieType(movieType: MovieType): UiAction {
  return {
    type: SELECT_MOVIE_TYPE,
    selectedType: movieType
  };
}

export function setSearchLinkVisible(visible: boolean) {
  return {
    type: SET_SEARCH_LINK_VISIBLE,
    searchLinkVisible: visible
  };
}

export function setCloseLinkVisible(visible: boolean) {
  return {
    type: SET_CLOSE_LINK_VISIBLE,
    closeLinkVisible: visible
  };
}
