import React from 'react';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
// App
import './HomePage.scss'; 
import TodoMenu from './../../components/TodoMenu';
import { addTodoList, setListId, removeList } from './../../actions';

const HomePage = ({ todos, dispatch }) => {
  const onAddClick = () => {
    dispatch(addTodoList());
  };

  const onItemClick = event => {
    dispatch(setListId(event.currentTarget.dataset.id));
  }
  
  const onListDelete = event => {
    dispatch(removeList(event.currentTarget.dataset.id));
    event.preventDefault();
  }; 

  return (
    <div className='HomePage'>
      <h1>All todos</h1>
  
      <ul className="Homepage__List">
        {todos.map(todo => (
          <li key={todo.id}>
            <Link className="HomePage__Item" to={`/todolist/${todo.id}`} onClick={onItemClick} data-id={todo.id}>
              <i className="fas fa-list-ul list-icon"></i>
              <div className="info">
                <span className="title">{todo.title}</span>
                {/* <span className="edit-date">Opened {todo.editDate}</span> */}
              </div>
              <TodoMenu listId={todo.id} title={todo.title}/>
            </Link>
          </li>
        ))}
        <li>
          <Tooltip title="Add list">
            <div className="HomePage__Item HomePage__NewItem" onClick={onAddClick}>
              <i className="fas fa-plus-circle icon-add-list"></i>
            </div>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(
  mapStateToProps
)(HomePage);