import React from 'react';
import { useState } from 'react';
import './style.css';
import Board from './Board';

export default function App() {
  const [currentGame, setCurrentGame] = useState([]);
  const [isPlayerX, setPlayerX] = useState(true);
  const [newGame, setNewGame] = useState(true);
  const [winner, setWinner] = useState('X');

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
    if(isPlayerX) { val = "X"} else { val = "O"};
    console.log(val, "sisään")
    console.log(currentGame.flat(),"flat")
    const statusMap = currentGame.flat().map((ele) => {
      if(ele[1] === val) {
        return val
      } else {
        return ''
      }
    })
    console.log(statusMap)
    const winConditions = [
      [val,'','',val,'','',val,'',''], 
      ['',val,'','',val,'','',val,''],  
      ['','',val,'','',val,'','',val],  
      [val,val,val,'','','','','',''], 
      ['','','',val,val,val,'','',''],
      ['','','','','','',val,val,val],
      [val,'','','',val,'','','',val],
      ['','',val,'',val,'',val,'','']
    ]
    
    winConditions.forEach(ele => {
      if(ele.toString() === statusMap.toString()){
        setWinner(val);
        setNewGame(true);
      } 
    })

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
        <Board
          isPlayerX={isPlayerX}
          currentGame={currentGame}
          playerClick={playerClick}
        />
      </div>
    </div>
  );
}
