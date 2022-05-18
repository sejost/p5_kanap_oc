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

      const itemId = cartItemSplitted[0];
      const itemColor = cartItemSplitted[1];
      let itemQuantity = cartItemSplitted[2];
      let cart = [itemId, itemColor, itemQuantity];

      let response = await fetch(apiUrlAllProducts + itemId);
      let data = await response.json();

      const keyName = data.name + ' ' + itemColor;


      document.querySelector('#cart__items').appendChild(document.createElement('article'));
      document.querySelectorAll('article')[i].setAttribute('id', `articleNb${i}`)

      document.querySelector(`#articleNb${i}`).setAttribute('class', 'cart__item');
      document.querySelector(`#articleNb${i}`).setAttribute('data-id', itemId);
      document.querySelector(`#articleNb${i}`).setAttribute('data-color', itemColor);

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
      document.querySelectorAll(`#articleNb${i} .cart__item__content__description p`)[0].textContent = itemColor;
      document.querySelectorAll(`#articleNb${i} .cart__item__content__description p`)[1].textContent = `${data.price} € / Unité`;

      document.querySelector(`#articleNb${i} .cart__item__content__settings`).appendChild(document.createElement('div'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings`).appendChild(document.createElement('div'));
      document.querySelectorAll(`#articleNb${i} .cart__item__content__settings div`)[0].setAttribute('class', `cart__item__content__settings__quantity`);
      document.querySelectorAll(`#articleNb${i} .cart__item__content__settings div`)[1].setAttribute('class', `cart__item__content__settings__delete`);

      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity`).appendChild(document.createElement('p'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity`).appendChild(document.createElement('input'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity p`).textContent = `Qté :`;
      let articleQty = document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`);
      articleQty.setAttribute('type', "number");
      articleQty.setAttribute('class', "itemQuantity");
      articleQty.setAttribute('name', "itemQuantity");
      articleQty.setAttribute('min', "1");
      articleQty.setAttribute('max', "100");
      articleQty.setAttribute('value', `${itemQuantity}`);

      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete`).appendChild(document.createElement('p'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).setAttribute('class', 'deleteItem');
      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).textContent = 'Supprimer';

      const removeItem = () => {
        let promptAnswer = (confirm(`Êtes vous sûr de vouloir supprimer cet article de votre panier ?`));
        if (promptAnswer) {
          localStorage.removeItem(keyName);
          location.reload();
        }
      }

      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).addEventListener('change', () => {
        if (articleQty.value == 0) {
          removeItem();
          location.reload();
        }
        else if (articleQty.value < 0 || articleQty.value > 100) {
          alert(`Merci d'indiquer un nombre d'article compris entre 1 et 100`);
          location.reload();
        }
        else if (articleQty.value == '') {
          alert(`Quantité incorrect`);
          location.reload();
        }
        else {
          console.log('Changement !')
          itemQuantity = articleQty.value;
          console.log(itemQuantity);
          localStorage.removeItem(keyName);
          cart = [itemId, itemColor, parseFloat(itemQuantity)];
          localStorage.setItem(keyName, cart);
          location.reload();
        }
      });

      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).addEventListener('click', removeItem);

      allPrices.push(data.price * itemQuantity);
      allArticles.push(itemQuantity);
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


