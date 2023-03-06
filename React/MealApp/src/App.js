import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import { getCategories } from './Fetch';
import { Routes, Route, useLocation } from 'react-router-dom';
import Categories from './Categories'

export default function App() {
  useEffect(() => {
    getCategories().then((data) => {
      setCatList(data.categories);
    });
  }, []);
  const [catList, setCatList] = useState([]);
  const location = useLocation();


  return (
    <div className="app">
    
      <h1 className="title">LetsCook!</h1>
      
      <div className="categories">
        <Categories catList={catList}/>
      </div>
    </div>
  );
}
