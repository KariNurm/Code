import React from 'react';
import { useState } from 'react';
import './style.css';
import Board from './Board';

export default function App() {
  const [currentGame, setCurrentGame] = useState([
    [
      [1, ''],
      [2, ''],
      [3, ''],
    ],
    [
      [4, ''],
      [5, ''],
      [6, ''],
    ],
    [
      [7, ''],
      [8, ''],
      [9, ''],
    ],
  ]);
  const [isPlayerX, setPlayerX] = useState(false);

  const playerClick = (id) => {
    console.log(id)
    const player = isPlayerX ? 'X' : 'O';
    let row;
    let index;
    switch (id) {
      case 1:
      case 2:
      case 3:
        index = currentGame[0].findIndex((cell) => cell[0] === id);
        row = 0;
        break;
      case 4:
      case 5:
      case 6:
        index = currentGame[1].findIndex((cell) => cell[0] === id);
        row = 1;
        break;
      case 7:
      case 8:
      case 9:
        index = currentGame[2].findIndex((cell) => cell[0] === id);
        row = 2;
        break;
      default:
        console.log('error');
    }

    const newRow = currentGame[row].map((cell) => {
      if (cell[0] === id) {
        return [id, player];
      } else {
        return cell;
      }
    });

  
    currentGame[row] = newRow;
  

    setCurrentGame(currentGame);
    setPlayerX(!isPlayerX);

    // filter state, change state, change player
  };

  return (
    <div className="main">
      <h1>Battle XO</h1>
      <div className="boardContainer">
        <Board
          isPlayerX={isPlayerX}
          currentGame={currentGame}
          playerClick={playerClick}
        />
      </div>
    </div>
  );
}
