import { combineEpics } from 'redux-observable';
import { fetchMovies } from './pagination/epics';
import { catchError } from 'rxjs/operators';

const rootEpic = (action$: any, store$: any, dependencies: any) =>
  combineEpics(fetchMovies)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
