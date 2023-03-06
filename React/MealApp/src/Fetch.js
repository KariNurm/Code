
const urlCat = 'www.themealdb.com/api/json/v1/1/categories.php';

function getCategories() {
 
  return fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(response => response.json())
}

export { getCategories };
