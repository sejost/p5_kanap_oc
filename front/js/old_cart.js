const apiUrlAllProducts = `http://localhost:3000/api/products/`

let allPrices = [];
let totalPrice;

for (let i = 0; i < localStorage.length; ++i) {
  let idValues = localStorage.getItem(localStorage.key(i));
  const cartItemSplitted = idValues.split(',');

  document.querySelector('#cart__items').appendChild(document.createElement('article'));
  document.querySelectorAll('article')[i].setAttribute('id', `articleNb${i}`)

  fetch(apiUrlAllProducts + cartItemSplitted[0])
    .then((res) =>
      res.json()
        .then((data) => {
          document.querySelector(`#articleNb${i}`).setAttribute('class', 'cart__item');
          document.querySelector(`#articleNb${i}`).setAttribute('data-id', cartItemSplitted[0]);
          document.querySelector(`#articleNb${i}`).setAttribute('data-color', cartItemSplitted[1]);

          document.querySelector(`#articleNb${i}`).appendChild(document.createElement('div'));
          document.querySelector(`#articleNb${i} div`).setAttribute('class', 'cart__item__img');
          document.querySelector(`#articleNb${i} .cart__item__img`).appendChild(document.createElement('img'));
          document.querySelector(`#articleNb${i} img`).setAttribute('src', data.imageUrl);
          document.querySelector(`#articleNb${i} img`).setAttribute('alt', `Photographie d'un canapé`);

          document.querySelector(`#articleNb${i}`).appendChild(document.createElement('div'));
          document.querySelectorAll(`#articleNb${i} div`)[1].setAttribute('class', 'cart__item__content');

          document.querySelector(`#articleNb${i} .cart__item__content`).appendChild(document.createElement('div'));
          document.querySelector(`#articleNb${i} .cart__item__content`).appendChild(document.createElement('div'));
          document.querySelectorAll(`#articleNb${i} .cart__item__content div`)[0].setAttribute('class', 'cart__item__content__description');
          document.querySelectorAll(`#articleNb${i} .cart__item__content div`)[1].setAttribute('class', 'cart__item__content__settings');

          document.querySelector(`#articleNb${i} .cart__item__content__description`).appendChild(document.createElement('h2'));
          document.querySelector(`#articleNb${i} .cart__item__content__description`).appendChild(document.createElement('p'));
          document.querySelector(`#articleNb${i} .cart__item__content__description`).appendChild(document.createElement('p'));
          document.querySelector(`#articleNb${i} .cart__item__content__description h2`).textContent = data.name;
          document.querySelectorAll(`#articleNb${i} .cart__item__content__description p`)[0].textContent = cartItemSplitted[1];
          document.querySelectorAll(`#articleNb${i} .cart__item__content__description p`)[1].textContent = `${data.price} € / Unité`;

          document.querySelector(`#articleNb${i} .cart__item__content__settings`).appendChild(document.createElement('div'));
          document.querySelector(`#articleNb${i} .cart__item__content__settings`).appendChild(document.createElement('div'));
          document.querySelectorAll(`#articleNb${i} .cart__item__content__settings div`)[0].setAttribute('class', `cart__item__content__settings__quantity`);
          document.querySelectorAll(`#articleNb${i} .cart__item__content__settings div`)[1].setAttribute('class', `cart__item__content__settings__delete`);

          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity`).appendChild(document.createElement('p'));
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity`).appendChild(document.createElement('input'));
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity p`).textContent = `Qté :`;
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).setAttribute('type', "number");
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).setAttribute('class', "itemQuantity");
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).setAttribute('name', "itemQuantity");
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).setAttribute('min', "1");
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).setAttribute('max', "100");
          document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).setAttribute('value', `${cartItemSplitted[2]}`);

          document.querySelector(`#articleNb${i} .cart__item__content__settings__delete`).appendChild(document.createElement('p'));
          document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).setAttribute('class', 'deleteItem');
          document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).textContent = 'Supprimer';

          function priceAdding() {
            allPrices.push(data.price * cartItemSplitted[2]);
            return allPrices.length;
            /*let price;
            let prices = price[i]
            price[i] = cartItemSplitted[2];
            totalPrice += data.price * parseFloat(cartItemSplitted[2]);
            //console.log(data.price)
            //console.log(totalPrice);
            console.log(Number.isInteger(cartItemSplitted[2]))
          
            // Faire une fonction asynchrone qui attend le résultat du allPrice push et qui le montre ensuite
            // Ensuite il faut faire la fonction qui permet d'aditionner toutes les valeurs*/
          }

          asyncFunction();

        })
    )
    .catch((error) => {
      console.error(error)
    });
}




//<div class="cart__price">
//<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">
/* <!-- 84,00 -->*/

//<form method="get" class="cart__order__form">
//<p id="firstNameErrorMsg">
/*    <!-- ci est un message d'erreur --> */