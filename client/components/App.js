import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss'; 
import TodoPage from './TodoPage';
import HomePage from './HomePage';
import NotFound from './NotFound';

const App = () => (
  <Router>
     <Switch>
       <Route path="/todolist/:listId" component={TodoPage}/>
       <Route path="/" component={HomePage}/>
       <Route component={NotFound} />
     </Switch>
  </Router>
);
 
export default App;