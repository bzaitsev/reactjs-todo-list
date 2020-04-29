import { connect } from 'react-redux';
// App
import { toggleTodo, VisibilityFilters, removeTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const mapStateToProps = state => {
  const todo = state.todos.filter(todo => todo.id === state.listId)[0];

  return {
    todos: getVisibleTodos(todo.items, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
};

const mapDispatchToProps = dispatch => ({
  toggleTodo: (id, listId) => dispatch(toggleTodo(id, listId)),
  removeTodo: (id, listId) => dispatch(removeTodo(id, listId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);