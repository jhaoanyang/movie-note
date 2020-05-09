import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';


function Delete(props) {

  const dispatch = useDispatch();
  const handleClick = e => {
    e.preventDefault()
    const data = {
      _id: props.id
    }
    dispatch(actions.deleteForm(data, props.id));
  }

  return(
        <a onClick={e => handleClick(e)}>x</a>
  );
}

export default Delete;
