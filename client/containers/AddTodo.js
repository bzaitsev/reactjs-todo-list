import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';
import './AddTodo.scss';

const AddTodo = ({ dispatch }) => {
  let inputRef = React.createRef();

  const onSubmit = event => {
    event.preventDefault();
    let inputElement = inputRef.current;

    if (!inputElement.value.trim()) return;

    dispatch(addTodo(inputElement.value));
    inputElement.value = '';
  };
  
  return (
    <form onSubmit={onSubmit} className="AddTodo">
      <input type="text" required placeholder="Type a task and press <Enter>..." className="AddTodo__input" ref={inputRef}/>
    </form>
  );
};

export default connect()(AddTodo);