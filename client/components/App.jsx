import React from 'react';

import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import DynamicFooter from '../containers/DynamicFooter';
import './App.scss'; 

const App = () => (
  <div className='todo-list'>
    <AddTodo />
    <VisibleTodoList />
    <DynamicFooter />
  </div>
);

export default App;