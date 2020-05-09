import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';

import { Button, Menu, MenuItem } from '@material-ui/core/';

import genreArray from './genre-array';


function Genre(props) {

  const [ text, setText ] = useState(props.genre)
  const fixText = text => {
    if (typeof text === "string") {
      return text
    } else {
      return "電影類型"
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  const handleClose = (e) => {

    setAnchorEl(null);

    if (e.target.innerText !== "") {
      const data = {
        genre: e.target.innerText
      };
      dispatch(actions.editForm(data, props.id));
      setText(e.target.innerText)
    };
  };


  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {fixText(text)}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {genreArray.map(item => {
          if (typeof item === "string") {
            return <MenuItem name={item} onClick={e => handleClose(e)}>{item}</MenuItem>
          } else {
            return <MenuItem name={item.main} onClick={e => handleClose(e)}>{item.main}</MenuItem>
          }
        })}
      </Menu>
    </div>
  );
}

export default Genre;
