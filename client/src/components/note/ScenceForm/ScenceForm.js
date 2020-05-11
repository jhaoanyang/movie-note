import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as actions from "../../../actions";

import { makeStyles, Modal, Grid, Card } from "@material-ui/core/";

import Nested from "./Nested";
import EditButton from "./EditButton";
import ScenceNote from "./ScenceNote";
import Plaintext from "./Plaintext";

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
    overflowY: "auto",
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

  const thisNote = useSelector((state) =>
    state.form.data.find((item) => item._id === props.id)
  );

  const { scences, scenceLv, scenceRef, scenceNote } = thisNote;

  const dispatch = useDispatch();
  const onSubmit = data => {
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
        md={editing ? 6 : 9}
        className={classes.root}
        spacing={1}
      >
        {!editing && (
          <Grid item xs={12} md={editing ? 12 : 4} className={classes.fullHeight}>
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

        <Grid item xs={12} md={editing ? 12 : 8} className={classes.fullHeight}>
          <Card className={classes.card}>
            {editing && <EditButton id={props.id} />}
            {editing && <br />}
            <form onSubmit={handleSubmit(onSubmit)}>
              {scences.map((item, index) =>
                editing === true
                  ? <Nested item={item} index={index} id={props.id} register={register} />
                  : <Plaintext item={item} index={index} id={props.id} scenceLv={scenceLv} />
              )}
              <br />
                <div>
                  <br />
                  <button type="submit">
                    {editing === true ? "儲存表格" : "修改表格"}
                  </button>
                </div>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default ScenceForm;
