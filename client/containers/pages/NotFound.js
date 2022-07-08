import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
// App
import './NotFound.scss'; 

const NotFound = () => (<>
  <Link to={window.appConfig.root} className="TodoPage__btn-back"><Button variant="outlined" size="small"><i className="icon-back fas fa-angle-left"></i> Back</Button></Link>
  <div className='NotFound gradient-text'>
    404 Not Found
  </div>
</>);

export default NotFound;