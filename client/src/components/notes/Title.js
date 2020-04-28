import React from 'react';
import AmazingInput from './AmazingInput';

function Title(props) {
  
  return(
      <AmazingInput
        id={props.id}
        name="title"
        text={props.title}
        chinese="片名"
        head={true}
      />
  );
}

export default Title;
