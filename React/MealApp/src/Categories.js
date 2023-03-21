import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [catList, setCatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((data) => {
        setCatList(data.categories);
      });
  }, []);

  function handleClick(str) {
    console.log("tulossa",str)
    navigate('/list', {state: str} );
  }

  console.log(catList)

  return (
    <div className="categories">
      {catList.map((ele) => {
        return (
          <div onClick={() => handleClick(ele.strCategory)} key={ele.idCategory} className="catPair">
            <img
              className="catImg"
              src={ele.strCategoryThumb}
              alt={ele.idCategory}
            />
            <p className="imgCap">{ele.strCategory}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
