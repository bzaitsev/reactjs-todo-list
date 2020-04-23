import React from 'react';
import {
  Link
} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import './HomePage.scss'; 
import TodoMenu from './TodoMenu';
import { addTodoList, setListId, removeList } from '../actions';

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
  
      <ul className="Homepage_List">
        {todos.map(todo => (
          <li key={todo.id}>
            <Link className="HomePage_Item" to={`/todolist/${todo.id}`} onClick={onItemClick} data-id={todo.id}>
              <i className="fas fa-list-ul list-icon"></i>
              <div className="info">
                <span className="title">{todo.title}</span>
                {/* <span className="edit-date">Opened {todo.editDate}</span> */}
              </div>
              {/* <TodoMenu listId={todo.id}/> */}
              <Tooltip title="Delete">
                <Button className="remove-btn" onClick={onListDelete} data-id={todo.id}>
                  <i className="far fa-trash-alt remove-icon"></i> 
                </Button>              
              </Tooltip>
            </Link>
          </li>
        ))}
        <li>
          <Tooltip title="Add list">
            <div className="HomePage_Item HomePage_ItemAdd" onClick={onAddClick}>
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