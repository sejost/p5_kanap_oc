const apiUrlAllProducts = `http://localhost:3000/api/products/`

let allPrices = [];
let totalPrice = 0;
let allArticles = [];
let totalArticle = 0;
let products = [];
let orderId = "";

const colorsTranslator = (color) => {
  if (color.includes('/') == true) {
    const colorsSplitted = color.split('/');
    const color1 = colorsDictionnary[colorsSplitted[0].toLowerCase()];
    const color2 = colorsDictionnary[colorsSplitted[1].toLowerCase()];
    return color1 + ' / ' + color2;
  }
  else {
    return colorsDictionnary[color.toLowerCase()];
  }
};

const colorsDictionnary = {
  'blue': 'Bleu',
  'white': 'Blanc',
  'black': 'Noir',
  'green': 'Vert',
  'red': 'Rouge',
  'pink': 'Rose',
  'grey': 'Gris',
  'purple': 'Violet',
  'navy': 'Marine',
  'silver': 'Argent',
  'brown': 'Marron',
  'yellow': 'Jaune',
  'orange': 'Orange'
};

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
      document.querySelectorAll(`#articleNb${i} .cart__item__content__description p`)[0].textContent = colorsTranslator(itemColor);
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

      products.push(itemId);

      const removeItem = () => {
        let promptAnswer = (confirm(`Êtes vous sûr de vouloir supprimer cet article de votre panier ?`));
        if (promptAnswer) {
          localStorage.removeItem(keyName);
          location.reload();
          products.splice(i, 1)
          console.log(products)
        }
        else {
          articleQty.setAttribute('value', `${itemQuantity}`);
        }
      }

      let priceCalcul = [];
      priceCalcul.push(data.price * itemQuantity);

      let articleCalcul = []
      articleCalcul.push(itemQuantity);


      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).addEventListener('change', () => {

        if (articleQty.value == 0) {
          removeItem();
        }
        else if (articleQty.value < 0 || articleQty.value > 100) {
          alert(`Merci d'indiquer un nombre d'article compris entre 1 et 100`);
          articleQty.value = itemQuantity;
        }
        else if (articleQty.value == '') {
          alert(`Quantité incorrect`);
          articleQty.value = itemQuantity;
        }
        else {
          itemQuantity = articleQty.value;
          localStorage.removeItem(keyName);
          cart = [itemId, itemColor, parseFloat(itemQuantity)];
          localStorage.setItem(keyName, cart);

          priceCalcul.push(data.price * itemQuantity); //insert the new price into the array
          totalPrice += -priceCalcul[0] + priceCalcul[1];
          document.querySelector('.cart__price #totalPrice').textContent = totalPrice;

          priceCalcul = [];
          priceCalcul.push(data.price * itemQuantity); // reinit the priceCalcul value

          articleCalcul.push(itemQuantity); //insert the new article value into the array
          totalArticle += parseFloat(articleCalcul[0]) - 2 * (parseFloat(articleCalcul[0])) + parseFloat(articleCalcul[1]);
          document.querySelector('.cart__price #totalQuantity').textContent = totalArticle;

          articleCalcul = [];
          articleCalcul.push(itemQuantity); // reinit the articleCalcul value
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

/* // -- Const dedicated to Regex Verification Method -- //
const regexFirstName = /[a-zA-ZàáâćèéêëîïòóôùúûüçÀÁÂÄÈÉÊËÎÏÔÖÛÜÇŒÆ '-]+$/;
const regexLastName = /[a-zA-ZàáâćèéêëîïòóôùúûüçÀÁÂÄÈÉÊËÎÏÔÖÛÜÇŒÆ '-]+$/;
const regexCity = /[a-zA-ZàáâćèéêëîïòóôùúûüçÀÁÂÄÈÉÊËÎÏÔÖÛÜÇŒÆ '-]+$/;
const regexAddress = /^[A-Za-z0-9'\.\-\s\,]/;
*/

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const firstName = document.querySelector('input#firstName');
const lastName = document.querySelector('input#lastName');
const address = document.querySelector('input#address');
const city = document.querySelector('input#city');
const email = document.querySelector('input#email');

function checkSessionStorage(identifier, keyName) {
  if (sessionStorage.getItem(keyName) === null || sessionStorage.getItem(keyName).length == 0 || sessionStorage.getItem(keyName) === "") {
    identifier.value = "";
  }
  else {
    identifier.value = sessionStorage.getItem(keyName);
  }
}

checkSessionStorage(firstName, 'firstName');
checkSessionStorage(lastName, 'lastName');
checkSessionStorage(address, 'address');
checkSessionStorage(city, 'city');
checkSessionStorage(email, 'email');

/* //-- Regex Function verification --
function regexTest(rxIdentifier, identifier, idSelector, keyName) {
  if (rxIdentifier.test(identifier.value) != true) {
    document.querySelector(idSelector).textContent = `${identifier.value} n'est pas valide !`;
    return false;
  }
  else {
    document.querySelector(idSelector).textContent = "";
    sessionStorage.removeItem(keyName);
    sessionStorage.setItem(keyName, identifier.value)
    return true;
  }
}*/

function validTest(identifier, idSelector, keyName) {
  if (identifier.value !== "") {
    sessionStorage.removeItem(keyName);
    sessionStorage.setItem(keyName, identifier.value)
    return true;
  }
  else {
    document.querySelector(idSelector).textContent = `${identifier.value} n'est pas valide !`;
    return false;
  }
}

function validEmail() {
  if (regexEmail.test(email.value) != true) {
    document.querySelector(`#emailErrorMsg`).textContent = `${email.value} n'est pas valide !`;
    return false
  }
  else {
    sessionStorage.removeItem('email');
    sessionStorage.setItem('email', email.value)
    return true;
  }
}

let contact = {};

function sendToServer() {
  const sendToServer = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({ contact, products }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    // Récupération et stockage de la réponse de l'API (orderId)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      orderId = data.orderId;
      console.log(data.orderId);
      // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
      if (orderId != "") {
        location.href = "confirmation.html?id=" + orderId;
      }
      else {
        console.log(`OrderId [${orderId}] pas bon`)
      }
    });


}

document.querySelector('#order').addEventListener('click', (evt) => {
  evt.preventDefault();

  /* //-- Part of Code include Regex verification instead of classic method verification -- 
  if (regexTest(regexFirstName, firstName, '#firstNameErrorMsg', 'firstName') &&
    regexTest(regexLastName, lastName, '#lastNameErrorMsg', 'lastName') &&
    regexTest(regexCity, city, '#cityErrorMsg', 'city') &&
    regexTest(regexEmail, email, '#emailErrorMsg', 'email') &&
    regexTest(regexAddress, address, '#addressErrorMsg', 'address')) {
    console.log('ok')
  }*/

  if (validTest(firstName, '#firstNameErrorMsg', 'firstName')
    && validTest(lastName, '#lastNameErrorMsg', 'lastName')
    && validTest(city, '#cityErrorMsg', 'city')
    && validTest(address, '#addressErrorMsg', 'address')
    && validEmail()) {

    contact.firstName = firstName.value;
    contact.lastName = lastName.value;
    contact.city = city.value;
    contact.address = address.value;
    contact.email = email.value;
    console.log(contact)
    console.log(contact.firstName)
    sendToServer()
    console.log('ok')
  }
  else {
    console.log('nok')
  }

})


