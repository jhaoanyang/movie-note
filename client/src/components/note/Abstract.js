import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import * as actions from '../../actions';

import ScenceForm from './ScenceForm';

function Abstract(props) {
  const [ openState, setOpenState ] = useState(false);

  const thisNote = useSelector((state) =>
  state.form.data.find((item) => item._id === props.id)
);
//   const dispatch = useDispatch( );
//   const onSubmit = (data) => {
//     dispatch(actions.editForm(data, props.id));
//   };
  
//   const { register, handleSubmit } = useForm();

  const abstractNote = thisNote.scenceRef.filter((item, index) => index < 3);
  console.log(abstractNote)
  
  return(
    <div>
      <div onClick={() => setOpenState(true)}>
        {abstractNote.map((item, index) =>
          <div>
            {item.map((it, i) => 
                <a name={`scenceRef[${index}][${i}]`}>
                  {thisNote.scences[it]}
                  {i !== item.length - 1 && "───"}
                </a>
            )}
          </div>
        )}
        <div>
          <br/>
          <i>點擊展開</i>
        </div>
      </div>
      <ScenceForm
        id={props.id}
        openState={openState}
        close={() => setOpenState(false)}
      />
    </div>
  );
}

export default Abstract;
