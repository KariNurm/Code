import React from 'react';
import {useState, useEffect} from 'react';
import MealElement from './MealElement'

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
        <h2 className="hungry">Hungry!</h2>
        <div className="hBtnDiv">
          <button className="hBtn" onClick={handleClick}>Suprise me!</button>
        </div>
        {console.log("ennen mealele",rndMeal)}
        {rndMeal && <MealElement element={rndMeal} />}
       </div>


}

export default Random;