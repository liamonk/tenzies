import React from "react";

export default function Dice(props) {
  return (
    <div
      style={props.isHeld ? { backgroundColor: "#59E391" } : {}}
      className="die-face"
      onClick={props.handleDiceClick}
    >
      <h2 className="die-num">{props.value.value}</h2>
    </div>
  );
}
