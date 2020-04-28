import React from 'react';
import AmazingInput from './AmazingInput';

function OtherNote(props) {
  
  return(
      <AmazingInput
        id={props.id}
        name="otherNote"
        text={props.otherNote}
        chinese="筆記"
        head={false}
      />
  );
}

export default OtherNote;
