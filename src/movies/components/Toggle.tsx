import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MovieType } from '../../store/ui/types';
import styles from './Toggle.module.scss';

const toggleMap = {
  [MovieType.popular]: { label: 'Popular', link: '/rmovie/popular' },
  [MovieType.nowPlaying]: {
    label: 'Now Playing',
    link: '/rmovie/now-playing'
  },
  [MovieType.topRated]: {
    label: 'Top Rated',
    link: '/rmovie/top-rated'
  },
  [MovieType.upcoming]: { label: 'Upcoming', link: '/rmovie/upcoming' }
};

export interface ToggleProps {
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ className }) => (
  <nav className={classNames(styles.root, className)}>
    {Object.values(toggleMap).map(toggleItem => (
      <NavLink
        to={toggleItem.link}
        className={styles.item}
        activeClassName={styles.active}
        key={toggleItem.label}
      >
        {toggleItem.label}
      </NavLink>
    ))}
  </nav>
);

export default Toggle;
