import React from 'react';
import classNames from 'classnames';
import {
  useParams
} from "react-router-dom";

import AddTodo from '../containers/AddTodo';
import './Header.scss';

const Header = ({toggleAllTodos, hasIncomplete, noItems}) => {
  const {listId} = useParams();

  let checkboxClass = classNames({
    'visibility-hidden': noItems
  });

  return (
    <header className="Header">
      <input 
        type="checkbox" 
        className={checkboxClass} 
        checked={!hasIncomplete} 
        onChange={() => toggleAllTodos(listId)} 
        title="Toggle all" />
      <AddTodo />
    </header>
  );
};

export default Header;