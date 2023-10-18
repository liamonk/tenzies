import React from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import { useWindowSize } from "@uidotdev/usehooks";

import Confetti from "react-confetti";

export default function App() {
  const [numberOfDice, setNumberOfDice] = React.useState(10);
  const [dice, setDiceNumbers] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);

  React.useEffect(() => {
    let allHeld = dice.every((die) => die.isHeld);
    let diceRefValue = dice[0].value;
    let allSameValue = dice.every((die) => die.value === diceRefValue);
    if (allHeld && allSameValue === true) {
      setTenzies(true);
    }
  }, [dice]);

  function handleDiceNumChange(event) {
    setNumberOfDice(() => Number(event.target.value));
  }

  function handleDiceClick(id) {
    setDiceNumbers((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function generateNewDie() {
    return {
      value: Math.round(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < numberOfDice; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function newGame() {
    setDiceNumbers(allNewDice());
    setRolls(0);
    setTenzies(false);
  }

  function rollDice() {
    if (!tenzies) {
      setRolls((oldRolls) => oldRolls + 1);
      setDiceNumbers((oldNumbers) =>
        oldNumbers.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  }

  const diceElements = dice.map((die) => {
    return (
      <Dice
        key={die.id}
        value={die}
        isHeld={die.isHeld}
        handleDiceClick={() => handleDiceClick(die.id)}
      />
    );
  });

  const { width, height } = useWindowSize();

  return (
    <main>
      {tenzies ? <Confetti width={width} height={height}></Confetti> : <></>}
      <h1>N-zies!</h1>
      <p className="instuctions">Select the number of dice to play with!</p>
      <input
        type="number"
        className="dice-quantity"
        value={numberOfDice}
        onChange={handleDiceNumChange}
      ></input>
      <button className="reset-button" onClick={newGame}>
        New Game
      </button>
      <div>
        {tenzies ? (
          <p>Congratulations - You Won in {rolls} turns!</p>
        ) : (
          <p className="instructions">
            Roll the dice until they are all the same. Click on a dice to hold
            it.
          </p>
        )}
      </div>
      <div className="dice-container">{diceElements}</div>
      <p>Score: {rolls}</p>
      <button className="roll-button" onClick={rollDice}>
        Roll!
      </button>
    </main>
  );
}
