import React from 'react';
import { useState } from 'react';
import './style.css';
import Board from './Board';

export default function App() {
  const [currentGame, setCurrentGame] = useState([]);
  const [isPlayerX, setPlayerX] = useState(true);
  const [newGame, setNewGame] = useState(true);
  const [winner, setWinner] = useState('');

  // handle player click on the field
  const playerClick = (id) => {
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
    checkForWin();
  };

  // click on new game

  const handleClick = () => {
    setNewGame(!newGame);
    setWinner('');
    setCurrentGame([
      [[1, ''],[2, ''],[3, '']],  // CG [0] [1] [2]
      [[4, ''],[5, ''],[6, '']],  // CG [3] [4] [5]
      [[7, ''],[8, ''],[9, '']],  // CG [6] [7] [8]
    ]);
  };

  // check for winning condition

  const checkForWin = () => {
    let val;
    const statusArr = [];

    if(isPlayerX) { val = "X"} else { val = "O"};

    const findVal = currentGame.flat().forEach((ele, i) => {
      if(ele[1] === val) {
        statusArr.push(i);
      }

    })

    const winConditions = [
	                          [0, 3, 6],
	                          [1, 4, 7],
	                          [2, 5, 8],
	                          [0, 1, 2],
	                          [3, 4, 5],
	                          [6, 7, 8],
	                          [0, 4, 8],
	                          [2, 4, 6]
                          ];
    
    winConditions.forEach((ele) => {
      let winCount = 0;
        ele.forEach(ind => {
          if(statusArr.includes(ind)){
            winCount++;
          }
        })
        if(winCount === 3) {
          setWinner(val);
          setCurrentGame([]);
          setPlayerX(true);
          setNewGame(true);
        }
      })
  }
  
  const Reset = () => {
    
    return <>
      <button className="resetBtn" onClick={(e) => {setCurrentGame([]);
                                                    setPlayerX(true);
                                                    setNewGame(true);}
                                                    }>Reset</button>
    </>
  }

  return (
    <div className="main">
      <h1>Battle XO</h1>
      {winner === '' ? <></>
                     : <h1 className="winner">Winner is {winner}</h1>      
    }
      {newGame ? (
        <div className="newGame">
          <h2>
            Play a{' '}
            <span className="game" onClick={handleClick}>
              game
            </span>
            ?
          </h2>
        </div>
      ) : (
        <div style={{ height: '28.0333px' }}></div>
      )}

      <div className="boardContainer">
        {newGame? <></> : <Reset />}
        <Board
          isPlayerX={isPlayerX}
          currentGame={currentGame}
          playerClick={playerClick}
        />
      </div>
    </div>
  );
}
