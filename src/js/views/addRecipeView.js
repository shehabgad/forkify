import View from './View.js'
import icons from 'url:../../img/icons.svg'
class AddRecipeView extends View
{
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)'
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');  
  _wrongFormat = 0;
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerValidateInput();
  }
  toggleWindow()
  {
    
      this._overlay.classList.toggle('hidden');
      this._window.classList.toggle('hidden');
    
  }
  _addHandlerShowWindow()
  {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
  }
  _addHandlerHideWindow()
  {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this))

    this._overlay.addEventListener('click', this.toggleWindow.bind(this))
  }
  _addHandlerValidateInput() {
    const IngridentsInput = this._parentElement.querySelectorAll(".upload__column:nth-child(2) input");
    IngridentsInput.forEach((IngInput) => {
      IngInput.dataset.wrongFormat = 0;
      IngInput.addEventListener('change', (e) => {
        const Ingrident = e.target.value.split(",");
        if(Ingrident.length !== 3 && !(+e.target.dataset.wrongFormat)) {
          e.target.dataset.wrongFormat = 1;
          this._wrongFormat++;
       
          let invalidDiv = document.createElement("div");
          invalidDiv.className = "wrong-format";
          invalidDiv.innerHTML = "<span style = 'color: red;'>Wrong Format!!!</span>"
          IngInput.insertAdjacentElement("afterend", invalidDiv);
        }
        else if(Ingrident.length === 3) {
          if((+e.target.dataset.wrongFormat))
          {
            e.target.nextSibling.remove();
            this._wrongFormat--;    
          }
          e.target.dataset.wrongFormat = 0;
          
        }
       
      })
    })
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', (e)=> {
       e.preventDefault();
       console.log(this._wrongFormat);
       if(this._wrongFormat !== 0) {
         return
       }
       const dataArr = [...new FormData(this._parentElement)];
       const data = Object.fromEntries(dataArr)
       handler(data);

    })
  }
  _genereateMarkup()
  {
  }

}
export default new AddRecipeView();