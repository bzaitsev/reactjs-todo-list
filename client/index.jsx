import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import appStore from './stores/appStore';

render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('app')
);