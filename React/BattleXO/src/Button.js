import React from 'react';
import { useState } from 'react';
import './style.css';

export default function Button({ id, playerClick, value}) {
  
  const btnBoxStyle = "btnBox "+ String.fromCharCode(96 + id)

  return ( 
    <div className={btnBoxStyle} onClick={(e) => playerClick(id)}>
      <button className="button" onClick={(e) => playerClick(id)}>
        <span>{value}</span>
      </button>
    </div>
  );
}
