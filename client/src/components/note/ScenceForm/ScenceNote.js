import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../actions";

import { Box } from "@material-ui/core/";

import AmazingInput from "../AmazingInput";

function ScenceNote(props) {
  const [refOn, setRefOn] = useState(false);

  const thisNote = useSelector((state) =>
    state.form.data.find((item) => item._id === props.id)
  );
  const { scences, scenceRef, scenceNote } = thisNote;

  const dispatch = useDispatch();

  const addRef = (e) => {
    if (
      e.target.name !== undefined &&
      e.target.name.substring(0, 7) === "scences"
    ) {
      const foundIndex = parseInt(e.target.name.match(/\d+/)[0]);
      const newScenceRef = scenceRef.map((item, index) => {
        if (index !== props.index) {
          return item;
        } else {
          return [
            ...scenceRef[props.index],
            foundIndex
          ]
        }
      });
      const data = {
        scenceRef: newScenceRef
      };
      dispatch(actions.editForm(data, props.id));
      document.removeEventListener("click", addRef);
      setRefOn(false);
    };
  };

  const handleClick = () => {
    setRefOn(true);
    document.addEventListener("click", addRef);
  };

  const buttonClick = () => {
    const newScenceRef = scenceRef.map((item, index) => {
      if (index !== props.index) {
        return item;
      } else {
        return item.filter((it, i) => i < item.length - 1)
      }
    });
    const data = {
      scenceRef: newScenceRef
    };
    dispatch(actions.editForm(data, props.id));
  }

  return (
    <div>
      <Box border={refOn ? 1 : 0} onClick={(_) => handleClick()} display="inline">
        {(props.item.length !== 0) ? (
        scenceRef[props.index].map((item, index) => (
          <a name={`scenceRef[${props.index}][${index}]`}>
            {scences[item]}
            {index !== props.item.length - 1 && "──"}
          </a>
        ))) : (
          <a><i>點此新增 Reference</i></a>
        )}
      </Box>
      <button onClick={_ => buttonClick()} display="inline">
        ←
      </button>
      <AmazingInput
        id={props.id}
        name={`scenceNote[${props.index}]`}
        text={scenceNote[props.index]}
        chinese="筆記"
        head={false}
      />

      <br />
    </div>
  );
}

export default ScenceNote;
