import { combineReducers } from 'redux';
import entities from './entities/reducers';
import pagination from './pagination/reducers';
import ui from './ui/reducers';

const rootReducer = combineReducers({ entities, pagination, ui });

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
