import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function List() {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ meals: [] });

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${location.state}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  //idMeal: "52914"
  //strMeal: "Boulangère Potatoes"
  //strMealThumb: "https://www.themealdb.com/images/media/meals/qywups1511796761.jpg"

  const listCat = category.meals.map((ele) => {
    return (
      <div key={ele.idMeal} className="categoryMealsListElement">
        <h2>{ele.strMeal}</h2>
        <img
          className="catMealListImg"
          src={ele.strMealThumb}
          alt="picture of the meal"
        />
      </div>
    );
  });

  function handleClick() {
    navigate('/categories');
  }
  function handleClickTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className="list">
      <h3>
        <span onClick={handleClick}>Back! &#8594;</span>
      </h3>
      <div className="categoryElementWrapper">{listCat}</div>
      <h3>
        <span onClick={handleClickTop}>Up! &#8593;</span>
      </h3>
    </div>
  );
}

export default List;
