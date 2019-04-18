import React from 'react';

import AddTodo from '../containers/AddTodo';
import './Header.scss';

const Header = ({toggleAllTodos, hasIncomplete, noItems}) => {
  let checkboxClass = noItems ? 'visibility-hidden' : '';

  return (
    <header className="Header">
      <input type="checkbox" className={checkboxClass} checked={!hasIncomplete} onChange={() => toggleAllTodos()} title="Toggle all" />
      <AddTodo />
    </header>
  );
};

export default Header;