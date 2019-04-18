import React from 'react';
import classNames from 'classnames';

import AddTodo from '../containers/AddTodo';
import './Header.scss';

const Header = ({toggleAllTodos, hasIncomplete, noItems}) => {
  let checkboxClass = classNames({
    'visibility-hidden': noItems
  });

  return (
    <header className="Header">
      <input 
        type="checkbox" 
        className={checkboxClass} 
        checked={!hasIncomplete} 
        onChange={() => toggleAllTodos()} 
        title="Toggle all" />
      <AddTodo />
    </header>
  );
};

export default Header;