import React from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";

export default function App() {
  const [numberOfDice, setNumberOfDice] = React.useState(10);
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice);

  function handleDiceNumChange(event) {
    setNumberOfDice(() => Number(event.target.value));
  }

  function handleDiceClick() {
    console.log("click");
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < numberOfDice; i++) {
      newDice.push({
        value: Math.round(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function resetDice() {
    setDiceNumbers(allNewDice());
  }

  const dice = diceNumbers.map((x) => {
    return (
      <Dice
        key={x.id}
        value={x}
        isHeld={x.isHeld}
        handleDiceClick={handleDiceClick}
      />
    );
  });

  return (
    <main>
      <h2>How many dice would you like?</h2>
      <input
        type="number"
        className="dice-quantity"
        value={numberOfDice}
        onChange={handleDiceNumChange}
      ></input>
      <div className="dice-container">{dice}</div>
      <button className="reset-button" onClick={resetDice}>
        Roll!
      </button>
    </main>
  );
}
