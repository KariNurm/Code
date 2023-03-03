import React from 'react';
import Button from './Button.js';
import './style.css';

export default function Board({ currentGame, playerClick }) {
  
  
  
  let rows = currentGame.map(ele => {
    return  <>
              {ele.map(cell => {
                return <Button key={cell[0]}
                               id={cell[0]}
                               playerClick={playerClick}
                               value={cell[1]}
                       />
              })}
            </>
  })
  
  return  <>{rows}</>;
}
