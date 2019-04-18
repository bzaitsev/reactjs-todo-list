import React from 'react';

import Header from '../containers/Header';
import VisibleTodoList from '../containers/VisibleTodoList';
import DynamicFooter from '../containers/DynamicFooter';
import './App.scss'; 

const App = () => (
  <div className='App'>
    <Header />
    <VisibleTodoList />
    <DynamicFooter />
  </div>
);

export default App;