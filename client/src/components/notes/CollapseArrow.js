import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';


function CollapseArrow(props) {

  const [ open, setOpen ] = useState(props.collapse)

  const dispatch = useDispatch();
  const handleClick = e => {
    e.preventDefault()
    setOpen(!open);
    const data = {
      collapse: !open
    };
    dispatch(actions.editForm(data, props.id));
  }

  const arrow = (open) => {
    if (open) {
      return "▼"
    } else {
      return "►"
    }
  };

  return(
        <a
        onClick={e => handleClick(e)}>{arrow(open)}</a>
  );
}

export default CollapseArrow;
