import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

import './Lists.scss'; 
import ListMenu from './ListMenu';
import { setListId } from '../store/listIdSlice';
import { 
  addList, 
  selectLists 
} from '../store/todosSlice';

const Lists = () => {
  const dispatch = useDispatch();
  let lists = useSelector(selectLists);

  const onAddClick = () => {
    dispatch(addList());
  };

  const onItemClick = event => {
    dispatch(setListId(event.currentTarget.dataset.id));
  }

  let h1Content = 'Todo lists 2';

  return (
    <div className='Lists'>
      <h1><span className="gradient-text shine" data-content={h1Content}>{h1Content}</span></h1>
  
      <ul className="Lists__box">
        {lists.map(list => (
          <li key={list.id}>
            <Link className="Lists__Item" to={`${window.appConfig.root}todolist/${list.id}`} onClick={onItemClick} data-id={list.id}>
              <i className="fas fa-list-ul list-icon"></i>
              <div className="info">
                <span className="title">{list.title}</span>
              </div>
              <ListMenu listId={list.id} title={list.title}/>
            </Link>
          </li>
        ))}
        <li>
          <Tooltip title="Add list">
            <div className="Lists__Item Lists__NewItem" onClick={onAddClick}>
              <i className="fas fa-plus-circle icon-add-list"></i>
            </div>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default Lists;