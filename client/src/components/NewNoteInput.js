import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actions from '../actions';

function NewNoteInput() {
  const [ text, setText ] = useState("");

  const authData = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const onSubmit = data => {
    const editedData = {
      ...data,
      authRead: authData._id,
      authWrite: authData._id
    }
    setText("");
    dispatch(actions.addForm(editedData));
  };
  
  const { register, handleSubmit } = useForm();

  return(
      <form
        onSubmit={handleSubmit(onSubmit)}
        onBlur={() => setText("")}  
      >
        <input
          name="title"
          ref={register}
          value={text}
          placeholder="新增電影"
          onChange={e => setText(e.target.value)}
        />
      </form>
  );
}

export default NewNoteInput;