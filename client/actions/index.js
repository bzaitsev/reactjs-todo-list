let nextTodoId = 0;

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

export const removeTodo = id => ({
  type: 'REMOVE_TODO',
  id
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});

export const toggleAllTodos = () => {
  return {
    type: 'TOGGLE_ALL_TODOS'
  };
};

export const clearCompleted = () => {
  return {
    type: 'CLEAR_COMPLETED'
  };
};