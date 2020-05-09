import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import * as actions from '../../actions';

function AmazingInput(props) {
  const [ text, setText ] = useState(props.text);
  const fixText = text => {
    if (text !== "") {
      return text
    } else {
      return <i>點擊修改{props.chinese}</i>
    }
  }

  const [ editing, setEditing ] = useState(false);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    setEditing(false);
    dispatch(actions.editForm(data, props.id));
  };

  const pOrHead = (head) => {
    if (head === true) {
      return (
        <h2
          onClick={() => setEditing(true)}
        >
          {fixText(text)}
        </h2>
      );
    } else {
      return (
        <p 
          onClick={() => setEditing(true)}
        >
          {fixText(text)}
        </p>
      );
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <form           
      onBlur={handleSubmit(onSubmit)}
      onSubmit={handleSubmit(onSubmit)}
    >
      {editing ?  
        <input
            name={props.name}
            value={text}
            ref={register}
            onChange={e => setText(e.target.value)}
            autoFocus
        />
      :
        pOrHead(props.head)
      }
    </form>
  );
}

export default AmazingInput;
