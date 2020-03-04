import React, { useContext } from 'react';
import classNames from 'classnames';
import { Movie } from '../../store/pagination/types';
import TmdbConfigContext, { TmdbConfig } from '../../config/TmdbConfigContext';
import styles from './SearchCard.module.scss';

export interface SearchCardProps {
  movie: Movie;
}

const SearchCard: React.FC<SearchCardProps> = ({ movie }) => {
  const config = useContext(TmdbConfigContext);

  return (
    <div className={styles.root}>
      <img className={styles.post} src={getPosterPath(movie, config)} alt="poster" />
      <div className={styles.detail}>
        <div className={styles.title}>{movie.title}</div>
        <div>
          <span
            className={classNames(styles.vote, { [styles.hign]: (movie?.vote_average || 0) > 7 })}
          >
            {movie.vote_average} User Score
          </span>
          <span className="date">{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

export const SearchCardWithMemo = React.memo(SearchCard);

function getPosterPath(movie: Movie, config: TmdbConfig) {
  if (movie) {
    return config.imageBaseUrl + config.posterSize + movie.poster_path;
  } else {
    return '';
  }
}
