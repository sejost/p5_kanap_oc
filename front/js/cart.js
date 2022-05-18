const apiUrlAllProducts = `http://localhost:3000/api/products/`
let allPrices = [];
let totalPrice = 0;
let allArticles = [];
let totalArticle = 0;

const apiAsync = async () => {
  try {
    for (let i = 0; i < localStorage.length; ++i) {
      let idValues = localStorage.getItem(localStorage.key(i));
      const cartItemSplitted = idValues.split(',');

      let response = await fetch(apiUrlAllProducts + cartItemSplitted[0]);
      let data = await response.json();

      document.querySelector('#cart__items').appendChild(document.createElement('article'));
      document.querySelectorAll('article')[i].setAttribute('id', `articleNb${i}`)

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


      allPrices.push(data.price * cartItemSplitted[2]);
      allArticles.push(cartItemSplitted[2]);
    }

    for (i = 0; i < allPrices.length; i++) {
      totalPrice += allPrices[i];
      totalArticle += parseFloat(allArticles[i]);
    }

    document.querySelector('.cart__price #totalQuantity').textContent = totalArticle;
    document.querySelector('.cart__price #totalPrice').textContent = totalPrice;

  }
  catch (error) {
    console.error(error);
  }
}
apiAsync();