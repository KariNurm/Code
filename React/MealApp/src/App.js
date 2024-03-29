import React from 'react';
import './style.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Categories from './Categories';
import Header from './Header';
import Main from './Main';
import Search from './Search';
import Random from './Random';
import List from './List';

export default function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />
      <h1 className="title">
        Lets<span>Cook</span>!
      </h1>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Main />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/random" element={<Random />}></Route>
        <Route path="/list" element={<List />}></Route>
      </Routes>
    </div>
  );
}
