import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  useParams
} from "react-router-dom";
// App
import Todo from './Todo';
import { VisibilityFilters } from '../actions';
import './TodoList.scss';

const TodoList = ({ todos, toggleTodo, removeTodo, visibilityFilter }) => {
  if (!todos.length) return null;

  const {listId} = useParams();

  return (
    <ul className='TodoList'>
      <ReactCSSTransitionGroup
        transitionName={{
          enter: 'Todo_enter',
          leave: 'Todo_leave'
        }}
        transitionEnter={visibilityFilter === VisibilityFilters.SHOW_ALL}
        transitionLeave={visibilityFilter === VisibilityFilters.SHOW_ALL && !!todos.length}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => toggleTodo(todo.id, listId)}
            onRemove={() => removeTodo(todo.id, listId)}/>
        )}
      </ReactCSSTransitionGroup>
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;