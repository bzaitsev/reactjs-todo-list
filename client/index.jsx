import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './config';
import App from './components/App';
import appStore from './stores/appStore';
import 'normalize.css/normalize.css';
import './index.scss';
import './sw'; 
 
render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('app')
);