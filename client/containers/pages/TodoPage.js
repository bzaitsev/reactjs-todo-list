import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// App
import Header from './../Header';
import VisibleTodoList from './../VisibleTodoList';
import DynamicFooter from './../DynamicFooter';
import './TodoPage.scss'; 

const TodoPage = ({todo}) => {
  if (!todo) {
    window.location.href = '/';
  }

  return (<>
    <Link to="/" className="TodoPage__btn-back"><Button variant="outlined" size="small"><i className="icon-back fas fa-angle-left"></i> Back</Button></Link>
    <div className='TodoPage'>
      <h1>
        <span className="gradient-text">{todo.title}</span> 
        <div className='megafancy'>Just do it!</div>
      </h1>
      <div className="TodoPage__Todo">
        <Header />
        <VisibleTodoList />
        <DynamicFooter />
      </div>
    </div>
  </>);
};

const mapStateToProps = state => ({
  todo: state.todos.filter(todo => todo.id === state.listId)[0]
});

export default connect(
  mapStateToProps
)(TodoPage);