import './style.css'
import React from 'react';
import { useState, useEffect } from 'react';

function Search() {
  const[search, setSearch] = useState();
  const[result, setResult] = useState(null);
  const[click, setClick] = useState(false);
  
  useEffect(() => {
    console.log("useEff")
    if (click) {
      searchData();
    }
  },[click])

  const searchData = async () => {
    let url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    const data = await fetch(url);
    const json = await data.json();
    setResult(json)
    console.log(result)
    setClick(false)
  }
  
  const handleChange = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const handleClick = () => {
    console.log("hndlClck", search)
    setClick(true)
    
  } 

  return <div className="searchDiv">
          <input type="text" value={search} onChange={handleChange} placeHolder="Search for a meal"></input>
          <button onClick={handleClick}>Search</button>
          {result && result.meals ? <div>{result.meals[0].strMeal}</div> : null}
         </div>

}
export default Search;