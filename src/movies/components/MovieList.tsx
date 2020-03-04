import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
import { Movie } from '../../store/pagination/types';
import styles from './MovieList.module.scss';

export interface MovieListProps {
  list: Movie[];
  item: (movie: Movie) => React.ReactNode;
  hasMore: boolean;
  onNext: () => any;
  singleColumn?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ list, item, hasMore, onNext, singleColumn }) => (
  <InfiniteScroll
    scrollThreshold={0.9}
    dataLength={list.length}
    loader=""
    next={onNext}
    hasMore={hasMore}
    className={styles.root}
  >
    {list.map(movie => (
      <div
        key={movie.id}
        className={classNames(styles.item, { [styles['single-column']]: singleColumn })}
      >
        {item(movie)}
      </div>
    ))}
  </InfiniteScroll>
);

export default MovieList;
