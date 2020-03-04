import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toggle from './components/Toggle';
import MovieList from './components/MovieList';
import { CardWithMemo } from './components/Card';
import { setSearchLinkVisible, setCloseLinkVisible } from '../store/ui/actions';
import { State } from '../store/rootReducer';
import { PaginationState, Movie } from '../store/pagination/types';
import { MovieType } from '../store/ui/types';
import { fetchPaginationStart } from '../store/pagination/actions';
import { getSelectedTypeMovies, hasMoreMovies } from '../store/pagination/selector';
import styles from './List.module.scss';

export interface ListProps {
  type: MovieType;
}

const List: React.FC<ListProps> = ({ type }) => {
  const pagination = useSelector<State, PaginationState>(state => state.pagination[type]);
  const selectedMovies = useSelector<State, Movie[]>(state => getSelectedTypeMovies(state, type));
  const hasMore = hasMoreMovies(pagination);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchLinkVisible(true));
    dispatch(setCloseLinkVisible(false));
  }, [dispatch]);

  useEffect(() => {
    const { page, loading } = pagination;

    if (page === 0 && !loading) {
      dispatch(fetchPaginationStart(type, 1));
    }
  }, [dispatch, type, pagination]);

  const handleScroll = useCallback(() => {
    const { page, loading } = pagination;
    const hasMore = hasMoreMovies(pagination);

    if (!loading && hasMore) {
      dispatch(fetchPaginationStart(type, page + 1));
    }
  }, [dispatch, type, pagination]);

  return (
    <>
      <Toggle className={styles.toggle} />
      <MovieList
        list={selectedMovies}
        onNext={handleScroll}
        hasMore={hasMore}
        item={movie => <CardWithMemo movie={movie} />}
      />
    </>
  );
};

export default List;
