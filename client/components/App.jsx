import React, { Component } from 'react';
import './App.scss';

let items = [
  <div className="todo-list_content_item" key="1">1</div>, 
  <div className="todo-list_content_item" key="2">2</div>
];

class App extends Component {
  addTask(event) {
    event.preventDefault();
    if (event.keyCode === 13) { // <Enter>
      items.push(
        <div className="todo-list_content_item" key="{Date.now()}">new</div>
      )
    }
  }

  render() { 
    return (
      <div className="todo-list">
        <input type="text" placeholder="Add a task ..." className="todo-list_add-task-input" onKeyUp={this.addTask}/>
        <div className="todo-list_content">
          {items}
          {/*<div className="todo-list_content_item"><input type="checkbox"/>lorem50</div>*/}
        </div>
        <div className="todo-list_toolbar">
          <span className="todo-list_toolbar_items-amount">Total item(s): X</span>
          <button className="todo-list_toolbar_button">All</button>
          <button className="todo-list_toolbar_button">Active</button>
          <button className="todo-list_toolbar_button">Completed</button>
          <button className="todo-list_toolbar_button">Clear completed</button>
        </div>  
      </div>
    );
  }
}

export default App; 