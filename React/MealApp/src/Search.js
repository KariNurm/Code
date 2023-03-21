import './style.css'
import React from 'react';
import { useState, useEffect } from 'react';
import MealElement from './MealElement';

function Search() {
  const[search, setSearch] = useState();
  const[result, setResult] = useState([]);
  const[click, setClick] = useState(false);
  
  useEffect(() => {
    if (click) {
      searchData();
    }
  },[click])

  const searchData = async () => {
    let url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    const data = await fetch(url);
    const json = await data.json();
    setResult(json)
    setClick(false)
  }
  
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = () => {
    setClick(true)
  } 

  

  return <div className="searchDiv">
          <input type="text" value={search} onChange={handleChange} placeHolder="Search for a meal"></input>
          <button onClick={handleClick}>Search</button>
          {result && result.meals ? <div>{result.meals.map(ele => {
            return <MealElement element={ele}/> })}</div> : null}
         </div>

}
export default Search;