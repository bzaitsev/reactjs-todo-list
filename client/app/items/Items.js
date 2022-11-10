import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

import './Items.scss'; 
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { 
  selectList
} from '../store/todosSlice';
import { 
  selectListId
} from '../store/listIdSlice';

const Items = () => {
  let listId = useSelector(selectListId);
  let list = useSelector(state => selectList(state, listId));

  if (!list) {
    window.location.href = window.appConfig.root;
  }

  return (<>
    <Link to={window.appConfig.root} className="Items__btn-back">
      <Button variant="outlined" size="small">
        <i className="icon-back fas fa-angle-left"></i> Back
      </Button>
    </Link>

    <div className='Items'>
      <h1>
        <span className="gradient-text">{list.title}</span> 
        <div className='megafancy'>Just do it!</div>
      </h1>
      <div className="Items__box">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  </>);
};

export default Items;