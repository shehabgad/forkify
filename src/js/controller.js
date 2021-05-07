import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView'
import addRecipeView from './views/addRecipeView.js'
import shoppingListView from './views/shoppingListView.js'
import {MODAL_CLOSE_SEC} from './config.js'
// import icons from '../img/icons.svg' // Parcel 1 
import icons from 'url:../img/icons.svg'
import 'core-js/stable';
import 'regenerator-runtime/runtime';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if(module.hot) {
  module.hot.accept();
}
const controlRecipes = async function()
{
  try
  {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner()
    resultsView.update(model.getSearchResultsPage());
    // 1) Loading recipe 
     await model.loadRecipe(id);
    //  2) Rendring recipe 
    recipeView.render(model.state.recipe)
    bookmarksView.update(model.state.bookmarks)
  } 
  catch(err)
  {
    console.log(err)
    recipeView.renderError();
  } 
}
const controlShoppingList = function () {
    model.AddToShoppingList(model.state.recipe.ingredients);
    shoppingListView.render(model.state.shoppingList);

}
const controlRemovingShopItem = function(itemID) {
    model.RemoveFromShoppingList(itemID);
    shoppingListView.render(model.state.shoppingList);
    console.log(model.state.shoppingList);
}
// const controlAdjustingShopItem = function(itemID, newValue) {
//      model.AdjustShoppingList(itemID,newValue);
// }
const controlSearchResults = async function()
{
  try
  {
    const query = searchView.getQuery();
    if(!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query)
    resultsView.render(model.getSearchResultsPage());
    console.log(model.state.search.results)
    // 4) Render initial Pagination buttons
    paginationView.render(model.state.search)
  } catch(err)
  {
    console.log(err);
  }
}
const controlPagination = function(num)
{
   resultsView.render(model.getSearchResultsPage(num));
   paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
  // Update the recipe s ervings (in state)
   model.updateServings(newServings);
  // Update the recipe view 
  recipeView.update(model.state.recipe);
  
}

const controlAddBookmark = function() {

  // 1) Add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)
  // 2) update recipe view
  recipeView.update(model.state.recipe);

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks)
}
const controlBookmarks = function()
{
  bookmarksView.render(model.state.bookmarks)
}
const controlAddRecipe = async function (newRecipe) {
  try{
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)
    recipeView.render(model.state.recipe)
    setTimeout(function() {
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC * 1000)
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    
    window.history.pushState(null,'',`#${model.state.recipe.id}`);
    
    
  } catch(err)
  {
    addRecipeView.renderError(err.message)
  }
}
const init = function()
{
  bookmarksView.addHandlerRender(controlBookmarks)
   recipeView.addHandlerRender(controlRecipes);
   recipeView.addHandlerUpdateServings(controlServings);
   recipeView.addHandlerAddBookmark(controlAddBookmark);
   recipeView.addHandlerShoppingList(controlShoppingList);
   shoppingListView.removeShopItemHandler(controlRemovingShopItem)
   searchView.addHandlerSearch(controlSearchResults);
   paginationView.addHandlerClick(controlPagination);
   addRecipeView.addHandlerUpload(controlAddRecipe)
}
init();