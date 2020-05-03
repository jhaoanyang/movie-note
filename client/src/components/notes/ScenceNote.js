import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as actions from "../../actions";

import { makeStyles, Modal, Box, Grid, Paper, Card } from "@material-ui/core/";

import * as nested from "./nested";
import AmazingInput from "./AmazingInput";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    flexGrow: 1,
    display: "flex",
    height: "98%",
  },
  card: {
    padding: theme.spacing(2),
    width: "100%",
  },
}));

function ScenceNote(props) {
  const classes = useStyles();

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
      <Box border={refOn ? 1 : 0} onClick={(_) => handleClick()}>
        {(props.item.length !== 0) ? (
        scenceRef[props.index].map((item, index) => (
          <a name={`scenceRef[${props.index}][${index}]`}>
            {scences[item]}
            {index !== props.item.length - 1 && "───"}
          </a>
        ))) : (
          <a><i>點此新增 Reference</i></a>
        )}
      </Box>
      <AmazingInput
        id={props.id}
        name={`scenceNote[${props.index}]`}
        text={scenceNote[props.index]}
        chinese="筆記"
        head={false}
      />
      <button onClick={_ => buttonClick()}>
          ←
      </button>
      <br />
    </div>
  );
}

export default ScenceNote;
