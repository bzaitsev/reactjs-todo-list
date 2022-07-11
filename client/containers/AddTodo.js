import React from 'react';
import { connect } from 'react-redux';
import {
  useParams
} from "react-router-dom";
// App
import { addTodo } from '../actions';
import './AddTodo.scss';

const AddTodo = ({ dispatch }) => {
  let inputRef = React.createRef();
  const {listId} = useParams();

  const onSubmit = event => {
    event.preventDefault();
    let inputElement = inputRef.current;

    if (!inputElement.value.trim()) return;

    dispatch(addTodo(inputElement.value, listId));
    inputElement.value = '';
  };
  
  return (
    <form onSubmit={onSubmit} className="AddTodo">
      <input type="text" required autoFocus placeholder="Type a task and press Enter..." 
        className="AddTodo__input" ref={inputRef}/>
    </form>
  );
};

export default connect()(AddTodo);