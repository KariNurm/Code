import React from 'react'
import {useState} from 'react'
import './style.css'


function MealElement({element}) {
const name = element.strMeal;
const instructions = element.strInstructions
const instSplit = instructions.split(".");
const mapInst = instSplit.map(ele => {

  if(ele.length === 0 || ele === Number) {
    return <></>
  } else {
    return <p>-{ele.trim()}.</p>

  }
})
const mealImg = element.strMealThumb
const incrArr = []
const incrFilter = Object.entries(element).forEach(([key, value]) => {
  if(key.includes("strIngredient") === true && value !== "") {
    incrArr.push([value, element[key.replace("strIngredient", "strMeasure")]])
  }
})
const displayIncr = incrArr.map((ele, i) => {

  return <div key={i} className="incredient">
            {ele[0]}: {ele[1]}
          </div>
})  


return <div className="mealElement">
         <h2>{name}</h2>
         <div className="incredients">
          <h3>Incredients:</h3>
          {displayIncr}
         </div>
         <img className="img" src={mealImg} alt="image of the prepared meal" />
         <div className="instructions">
          <h3>Instructions:</h3>
          <div>{mapInst}</div>
         </div>
       </div>

}

export default MealElement;