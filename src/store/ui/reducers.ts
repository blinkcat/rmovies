import { Reducer } from 'redux';
import { UiState, MovieType, UiAction } from './types';
import { SELECT_MOVIE_TYPE, SET_SEARCH_LINK_VISIBLE, SET_CLOSE_LINK_VISIBLE } from './actions';

const initialState: UiState = {
  selectedMovieType: MovieType.popular,
  searchLinkVisible: true,
  closeLinkVisible: false
};

const ui: Reducer<UiState, UiAction> = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MOVIE_TYPE:
      return { ...state, selectedMovieType: action.selectedType! };
    case SET_SEARCH_LINK_VISIBLE:
      return { ...state, searchLinkVisible: action.searchLinkVisible! };
    case SET_CLOSE_LINK_VISIBLE:
      return { ...state, closeLinkVisible: action.closeLinkVisible! };
    default:
      return state;
  }
};

export default ui;
