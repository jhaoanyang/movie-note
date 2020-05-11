import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../actions";

function Nested(props) {
    const { item, index, register } = props;
    const [ text, setText ] = useState(item);

    const thisNote = useSelector((state) =>
    state.form.data.find((item) => item._id === props.id)
  );
    const { scences, scenceLv } = thisNote;

    const dispatch = useDispatch();

    const handleBlur = e => {
        if (e.target.value === "") {
            const foundIndex = parseInt(e.target.name.match(/\d+/)[0]);
            const data = {
              scences: scences.filter((item, index) => index !== foundIndex),
              scenceLv: scenceLv.filter((lt, i) => i !== foundIndex),
            };
            dispatch(actions.editForm(data, props.id));
        }
    };
    
    const handleEnter = async e => {
        if (e.key === "Enter") {
            e.preventDefault();
            const thisIndex = parseInt(e.target.name.match(/\d+/)[0]);
            let foundIndex = scenceLv.findIndex((item, index) => ((index >= thisIndex) && (item !== "act")));
      
            if (foundIndex === -1) {
              foundIndex = scences.length
            };
            const data = {
              scences: [
                ...scences.slice(0, foundIndex+1),
                "",
                ...scences.slice(foundIndex+1)
              ],
              scenceLv: [
                ...scenceLv.slice(0, foundIndex+1),
                "beat",
                ...scenceLv.slice(foundIndex+1)
              ]
            };
            await dispatch(actions.editForm(data, props.id))
            document.getElementById(`${props.id}_scences[${foundIndex+1}]`).focus();   
        }
    };

    return (
        <a>
        {(scenceLv[index] === "scence") && <a>　　</a>}
        <input
            id={`${props.id}_scences[${index}]`}
            name={`scences[${index}]`}
            placeHolder={scenceLv[index]}
            value={text}
            ref={register}
            style={{width: "80px"}}
            onChange={e => setText(e.target.value)}
            onBlur={e => handleBlur(e)}
            onKeyPress={e => handleEnter(e)}
        />
        {(scenceLv[index] === "act") && <br />}
        {(scenceLv[index] === "scence"  && <a>：</a>)}
        {(scenceLv[index] === "scence" && scenceLv[index+1] !== "beat")  && <br />}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "beat") && <a>、</a>}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "scence") && <br />}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "act") && <div><br /><br /></div>}
    </a>
    );
}

export default Nested;