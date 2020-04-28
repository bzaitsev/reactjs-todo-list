import React from 'react';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
// App
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