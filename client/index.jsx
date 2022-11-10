import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import 'normalize.css/normalize.css';

import './index.scss';
import './config';
import './sw';
import store from './app/store/store';
import App from './app/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);