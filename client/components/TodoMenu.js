import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import shortid from 'shortid';
import { connect } from 'react-redux';

import './TodoMenu.scss'; 
import { removeList, renameList } from '../actions';

const TodoMenu = function({dispatch, listId}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuId = shortid.generate();

  const onMenuClick = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const onMenuRename = event => {
    event.preventDefault();
    setAnchorEl(null);
  }; 

  const onMenuDelete = event => {
    dispatch(removeList(listId));
    event.preventDefault();
    setAnchorEl(null);
  }; 
  
  return (
    <div className='TodoMenu'>
      <Button className="menu-btn" aria-controls={menuId} aria-haspopup="true" onClick={onMenuClick}>
        <i className="fas fa-ellipsis-v menu-icon"></i> 
      </Button>      

      <Menu 
        id={menuId}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}>

        <MenuItem onClick={onMenuRename}>Rename</MenuItem>
        <MenuItem onClick={onMenuDelete}>Delete</MenuItem>
      </Menu>      
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  listId: props.listId
});

export default connect()(TodoMenu);