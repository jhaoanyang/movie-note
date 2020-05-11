import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../actions";

function EditButton(props) {
  const thisNote = useSelector((state) =>
    state.form.data.find((item) => item._id === props.id)
  );

  const { scences, scenceLv } = thisNote;

  const dispatch = useDispatch();

  const deleteClick = (e) => {
    if (
      e.target.name !== undefined &&
      e.target.name.substring(0, 7) === "scences"
    ) {
      const foundIndex = parseInt(e.target.name.match(/\d+/)[0]);
      const data = {
        scences: scences.filter((item, index) => index !== foundIndex),
        scenceLv: scenceLv.filter((lt, i) => i !== foundIndex),
      };
      document.removeEventListener("click", deleteClick);
      dispatch(actions.editForm(data, props.id));
    } else {
      document.removeEventListener("click", deleteClick);
    }
  };

  const addAct = async () => {
    const data = {
      scences: [...scences, ""],
      scenceLv: [...scenceLv, "act"],
    };

    await dispatch(actions.editForm(data, props.id));
    document.getElementById(`${props.id}_scences[${scences.length}]`).focus();
  };

  const addScence = async (e) => {
    if (
      e.target.name !== undefined &&
      e.target.name.substring(0, 7) === "scences"
    ) {
      const thisIndex = parseInt(e.target.name.match(/\d+/)[0]);
      let foundIndex = scenceLv.findIndex(
        (item, index) => index > thisIndex && item !== "beat"
      );
      if (foundIndex === -1) {
        foundIndex = scences.length;
      }

      const data = {
        scences: [
          ...scences.slice(0, foundIndex),
          "",
          ...scences.slice(foundIndex),
        ],
        scenceLv: [
          ...scenceLv.slice(0, foundIndex),
          "scence",
          ...scenceLv.slice(foundIndex),
        ],
      };

      document.removeEventListener("click", addScence);
      await dispatch(actions.editForm(data, props.id));
      document.getElementById(`${props.id}_scences[${foundIndex}]`).focus();
    } else {
      document.removeEventListener("click", addScence);
    }
  };

  const addBeat = async e => {
    if (
      e.target.name !== undefined &&
      e.target.name.substring(0, 7) === "scences"
    ) {
      const thisIndex = parseInt(e.target.name.match(/\d+/)[0]);
      let foundIndex = scenceLv.findIndex(
        (item, index) => index >= thisIndex && item !== "act"
      );

      if (foundIndex === -1) {
        foundIndex = scences.length;
      }
      const data = {
        scences: [
          ...scences.slice(0, foundIndex + 1),
          "",
          ...scences.slice(foundIndex + 1),
        ],
        scenceLv: [
          ...scenceLv.slice(0, foundIndex + 1),
          "beat",
          ...scenceLv.slice(foundIndex + 1),
        ],
      };

      document.removeEventListener("click", addBeat);
      await dispatch(actions.editForm(data, props.id));
      document.getElementById(`${props.id}_scences[${foundIndex+1}]`).focus();
    } else {
      document.removeEventListener("click", addBeat);
    }
  };

  const handleClick = (editType) => {
    switch (editType) {
      case "delete":
        document.addEventListener("click", deleteClick);
        break;

      case "addAct":
        addAct();
        break;

      case "addScence":
        document.addEventListener("click", addScence);
        break;

      case "addBeat":
        document.addEventListener("click", addBeat);
        break;

      default:
        
        break;
    }
  };

  return (
    <div>
      <br />
      <button onClick={() => handleClick("addAct")}>新增 Act</button>
      <button onClick={() => handleClick("addScence")}>
        插入 Scence （點擊欄位）
      </button>
      <button onClick={() => handleClick("addBeat")}>
        插入 Beat （點擊欄位）
      </button>
      <button onClick={() => handleClick("delete")}>刪除（點擊欄位）</button>
    </div>
  );
}

export default EditButton;
