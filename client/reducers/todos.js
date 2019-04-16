const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];

    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);

    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );

    case 'TOGGLE_ALL_TODOS': 
      const hasIncomplete = !!state.filter(todo => !todo.completed).length;
      
      if (hasIncomplete) {
        return state.map(todo => ({...todo, completed: true}));
      } else {
        return state.map(todo => ({...todo, completed: false}));
      }

    case 'CLEAR_COMPLETED': 
      return state.filter(todo => !todo.completed);

    default: 
      return state;
  }
};

export default todos;