const urlCat = 'www.themealdb.com/api/json/v1/1/categories.php';
const urlSearch = 'www.themealdb.com/api/json/v1/1/search.php?s=';
function getCategories() {
  return fetch('https://www.themealdb.com/api/json/v1/1/categories.php').then(
    (response) => response.json()
  );
}

function searchDB(string) {
  let url = "www.themealdb.com/api/json/v1/1/search.php?s=" + string;
  return fetch(url)
    .then((response) => response.json())
}

function random() {
  return fetch("www.themealdb.com/api/json/v1/1/random.php").then(response => response.json())
  }

export { getCategories, searchDB, random };
