import {connect} from 'react-redux';

import Footer from '../components/Footer';
import {clearCompleted} from '../actions';

const mapStateToProps = state => ({
  todosAmount: state.todos.length,
  incompleteAmount: state.todos.filter(todo => !todo.completed).length
});

const mapDispatchToProps = dispatch => ({
  clearCompleted: () => dispatch(clearCompleted())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);