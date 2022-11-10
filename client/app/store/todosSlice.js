import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';
import Dexie from 'dexie';
import { uniqueNamesGenerator, adjectives } from 'unique-names-generator'; // adjectives, colors, animals, countries, names, languages, starWars, custom[]

import db from './db';

const nameGeneratorConfig = { 
  dictionaries: [adjectives],
  style: 'capital'
};

let dbExists = await Dexie.exists(window.appConfig.dbName);

if (!dbExists) {
  await db.storeLists.add({
    id: shortid.generate(),
    title: uniqueNamesGenerator(nameGeneratorConfig),
    editDate: Date.now()
  });
}

let initialState = [];
let lists = await db.storeLists.toCollection().sortBy('editDate');
let items = await db.storeItems.toCollection().sortBy('text');

initialState = initialState.concat(lists);
initialState.forEach(list => {
  list.items = items.filter(item => item.listId == list.id);
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addList: {
      prepare: () => ({
        payload: {
          id: shortid.generate(),
          title: uniqueNamesGenerator(nameGeneratorConfig),
          editDate: Date.now(),
          items: []
        }
      }),
      reducer: (state, {payload}) => {
        state.push(payload);
        let {id, title, editDate} = payload;
        db.storeLists.add({id, title, editDate});
      }
    },
    removeList: (state, {payload}) => {
      let index = state.indexOf(state.find(list => list.id === payload.id));
      state.splice(index, 1);
      db.app.deleteList(payload.id);
    },
    renameList: (state, {payload}) => {
      state.find(list => list.id === payload.id)
        .title = payload.title;

      db.storeLists.update(payload.id, {
        title: payload.title
      });
    },
    addItem: {
      prepare: (payload) => ({
        payload: {
          id: shortid.generate(),
          ...payload
        }
      }),
      reducer: (state, {payload}) => {
        let list = state.filter(list => list.id === payload.listId)[0];
  
        let newItem = {
          id: payload.id,
          text: payload.text,
          completed: false,
          listId: payload.listId
        };
    
        list.items.push(newItem);
        db.storeItems.add(newItem);
      }
    },
    removeItem: (state, {payload}) => {
      let list = state.filter(list => list.id === payload.listId)[0];
      let index = list.items.indexOf(list.items.find(item => item.id === payload.id));
      list.items.splice(index, 1);
      db.storeItems.where({listId: payload.listId, id: payload.id}).delete();
    },
    toggleItem: (state, {payload}) => {
      let list = state.filter(list => list.id === payload.listId)[0];
      
      list.items = list.items.map(item => {
        if (item.id === payload.id) {
          db.storeItems.where({listId: payload.listId, id: payload.id}).modify({completed: !item.completed});
          return {...item, completed: !item.completed};
        } else {
          return item;
        }
      });
    },
    toggleAllItems: (state, {payload}) => {
      let list = state.filter(list => list.id === payload.listId)[0];
      const hasIncomplete = !!list.items.filter(item => !item.completed).length;
        
      if (hasIncomplete) {
        list.items = list.items.map(item => ({...item, completed: true}));
        db.storeItems.where({listId: payload.listId}).modify({completed: true});
      } else {
        list.items = list.items.map(item => ({...item, completed: false}));
        db.storeItems.where({listId: payload.listId}).modify({completed: false});
      }
    },
    clearCompleted: (state, {payload}) => {
      let list = state.filter(list => list.id === payload.listId)[0];
      list.items = list.items.filter(item => !item.completed);
  
      db.storeItems.where({listId: payload.listId}).modify(function() {
        if (this.value.completed) delete this.value;
      });
    }
  }
});

export default todosSlice.reducer;
export const { 
  addList, removeList, renameList, 
  addItem, removeItem, toggleItem, toggleAllItems, clearCompleted
} = todosSlice.actions;

export const selectLists = (state) => state.todos;
export const selectItemsByListId = (state, listId) => state.todos.filter(list => list.id === listId)[0].items;
export const selectList = (state, listId) => state.todos.find(list => list.id === listId);
