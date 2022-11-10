import React from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

import './AddTodo.scss';
import { addItem } from '../store/todosSlice';

const AddTodo = () => {
  const {listId} = useParams();
  const dispatch = useDispatch();
  let inputRef = React.createRef();

  const onSubmit = event => {
    event.preventDefault();
    let inputElement = inputRef.current;

    if (!inputElement.value.trim()) return;

    dispatch(addItem({text: inputElement.value, listId}));
    inputElement.value = '';
  };
  
  return (
    <form onSubmit={onSubmit} className="AddTodo">
      <input type="text" required autoFocus placeholder="Type a task and press Enter..." 
        className="AddTodo__input" ref={inputRef}/>
    </form>
  );
};

export default AddTodo;