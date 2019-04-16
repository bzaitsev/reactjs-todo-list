import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';

const AddTodo = ({ dispatch }) => {
  let inputElement;

  const onSubmit = event => {
    event.preventDefault();

    if (!inputElement.value.trim()) return;

    dispatch(addTodo(inputElement.value));
    inputElement.value = '';
  };
  
  return (
    <form onSubmit={onSubmit}>
      <input type="text" required placeholder="Type a task and press Enter ..." className="todo-list_add-task-input" ref={node => (inputElement = node)}/>
    </form>
  );
};

export default connect()(AddTodo);