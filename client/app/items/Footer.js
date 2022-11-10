import React from 'react';
import classNames from 'classnames';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

import './Footer.scss'; 
import FilterLink from './FilterLink';
import { VisibilityFilters } from '../store/visibilitySlice';
import { 
  clearCompleted,
  selectItemsByListId
} from '../store/todosSlice';

const Footer = () => {
  const {listId} = useParams();
  let items = useSelector(state => selectItemsByListId(state, listId));
  let itemsAmount = items.length;
  let incompleteAmount = items.filter(item => !item.completed).length;
  const dispatch = useDispatch();

  let footerClass = classNames({
    'Footer': true,
    'Footer--hidden': itemsAmount === 0
  });

  const noCompleted = (itemsAmount - incompleteAmount) === 0;

  return (
    <footer className={footerClass}>
      <div className='Footer__toolbar'>
        <div className="Footer__items-amount">{incompleteAmount} item(s) left</div>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
          All
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
          Active
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
          Completed
        </FilterLink>
        <Button 
          variant="outlined"
          disabled={noCompleted}
          onClick={() => dispatch(clearCompleted({listId}))} >Clear completed</Button>
      </div>
    </footer>
  );
};

export default Footer;
