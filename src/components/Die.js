import React from 'react';

export default function Die(props){
    return (
        <div>
            <p className={props.isHeld ? "isHeld" : "die"} onClick={props.holdDice}>{props.value}</p>
        </div>
    )
}