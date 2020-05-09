import React from "react";

export const input = (item, index, scenceLv, register) => 
    <a>
        {(scenceLv[index] === "scence") && <a>　　</a>}
        <input
            name={`scences[${index}]`}
            placeHolder={scenceLv[index]}
            defaultValue={item}
            ref={register}
            style={{width: "80px"}}
        />
        {(scenceLv[index] === "act") && <br />}
        {(scenceLv[index] === "scence"  && <a>：</a>)}
        {(scenceLv[index] === "scence" && scenceLv[index+1] !== "beat")  && <br />}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "beat") && <a>、</a>}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "scence") && <br />}
        {(scenceLv[index] === "beat" && scenceLv[index+1] === "act") && <div><br /><br /></div>}
    </a>

export const plaintext = (item, index, scenceLv) => 
<a>
    {(scenceLv[index] === "scence") && <a>　　</a>}
    <a
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