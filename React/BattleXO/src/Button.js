import React from 'react';
import {useState} from 'react'
import './style.css';

export default function Button({ id, playerClick, value}) {
  const [lock, setLock] = useState(false)
  const btnBoxStyle = "btnBox "+ String.fromCharCode(96 + id)
  
  const handleClick = () => {setLock(true)}

  return ( 
    <>
    {lock ? 
      <div className={btnBoxStyle}><span className="letter" style={{color: "rgb(245, 228, 228)"}}>{value}</span>
      </div>
      :
      <div className={btnBoxStyle} onClick={(e) => {playerClick(id); handleClick();}}><span className="letter" style={{color: "rgb(245, 228, 228)"}}>{value}</span>
      </div>
    }
    </>);
}
