import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import './Content.scss';
import Todo from './Todo';
import { VisibilityFilters, selectVisibilityFilter } from '../store/visibilitySlice';
import { 
  removeItem, toggleItem,
  selectItemsByListId
} from '../store/todosSlice';

const getVisibleItems = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const Content = () => { 
  const {listId} = useParams();
  const dispatch = useDispatch();
  let allItems = useSelector(state => selectItemsByListId(state, listId));
  let visibilityFilter = useSelector(selectVisibilityFilter);
  let items = getVisibleItems(allItems, visibilityFilter);
  
  if (!items.length) return null;

  return (
    <ul className='Content'>
      <TransitionGroup>
        {items.map(item =>
          <CSSTransition 
            key={item.id}
            classNames='Todo'
            enter={visibilityFilter === VisibilityFilters.SHOW_ALL}
            exit={visibilityFilter === VisibilityFilters.SHOW_ALL && !!items.length}
            timeout={{ exit: 300, enter: 500 }}>
            <Todo
              {...item}
              onClick={() => dispatch(toggleItem({id: item.id, listId}))}
              onRemove={() => dispatch(removeItem({id: item.id, listId}))}/>
          </CSSTransition>
        )}
      </TransitionGroup>
    </ul>
  );
}

export default Content;