import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// App
import './Todo.scss';

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let rootClass = classNames({
      'Todo': true,
      'Todo--completed': this.props.completed
    });

    return (
      <li className={rootClass}
        onClick={this.props.onClick} >

        <input type="checkbox" checked={this.props.completed} readOnly />{this.props.text}

        <div className="Todo__toolbar">
          <IconButton 
            title="Remove item"
            className="Todo__remove-btn"
            onClick={this.props.onRemove}><HighlightOffIcon fontSize="small"/></IconButton>
        </div>
      </li>
    );
  }
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};


export default Todo;