import shortid from 'shortid';
import { createReducer } from "@reduxjs/toolkit";
import Dexie from 'dexie';
import db from '../db';

let dbExists = await Dexie.exists(appConfig.dbName);

if (!dbExists) {
  await db.storeLists.add({
    id: shortid.generate(),
    title: "List 1",
    editDate: Date.now()
  });
}

let initialData = [];
let lists = await db.storeLists.toCollection().sortBy('editDate');
let items = await db.storeItems.toCollection().sortBy('text');

initialData = initialData.concat(lists);
initialData.forEach(list => {
  list.items = items.filter(item => item.listId == list.id);
});

const todos = createReducer(initialData, {
  'ADD_TODO_LIST': (state, action) => {
    const id = shortid.generate();
    const title = `List ${state.length + 1}`;
    const editDate = Date.now();

    db.storeLists.add({id, title, editDate});

    return [
      ...state,
      {
        id,
        title,
        editDate,
        items: []
      }
    ];    
  },
  'ADD_TODO': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
    let newItem = {
      id: action.id,
      text: action.text,
      completed: false,
      listId: action.listId
    };

    db.storeItems.add(newItem);
    todo.items.push(newItem);

    return state;    
  },
  'REMOVE_TODO': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
    db.storeItems.where({listId: action.listId, id: action.id}).delete();
    todo.items = todo.items.filter(todo => todo.id !== action.id);
    return state;
  },
  'TOGGLE_TODO': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
    
    todo.items = todo.items.map(todo => {
      if (todo.id === action.id) {
        db.storeItems.where({listId: action.listId, id: action.id}).modify({completed: !todo.completed});
        return {...todo, completed: !todo.completed};
      } else {
        return todo;
      }
    });

    return state;
  },
  'TOGGLE_ALL_TODOS': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];
    const hasIncomplete = !!todo.items.filter(todo => !todo.completed).length;
      
    if (hasIncomplete) {
      db.storeItems.where({listId: action.listId}).modify({completed: true});
      todo.items = todo.items.map(todo => ({...todo, completed: true}));
    } else {
      db.storeItems.where({listId: action.listId}).modify({completed: false});
      todo.items = todo.items.map(todo => ({...todo, completed: false}));
    }

    return state;
  },
  'CLEAR_COMPLETED': (state, action) => {
    let todo = state.filter(todo => todo.id === action.listId)[0];

    db.storeItems.where({listId: action.listId}).modify(function() {
      if (this.value.completed) delete this.value;
    });
    
    todo.items = todo.items.filter(todo => !todo.completed);
    return state;
  },
  'REMOVE_LIST': (state, action) => {
    db.app.deleteList(action.id);
    return state.filter(list => list.id !== action.id);
  },
  'RENAME_LIST': (state, action) => {
    db.storeLists.update(action.id, {
      title: action.title
    });

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