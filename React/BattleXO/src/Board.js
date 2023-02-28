import React from 'react';
import Button from './Button.js';
import './style.css';

export default function Board({ isPlayerX, currentGame, playerClick }) {
  console.log(currentGame);
  let rows = currentGame.map(ele => {
    return  <div className="row">
              {ele.map(cell => {
                return <Button key={cell[0]}
                               id={cell[0]}
                               isPlayerX={isPlayerX}
                               playerClick={playerClick}
                               value={cell[1]}
                       />
              })}
            </div>
  })
  
  return  <>{rows}</>;
}
