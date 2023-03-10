import React from 'react';
import './style.css';
import { useState, useEffect} from 'react'

function Categories() {

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((response) => response.json())
            .then((data) => {
      setCatList(data.categories);
    });
  }, []);
  const [catList, setCatList] = useState([]);


  return (
    <div className="categories">
      {catList.map((ele) => {
        return (
          <div key={ele.idCategory} className="catPair">
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
