import View from './View.js';

class shoppingListView extends View {
   _parentElement = document.getElementById('ingridents-list');
  
  //  adjustShopItem(e,shopItem) {
  //   shopItem.quantity = +e.target.value;
  //   console.log("adjusted")
  //   } 
   _genereateMarkup() {
    {
     return this._data.map((shoppingItem) => {
         return `<div class="ingrident-item" data-item-id = ${shoppingItem.id}>
         <div class="ing-qt-box">
           <div>
             <input type="number" name="ing-qt" id="ing-qt" value="${shoppingItem.quantity}">
             <a class="btn--round btn--remove">X</a>
           </div>
           <span>${shoppingItem.unit}</span>
         </div>
         <p>${shoppingItem.description}</p>
       </div>`
     }).join("");
   }

   }

   removeShopItemHandler(handler) {
     this._parentElement.addEventListener('click', (e) => {
       const Remove = e.target.closest(".btn--remove");
       if(!Remove) return;
       e.target.parentNode.parentNode.parentNode.remove();
       handler(e.target.parentNode.parentNode.parentNode.dataset.itemId);
     })
   }
   
   adjustInputHandler(handler) {
      
   }

}
export default new shoppingListView();