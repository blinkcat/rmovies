import { Action } from 'redux';

export enum MovieType {
  popular = 'popular',
  nowPlaying = 'nowPlaying',
  topRated = 'topRated',
  upcoming = 'upcoming',
  searchMovie = 'searchMovie'
}

export interface UiState {
  selectedMovieType: MovieType;
  searchLinkVisible: boolean;
  closeLinkVisible: boolean;
}

export type UiActionType = string;

export interface UiAction extends Action<UiActionType> {
  selectedType?: MovieType;
  searchLinkVisible?: boolean;
  closeLinkVisible?: boolean;
}
