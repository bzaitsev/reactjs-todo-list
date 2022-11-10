
import { configureStore } from "@reduxjs/toolkit";

import listIdReducer from './listIdSlice';
import todosReducer from './todosSlice';
import visibilityReducer from './visibilitySlice';

const store = configureStore({
  reducer: {
    listId: listIdReducer,
    todos: todosReducer,
    visibilityFilter: visibilityReducer
  }
});

export default store;