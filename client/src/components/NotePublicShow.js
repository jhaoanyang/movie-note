import React from 'react';
import { useSelector } from 'react-redux';


import Note from './notes/Note'


function NotePublicShow() {

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

export default NotePublicShow;
