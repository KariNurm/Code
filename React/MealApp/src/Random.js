import React from 'react';
import {random} from './Fetch';
import {useState, useEffect} from 'react';

function Random() {
const [rndMeal, setRndMeal] = useState([])

const handleClick = () => {
  setRndMeal(random())
  console.log(rndMeal)
}


return <div className="random">
        <h2>Hungry!</h2>
        <button onClick={handleClick}>Go!</button>
       </div>


}

export default Random;