import {connect} from 'react-redux';

import Footer from '../components/Footer';

const mapStateToProps = state => ({
  todosAmount: state.todos.length,
  incompleteAmount: state.todos.filter(todo => !todo.completed).length
});

export default connect(
  mapStateToProps
)(Footer);