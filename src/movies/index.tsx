import React from 'react';
import { RouteComponentProps, Link, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toolbar from './components/Toolbar';
import Icon from './components/Icon';
import { State } from '../store/rootReducer';
import List from './List';
import Search from './Search';
import { MovieType } from '../store/ui/types';
import styles from './index.module.scss';

const Home: React.FC<RouteComponentProps> = ({ match }) => {
  const searchLinkVisible = useSelector<State>(state => state.ui.searchLinkVisible);
  const closeLinkVisible = useSelector<State>(state => state.ui.closeLinkVisible);

  return (
    <div className={styles.root}>
      <Toolbar className={styles.toolbar}>
        <span className={styles.spacer}></span>
        {searchLinkVisible && (
          <Link to={`${match.url}/search`} className={styles.link}>
            <Icon type="search" />
          </Link>
        )}
        {closeLinkVisible && (
          <Link to={`${match.url}/`} className={styles.link}>
            <Icon type="close" />
          </Link>
        )}
      </Toolbar>
      <Switch>
        <Route path={`${match.url}/popular`}>
          <List type={MovieType.popular} />
        </Route>
        <Route path={`${match.url}/now-playing`}>
          <List type={MovieType.nowPlaying} />
        </Route>
        <Route path={`${match.url}/top-rated`}>
          <List type={MovieType.topRated} />
        </Route>
        <Route path={`${match.url}/upcoming`}>
          <List type={MovieType.upcoming} />
        </Route>
        <Route path={`${match.url}/search`}>
          <Search />
        </Route>
        <Redirect to={`${match.url}/popular`} />
      </Switch>
    </div>
  );
};

export default Home;
