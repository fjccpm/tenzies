import React from "react";

export default function Dice(props)
{
    const styles = {
        backgroundColor: props.on ? "#59E391" : "#FFFFFF"
    }

    return(
    <div style={styles}
         className="tenzies--dice"
         key={props.id}
         onClick={() => props.block(props.id)}>
        <p className="tenzies--diceText">{props.value}</p>
    </div>
    )
}