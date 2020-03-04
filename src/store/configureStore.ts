import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';
import fetchMoviesUrlMiddleware from './pagination/fetchMoviesUrlMiddleware';

const epicMiddleware = createEpicMiddleware();

export default function configureStore(preloadedState?: any) {
  const middlewares = [fetchMoviesUrlMiddleware, epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  //   const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  //   const composedEnhancers = composeWithDevTools(...enhancers);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}
