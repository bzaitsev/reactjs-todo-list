import React from 'react';
import {
  Link
} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Header from '../containers/Header';
import VisibleTodoList from '../containers/VisibleTodoList';
import DynamicFooter from '../containers/DynamicFooter';
import './TodoPage.scss'; 

const TodoPage = ({todo}) => {
  if (!todo) {
    window.location.href = '/';
  }

  return (
    <div className='TodoPage'>
      <Link to="/">&lt; Back</Link>
      <h1>
        {todo.title} 
        <IconButton color="default" aria-label="edit" component="span">
          <EditIcon />
        </IconButton>

        {/* <Input defaultValue={todo.title} inputProps={{ 'aria-label': 'description' }} />
        <IconButton color="default" aria-label="edit" component="span">
          <CheckCircleOutlineIcon />
        </IconButton> */}
      </h1>
      <div className="TodoPage_Todo">
        <Header />
        <VisibleTodoList />
        <DynamicFooter />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  todo: state.todos.filter(todo => todo.id === state.listId)[0]
});

export default connect(
  mapStateToProps
)(TodoPage);