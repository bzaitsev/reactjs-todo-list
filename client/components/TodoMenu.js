import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import shortid from 'shortid';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
// App
import './TodoMenu.scss'; 
import { removeList, renameList } from '../actions';

const TodoMenu = function({dispatch, listId, title}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuId = shortid.generate();
  const [open, setOpen] = React.useState(false);
  const [listTitle, setListTitle] = React.useState(title);
  const [titleInvalid, setTitleInvalid] = React.useState(false);
  
  // Menu
  const onMenuClose = event => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const onMenuClick = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const onMenuRename = event => {
    onMenuClose(event);
    onDialogOpen();
  }; 

  const onMenuDelete = event => {
    dispatch(removeList(listId));
    onMenuClose(event);
  };  

  // Dialog
  const onDialogClick = event => {
    event.preventDefault();
  }; 

  const onDialogOpen = () => {
    setOpen(true);
    setListTitle(title);
  };

  const onDialogClose = event => {
    onMenuClose(event);
    setOpen(false);
  };

  const onDialogSave = event => {
    onMenuClose(event);

    if (!listTitle) {
      return;
    } else {
      dispatch(renameList(listId, listTitle));
    }
    
    setOpen(false);
  }; 

  // Other
  const onListTitleChange = event => {
    let value = event.target.value;
    setTitleInvalid(!value);
    setListTitle(value);
  };

  const onClearClick = () => {
    setListTitle('');
    setTitleInvalid(true);
    titleFieldRef.current.focus();
  };
  
  const titleFieldRef = React.createRef();
  const CloseBtn = listTitle 
    ? <CloseIcon className='btn-clear' onClick={onClearClick} fontSize='small'/>
    : null;

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

      <Dialog
        className="TodoMenu__renameDialog"
        fullWidth={true}
        maxWidth='xs'
        open={open}
        onClose={onDialogClose}
        onClick={onDialogClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Rename title"}</DialogTitle>
        <DialogContent className='title-field'>
          <TextField autoFocus required label="Title" className="text-field"
            inputRef={titleFieldRef}
            error={titleInvalid} 
            value={listTitle} 
            onChange={onListTitleChange}/>
          {CloseBtn}
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogSave} color="primary" variant="contained">Save</Button>
          <Button onClick={onDialogClose} color="secondary" variant="contained">Cancel</Button>
        </DialogActions>
      </Dialog>          
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  listId: props.listId,
  title: props.title
});

export default connect(
  mapStateToProps
)(TodoMenu);