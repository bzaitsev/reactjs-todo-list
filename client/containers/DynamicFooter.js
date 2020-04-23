import {connect} from 'react-redux';

import Footer from '../components/Footer';
import {clearCompleted} from '../actions';

const mapStateToProps = state => {
  const todo = state.todos.filter(todo => todo.id === state.listId)[0];

  return {
    todosAmount: todo.items.length,
    incompleteAmount: todo.items.filter(todo => !todo.completed).length
  };
};

const mapDispatchToProps = dispatch => ({
  clearCompleted: (listId) => dispatch(clearCompleted(listId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);