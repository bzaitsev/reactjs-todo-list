import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import appStore from './stores/appStore';

render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('app')
);

/* Todo
1) hide footer when list is empty
2) checked state
3) total count
4) remove action
*/