import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as actions from "../../actions";

function ScenceForm(props) {
  const [text, setText] = useState(props.acts);
  const handleChange = (e, i) => {
    const editedText = text.map((item, index) => {
      if (i !== index) {
        return item;
      } else {
        return e.target.value;
      }
    });
    setText(editedText);
  };

  const fixText = (text) => {
    if (text !== "") {
      return text;
    } else {
      return <i>{props.acts}</i>;
    }
  };

  
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    setEditing(false);
    console.log(data);
    dispatch(actions.editForm(data, props.id));
  };

  const inputAndP = (level, index) => {
    return editing ? (
      <input
        name={`${level}[${index}]`}
        defaultValue={text[index]}
        ref={register}
        onChange={(e) => handleChange(e, index)}
      />
    ) : (
      <p onClick={() => setEditing(true)}>{fixText(text[index])}</p>
    );
  };


  const addItem = (level, array) => {
      const pushedArray = array;
      pushedArray.push("");
      const editedData = {
          [level]: pushedArray
      };
      console.log(editedData);
      dispatch(actions.editForm(editedData, props.id));
  };



  const { register, handleSubmit } = useForm();




  return (
    <form
        onBlur={handleSubmit(onSubmit)} onSubmit={handleSubmit(onSubmit)}
    >
      {props.acts.map((item, index) => {
        return (
            <div>
                {inputAndP("acts", index)}
                <hr />
            </div>
        );
      })}
    <a
        onClick={() => addItem("acts", props.acts)}
        className="waves-effect waves-light btn-small"
    >
        +
    </a>
    </form>
  );
}

export default ScenceForm;
