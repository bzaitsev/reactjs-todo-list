import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({ dispatch }) => {
  let onInputKeyUp = function(event) {
    if (event.keyCode !== 13) return; // <Enter>
  
    let input = event.target;

    dispatch(addTodo(input.value));
    input.value = '';  
  };  
  
  return (
    <input type="text" placeholder="Add a task ..." className="todo-list_add-task-input" onKeyUp={onInputKeyUp}/>
  );
};

export default connect()(AddTodo);