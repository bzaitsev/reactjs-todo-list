import React from 'react';

import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';
import './Footer.scss'; 

const Footer = ({todosAmount, incompleteAmount}) => {
  let footerClass = todosAmount === 0 
    ? 'display-none' 
    : 'Footer';

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
      </div>
    </footer>
  );
};

export default Footer;
