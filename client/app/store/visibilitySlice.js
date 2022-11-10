import { createSlice } from '@reduxjs/toolkit';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

const visibilitySlice = createSlice({
  name: 'visibilityFilter',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setVisibility: (state, {payload}) => payload
  }
});

export default visibilitySlice.reducer;
export const { setVisibility } = visibilitySlice.actions;
export const selectVisibilityFilter = state => state.visibilityFilter;