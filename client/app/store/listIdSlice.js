import { createSlice } from '@reduxjs/toolkit';

const listIdSlice = createSlice({
  name: 'listId',
  initialState: null,
  reducers: {
    setListId: (state, {payload}) => payload
  }
});

export default listIdSlice.reducer;
export const { setListId } = listIdSlice.actions;
export const selectListId = state => state.listId;