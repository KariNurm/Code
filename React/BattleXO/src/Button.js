import React from 'react';
import { useState } from 'react';
import './style.css';

export default function Button({isPlayerX, id, playerClick, value}) {
  // props player ja clear
  const [state, setState] = useState('');
  

  return (
    <button className="button" onClick={(e) => playerClick(id)}>
      {value}
    </button>
  );
}
