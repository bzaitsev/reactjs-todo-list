const listId = (state = null, action) => {
  switch (action.type) {
    case 'SET_LIST_ID':
      return action.id;
    default: 
      return state;    
  }
};

export default listId;