let recipes = document.getElementById("Recipe");
var timerId;
async function searchRecipes() {
  let querie = document.getElementById("querry").value;

  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${querie}`
  );

  let data = await res.json();
  //   console.log(data);
  return data.meals;
}
// searchRecipes();
function throttle() {
  if (timerId) {
    return false;
  }
  timerId = setTimeout(() => {
    main();
    timerId = undefined;
  }, 500);
  searchRecipes();
}
function appendSearchResults(d) {
  recipes.innerHTML = null;
  d.forEach(({ strMeal }) => {
    let p = document.createElement("p");
    p.innerText = strMeal;
    recipes.append(p);
  });
}
async function main() {
  let recipeName = await searchRecipes();
  appendSearchResults(recipeName);
}
