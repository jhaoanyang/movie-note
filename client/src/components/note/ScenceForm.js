import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as actions from "../../actions";

import { makeStyles, Modal, Grid, Card } from "@material-ui/core/";

import * as nested from "./nested";
import EditButton from "./EditButton";
import ScenceNote from "./ScenceNote";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    margin: "auto",
  },
  fullHeight: {
    flexGrow: 1,
    display: "flex",
    height: "98%",
  },
  card: {
    padding: theme.spacing(2),
    width: "100%",
  },
  rightBottom: {
    margin: theme.spacing.unit,
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
}));

function ScenceForm(props) {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);
  const [noteOn, setNoteOn] = useState(false);

  const thisNote = useSelector((state) =>
    state.form.data.find((item) => item._id === props.id)
  );

  const { scences, scenceLv, scenceRef, scenceNote } = thisNote;

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    setEditing(!editing);
    dispatch(actions.editForm(data, props.id));
  };

  const addClick = () => {
    const data = {
      scenceRef: [
        ...scenceRef,
        []
      ],
      scenceNote: [
        ...scenceNote,
        ""
      ]
    };
    dispatch(actions.editForm(data, props.id));
  }

  const removeClick = () => {
    const newScenceRef = scenceRef.filter((item, index) => index < scenceRef.length - 1);
    const newScenceNote = scenceNote.filter((item, index) => index < scenceRef.length - 1);
    const data = {
      scenceRef: newScenceRef,
      scenceNote: newScenceNote,
    };
    dispatch(actions.editForm(data, props.id));
  }

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      open={props.openState}
      onClose={props.close}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        xs={9}
        md={noteOn ? 9 : 6}
        className={classes.root}
        spacing={1}
      >
        {noteOn && (
          <Grid item xs={12} md={noteOn ? 4 : 12} className={classes.fullHeight}>
            <Card className={classes.card}>
              {scenceRef.map((item, index) =>
                <ScenceNote
                  id={props.id}
                  item={item}
                  index={index}
                />
              )}
            <br />
            <button onClick={() => addClick()}>
                新增條目
            </button>
            <button onClick={() => removeClick()}>
                刪除條目
            </button>
            </Card>
          </Grid>)}

        <Grid item xs={12} md={noteOn ? 8 : 12} className={classes.fullHeight}>
          <Card className={classes.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {scences.map((item, index) =>
                editing === true
                  ? nested.input(item, index, scenceLv, register)
                  : nested.plaintext(item, index, scenceLv)
              )}
              <br />
              {!noteOn && (
                <div>
                  <br />
                  <button type="submit">
                    {editing === true ? "儲存表格" : "修改表格"}
                  </button>
                </div>
              )}
            </form>
            {editing ? (
              <EditButton id={props.id} />
            ) : (
              <div>
                <br />
                <button onClick={() => setNoteOn(!noteOn)}>
                  {noteOn ? "◄ 關閉筆記" : "▼ 對照筆記"}
                </button>
              </div>
            )}
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default ScenceForm;
