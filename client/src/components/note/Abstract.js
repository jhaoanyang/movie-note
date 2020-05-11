import React, { useState } from "react";
import { useSelector } from "react-redux";

import ScenceForm from "./ScenceForm/ScenceForm";

function Abstract(props) {
  const [openState, setOpenState] = useState(false);

  const thisNote = useSelector((state) =>
    state.form.data.find((item) => item._id === props.id)
  );

  const abstractNote = thisNote.scenceRef.filter((item, index) => index < 3);

  return (
    <div>
      <div onClick={() => setOpenState(true)}>
        {abstractNote.map((item, index) => (
          <div>
            {item.map((it, i) => (
              <a name={`scenceRef[${index}][${i}]`}>
                {thisNote.scences[it]}
                {i !== item.length - 1 && "───"}
              </a>
            ))}
          </div>
        ))}
        <div>
          <br />
          <i>點擊展開</i>
        </div>
      </div>
      <ScenceForm
        id={props.id}
        openState={openState}
        close={() => setOpenState(false)}
      />
    </div>
  );
}

export default Abstract;
