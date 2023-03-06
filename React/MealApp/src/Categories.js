import React from 'react';
import './style.css';

function Categories({ catList }) {
  return catList.map((ele) => {
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
  });
}

export default Categories;
