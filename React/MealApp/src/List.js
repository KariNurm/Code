import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MealElement from './MealElement'
import Modal from 'react-modal'
Modal.setAppElement('#root')


function List() {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ meals: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [currentEle, setCurrentEle] = useState(0);

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${location.state}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);
   
  const listCat = category.meals.map((ele) => {
    return (
      <div onClick={() => handleOpenModal(ele.idMeal)} key={ele.idMeal} className="categoryMealsListElement">
        <h2>{ele.strMeal}</h2>
        <img
          className="catMealListImg"
          src={ele.strMealThumb}
          alt="picture of the meal"
          />
      </div>
    );
  });
  
    async function handleOpenModal(id) {
      const getElement = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                  .then((response) => response.json())
                  .then((element) => setCurrentEle(element.meals[0]))
      setIsOpen(true)
    }
  
    function handleCloseModal() {
      setIsOpen(false)
    }

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
      <Modal className="modal" isOpen={isOpen} onRequestClose={handleCloseModal}>
        <div className="modal-container">
          <h3><span onClick={handleCloseModal}>Close</span></h3>
          <MealElement element={currentEle}/>
        </div>
      </Modal>
      <div className="categoryElementWrapper">{listCat}</div>
      <h3>
        <span onClick={handleClickTop}>Up! &#8593;</span>
      </h3>
    </div>
  );
}

export default List;
