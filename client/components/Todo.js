import React from 'react';
import PropTypes from 'prop-types';

import './Todo.scss';

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <li className='todo-list_content_item Todo'
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none'
        }}>
        
        <label className="Todo__text">
          <input type="checkbox" checked={this.props.completed} readOnly />{this.props.text}
        </label>

        <div className="Todo__toolbar">
          <button 
            className="Todo__remove-btn"
            onClick={this.props.onRemove}
          >X</button>
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