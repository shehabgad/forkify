import View from './View.js'

class sortResultsView extends View
{
  _parentElement = document.getElementById("sort-view");

  _genereateMarkup() {
    return `<h4 class="preview__title">Sort By</h4>
    <button class="ingridents-sort btn--inline">INGRIDENTS</button>
    <button class="duration-sort btn--inline">DURATION</button> `;
  }
  addHandlerSorting(Handler)
  {
    const Options = this._parentElement.querySelectorAll("button");
    Options.forEach((option) => {
      option.addEventListener('click', Handler)
    })
  }
  
}
export default new sortResultsView();