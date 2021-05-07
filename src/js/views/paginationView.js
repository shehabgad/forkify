import View from './View.js'
import icons from 'url:../../img/icons.svg'
class PaginationView extends View
{
  _parentElement = document.querySelector('.pagination')
 
  addHandlerClick(handler)
  {
    this._parentElement.addEventListener('click', function(e)
    {
      const btn = e.target.closest('.btn--inline')
      if(!btn)
       return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  _genereateMarkup()
  {
     if(!this._data.results.length) {
       return '';
      }

     const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
      //  Page 1, and there are other pages
       if(this._data.page === 1 && numPages > 1)
       {
         return `
         <button data-goto = "${this._data.page + 1}" class="btn--inline pagination__btn--next">
         <span>Page ${this._data.page + 1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button>
       <h4 class = "preview__title">${this._data.page} / ${numPages}</h4>      
         `
       }
      //  Page 1, and there are no other pages
      else if(this._data.page === numPages && numPages === 1)
      {
        return ` <h4 class = "preview__title">${this._data.page} / ${numPages}</h4>`
      }

      // Last page
      else if(this._data.page === numPages && numPages !== 1)
      {
        return `
        <h4 class = "preview__title">${this._data.page} / ${numPages}</h4>      
        <button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
        `
      }

      // Other page
      else
      {
        return `
        <button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          <h4 class = "preview__title">${this._data.page} / ${numPages}</h4>      
          <button data-goto = "${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
      }

  }
  

}
export default new PaginationView();