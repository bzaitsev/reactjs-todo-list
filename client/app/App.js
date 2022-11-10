import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";

import './App.scss'; 
import Lists from './lists/Lists';
import Items from './items/Items';
import NotFound from './NotFound';

const App = () => (
  <Router>
     <Switch>
       <Route path={`${window.appConfig.root}todolist/:listId`} component={Items}/>
       <Route path={window.appConfig.root} component={Lists}/>
       <Route component={NotFound} />
     </Switch>
  </Router>
);
 
export default App;