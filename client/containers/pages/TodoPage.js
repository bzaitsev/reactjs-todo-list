import React from 'react';
import {
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
// App
import Header from './../Header';
import VisibleTodoList from './../VisibleTodoList';
import DynamicFooter from './../DynamicFooter';
import './TodoPage.scss'; 

const TodoPage = ({todo}) => {
  if (!todo) {
    window.location.href = '/';
  }

  return (
    <div className='TodoPage'>
      <Link to="/">&lt; Back</Link>
      <h1>
        <span className="gradient-text">{todo.title}</span> 
      </h1>
      <div className="TodoPage__Todo">
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