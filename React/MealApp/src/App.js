import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Categories from './Categories';
import Header from './Header';
import Main from './Main';
import Search from './Search';
import Random from './Random'

export default function App() {
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((response) => response.json())
            .then((data) => {
      setCatList(data.categories);
    });
  }, []);
  const [catList, setCatList] = useState([]);
  const location = useLocation();


  return (
    <div className="app">
      <Header />
      <h1 className="title">LetsCook!</h1>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Main />}></Route>
        <Route path="/categories" element={<Categories catList={catList}/>}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/random" element={<Random />}></Route>
      </Routes>
    </div>
  );
}
