import shortid from 'shortid';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const addTodo = (text, listId) => ({
  type: 'ADD_TODO',
  id: shortid.generate(),
  text, listId
});

export const removeTodo = (id, listId) => ({
  type: 'REMOVE_TODO',
  id, listId
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = (id, listId) => ({
  type: 'TOGGLE_TODO',
  id, listId
});

export const toggleAllTodos = (listId) => {
  return {
    type: 'TOGGLE_ALL_TODOS',
    listId
  };
};

export const clearCompleted = (listId) => {
  return {
    type: 'CLEAR_COMPLETED',
    listId
  };
};

export const addTodoList = () => ({
  type: 'ADD_TODO_LIST'
});

export const setListId = (id) => ({
  type: 'SET_LIST_ID',
  id
});

export const removeList = (id) => ({
  type: 'REMOVE_LIST',
  id
});

export const renameList = (id, title) => ({
  type: 'RENAME_LIST',
  id, title
});

export const setListEditDate = (id, editDate) => ({
  type: 'SET_LIST_EDIT_DATE',
  id, editDate
});