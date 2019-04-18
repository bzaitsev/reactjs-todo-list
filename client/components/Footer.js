import React from 'react';
import classNames from 'classnames';

import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';
import './Footer.scss'; 

const Footer = ({todosAmount, incompleteAmount, clearCompleted}) => {
  let footerClass = classNames({
    'Footer': true,
    'Footer_hidden': todosAmount === 0
  });

  const noCompleted = (todosAmount - incompleteAmount) === 0;

  return (
    <footer className={footerClass}>
      <div className="Footer__items-amount">{incompleteAmount} item(s) left</div>
      <div className='Footer__toolbar'>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
          All
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
          Active
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
          Completed
        </FilterLink>
        <button type="button" disabled={noCompleted} className="Footer__btn-link" onClick={() => clearCompleted()}>Clear completed</button>
      </div>
    </footer>
  );
};

export default Footer;
