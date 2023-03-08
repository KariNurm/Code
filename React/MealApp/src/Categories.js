import React from 'react';
import './style.css';

function Categories({ catList }) {
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
