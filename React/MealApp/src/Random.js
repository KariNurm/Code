import React from 'react';
import {useState, useEffect} from 'react';

function Random() {
const [rndMeal, setRndMeal] = useState(null)
const [clicked, setClicked] = useState(false);

const fetchData = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const json = await response.json();
  setRndMeal(json);
  setClicked(false)
};

const handleClick = () => {
  setClicked(true);
};

useEffect(() => {
  if (clicked) {
    fetchData();
  }
}, [clicked]);

return <div className="random">
        <h2>Hungry!</h2>
        <button onClick={handleClick}>Go!</button>
        {rndMeal && <div>{rndMeal.meals[0].strMeal}</div>}
       </div>


}

export default Random;