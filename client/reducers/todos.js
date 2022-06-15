import shortid from 'shortid';
import { createReducer } from "@reduxjs/toolkit";

const initialList = {
  id: shortid.generate(),
  title: "List 1",
  editDate: Date.now(),
  items: []
};

const todos = createReducer([initialList], {
  'ADD_TODO_LIST': (state, action) => {
    return [
      ...state,
      {
        id: shortid.generate(),
        title: `List ${state.length + 1}`,
        editDate: Date.now(),
        items: []
      }
    ];    
  },
  'ADD_TODO': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
 
    todo.items.push({
      id: action.id,
      text: action.text,
      completed: false
    });

    return state;    
  },
  'REMOVE_TODO': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
    todo.items = todo.items.filter(todo => todo.id !== action.id);
    return state;
  },
  'TOGGLE_TODO': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];

    todo.items = todo.items.map(todo =>
      (todo.id === action.id)
        ? {...todo, completed: !todo.completed}
        : todo
    );

    return state;
  },
  'TOGGLE_ALL_TODOS': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
    const hasIncomplete = !!todo.items.filter(todo => !todo.completed).length;
      
    if (hasIncomplete) {
      todo.items = todo.items.map(todo => ({...todo, completed: true}));
    } else {
      todo.items = todo.items.map(todo => ({...todo, completed: false}));
    }

    return state;
  },
  'CLEAR_COMPLETED': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
    todo.items = todo.items.filter(todo => !todo.completed);
    return state;
  },
  'REMOVE_LIST': (state, action) => {
    return state.filter(list => list.id !== action.id);
  },
  'RENAME_LIST': (state, action) => {
    return state.forEach(list => {
      if (list.id === action.id) {
        list.title = action.title;
      } 
    });
  },
  'SET_LIST_EDIT_DATE': (state, action) => {
    return state.map(list => {
      if (list.id === action.id) {
        list.editDate = action.editDate;
      } 

      return list;
    });    
  }
});

export default todos;