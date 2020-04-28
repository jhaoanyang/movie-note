import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions';

import Note from './notes/Note'


function NoteDashBoard() {

  const editedArray = useSelector(state => state.form.edited);
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(actions.updateDB(editedArray));
  }, 60000);
  window.onbeforeunload = e => {
    dispatch(actions.updateDB(editedArray));
  };

  const formData = useSelector(state => state.form.data);

  return (
      formData.map((item, index) => {
        return (
          <Note
            key={index}
            noteItem={item}
          />
        );
      })
  );
}

export default NoteDashBoard;
