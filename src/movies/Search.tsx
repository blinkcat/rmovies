import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { setSearchLinkVisible, setCloseLinkVisible } from '../store/ui/actions';
import SearchInput from './components/SearchInput';
import SearchGuide from './components/SearchGuide';
import {
  resetPagination,
  fetchPaginationCancellation,
  queryPaginationStart
} from '../store/pagination/actions';
import { MovieType } from '../store/ui/types';
import { State } from '../store/rootReducer';
import { PaginationState, Movie } from '../store/pagination/types';
import { getSelectedTypeMovies, hasMoreMovies } from '../store/pagination/selector';
import MovieList from './components/MovieList';
import { SearchCardWithMemo } from './components/SearchCard';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const pagination = useSelector<State, PaginationState>(
    state => state.pagination[MovieType.searchMovie]
  );
  const selectedMovies = useSelector<State, Movie[]>(state =>
    getSelectedTypeMovies(state, MovieType.searchMovie)
  );
  const hasMore = hasMoreMovies(pagination);

  const dispatch = useDispatch();
  const inputSubject = useMemo(() => new Subject<string>(), []);
  const [guideVisible, showGuide] = useState(true);
  const queryRef = useRef('');

  const reset = useCallback(() => {
    dispatch(fetchPaginationCancellation(MovieType.searchMovie));
    dispatch(resetPagination(MovieType.searchMovie));
  }, [dispatch]);
  const search = useCallback(
    (query: string, page = 1) => {
      reset();
      queryRef.current = query;
      if (query) {
        dispatch(queryPaginationStart(query, page));
      }
    },
    [dispatch, reset]
  );
  const handleScroll = useCallback(() => {
    const { page, loading } = pagination;
    const hasMore = hasMoreMovies(pagination);

    if (!loading && hasMore) {
      dispatch(queryPaginationStart(queryRef.current, page + 1));
    }
  }, [dispatch, pagination]);

  const subscription = useMemo(
    () =>
      inputSubject
        .asObservable()
        .pipe(
          tap(v => {
            if (v) {
              showGuide(false);
            } else {
              showGuide(true);
              reset();
            }
          }),
          debounceTime(600),
          distinctUntilChanged()
        )
        .subscribe(search),
    [inputSubject, showGuide, reset, search]
  );

  const handleInput = useCallback(
    (val: string) => {
      inputSubject.next(val);
    },
    [inputSubject]
  );

  useEffect(() => {
    dispatch(setSearchLinkVisible(false));
    dispatch(setCloseLinkVisible(true));

    return () => {
      subscription.unsubscribe();
      inputSubject.complete();
      reset();
    };
  }, [dispatch, inputSubject, subscription, reset]);

  return (
    <>
      <SearchInput onInput={handleInput} className={styles.input} />
      {guideVisible ? (
        <SearchGuide />
      ) : (
        <MovieList
          singleColumn
          item={movie => <SearchCardWithMemo movie={movie} />}
          onNext={handleScroll}
          hasMore={hasMore}
          list={selectedMovies}
        />
      )}
    </>
  );
};

export default Search;
