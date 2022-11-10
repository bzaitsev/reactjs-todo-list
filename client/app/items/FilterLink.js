import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

import { setVisibility, selectVisibilityFilter } from '../store/visibilitySlice';

const FilterLink = ({ filter, children }) => {
  const dispatch = useDispatch();
  let visibilityFilter = useSelector(selectVisibilityFilter);
  let active = filter === visibilityFilter;

  return (
    <Button 
      variant="outlined"
      onClick={() => dispatch(setVisibility(filter))}
      disabled={active}
    >{children}</Button>)
};

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FilterLink;