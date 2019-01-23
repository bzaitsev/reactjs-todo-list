import React from 'react';

import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';
import './App.scss';

const App = () => (
  <div className='todo-list'>
    <AddTodo />
    <VisibleTodoList />
    <Footer />    
  </div>
);

export default App;