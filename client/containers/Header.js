import {connect} from 'react-redux';

import Header from '../components/Header';
import { toggleAllTodos } from '../actions';

const mapStateToProps = state => {
  const todo = state.todos.filter(todo => todo.id === state.listId)[0];

  return {
    hasIncomplete: !!todo.items.filter(todo => !todo.completed).length,
    noItems: todo.items.length === 0
  };
};

const mapDispatchToProps = dispatch => ({
  toggleAllTodos: (listId) => dispatch(toggleAllTodos(listId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);