import React from 'react';
import classNames from 'classnames';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import './Header.scss';
import AddTodo from './AddTodo';
import { 
  toggleAllItems,
  selectItemsByListId
} from '../store/todosSlice';

const Header = () => {
  const {listId} = useParams();
  const dispatch = useDispatch();
  let items = useSelector(state => selectItemsByListId(state, listId));
  let noItems = items.length === 0;
  let hasIncomplete = items.some(item => !item.completed);

  let checkboxClass = classNames({
    'visibility-hidden': noItems
  });

  return (
    <header className="Header">
      <input 
        type="checkbox" 
        className={checkboxClass} 
        checked={!hasIncomplete} 
        onChange={() => dispatch(toggleAllItems({listId}))}
        title="Toggle all" />
      <AddTodo />
    </header>
  );
};

export default Header;