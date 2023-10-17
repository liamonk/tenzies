import React from "react";

export default function Dice(props) {
  const styles = { backgroundColor: props.isHeld ? "#59E391" : "white" };
  return (
    <div style={styles} className="die-face" onClick={props.handleDiceClick}>
      <h2 className="die-num">{props.value.value}</h2>
    </div>
  );
}
