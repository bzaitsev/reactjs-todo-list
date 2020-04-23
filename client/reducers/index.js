import { combineReducers } from 'redux';

import todos from './todos';
import visibilityFilter from './visibilityFilter';
import listId from './listId';

export default combineReducers({
  todos, visibilityFilter, listId
});