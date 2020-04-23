
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from '../reducers';

const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;