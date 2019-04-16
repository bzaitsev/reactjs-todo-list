import {connect} from 'react-redux';

import Header from '../components/Header';
import { toggleAllTodos } from '../actions';

const mapStateToProps = state => ({
  hasIncomplete: !!state.todos.filter(todo => !todo.completed).length,
  noItems: state.todos.length === 0
});

const mapDispatchToProps = dispatch => ({
  toggleAllTodos: () => dispatch(toggleAllTodos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);