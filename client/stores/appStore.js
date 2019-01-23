import { createStore } from 'redux';
import rootReducer from '../reducers';

const appStore = createStore(rootReducer);

export default appStore;