import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss'; 
import TodoPage from './../containers/pages/TodoPage';
import HomePage from './../containers/pages/HomePage';
import NotFound from './../containers/pages/NotFound';

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