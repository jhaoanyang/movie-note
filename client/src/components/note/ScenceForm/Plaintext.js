import React from 'react';

function Plaintext(props) {
  const { item, index, scenceLv } = props;

  return(
    <a>
        {(scenceLv[index] === "scence") && <a>　　</a>}
        <a
          id={`${props.id}_scences[${index}]`}
          name={`scences[${index}]`}
        >
          {item}
        </a>
        {(scenceLv[index] === "act") && <br />}
        {(scenceLv[index] === "scence"  && <a>：</a>)}
        {(scenceLv[index] === "scence" && scenceLv[index+1] !== "beat")  && <br />}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "beat") && <a>、</a>}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "scence") && <br />}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "act") && <div><br /><br /></div>}
    </a>
  );
}

export default Plaintext;
