import React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import Movies from './movies';
import './App.scss';

const App: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}rmovie`} component={Movies} />
      <Redirect to={`${match.url}rmovie`} exact />
    </Switch>
  );
};

export default App;
