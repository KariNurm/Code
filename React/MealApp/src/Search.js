import './style.css'
import React from 'react';
import { useState } from 'react';
import { searchDB } from './Fetch'

function Search() {
  const[search, setSearch] = useState();
  const[result, setResult] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    console.log(search)
  }

  const handleClick = () => {
    console.log("hndlClck", search)
    searchDB(search).then(data => setTimeout(() => {
      setResult(data)
      console.log(result)
    }, 2000) )
  } 

  return <div className="searchDiv">
          <input type="text" value={search} onChange={handleChange} placeHolder="Search for a meal"></input>
          <button onClick={handleClick}>Search</button>
         </div>

}
export default Search;