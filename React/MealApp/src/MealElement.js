import React from 'react'
import {useState} from 'react'
import './style.css'


function MealElement({element}) {

console.log("mealEle",element.meals[0])
const name = element.meals[0].strMeal;
const instructions = element.meals[0].strInstructions
const mealImg = element.meals[0].strMealThumb
const incrArr = []
const incrFilter = Object.entries(element.meals[0]).forEach(([key, value]) => {
  if(key.includes("strIngredient") === true && value !== "") {
    incrArr.push([value, element.meals[0][key.replace("strIngredient", "strMeasure")]])
  }
})
const displayIncr = incrArr.map((ele, i) => {

  return <div key={i} className="incredient">
            {ele[0]}: {ele[1]}
          </div>
})  

console.log(incrArr)

return <div className="mealElement">
         <h2>{name}</h2>
         <h3>Incredients:</h3>
         {displayIncr}
         <img src={mealImg} alt="image of the prepared meal" />
         <h3>Instructions:</h3>
         <div className="instructions">
          {instructions}
         </div>
       </div>

}

export default MealElement;