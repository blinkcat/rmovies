import React, { useContext } from 'react';
import classNames from 'classnames';
import { Movie } from '../../store/pagination/types';
import TmdbConfigContext, { TmdbConfig } from '../../config/TmdbConfigContext';
import styles from './Card.module.scss';

export interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  const config = useContext(TmdbConfigContext);

  return (
    <div className={styles.root}>
      <div className={classNames(styles.rate, { [styles.high]: movie.vote_average! > 7 })}>
        {movie?.vote_average}
      </div>
      <img className={styles.post} src={getPosterPath(movie, config)} alt="movie poster" />
      <p className={styles.title}>{movie.title}</p>
    </div>
  );
};

export default Card;

export const CardWithMemo = React.memo(Card);

function getPosterPath(movie: Movie, config: TmdbConfig) {
  if (movie) {
    return config.imageBaseUrl + config.posterSize + movie.poster_path;
  } else {
    return '';
  }
}
