/* -------------------------------- 1st Part of the Code -------------------------------- */
/* -- This code Part focus on get and displaying the main informations and interact with it -- */

/* -- Variable Init Declarations -- */
const getAllProducts = `http://localhost:3000/api/products/`;
let allPrices = [];
let totalPrice = 0;
let allArticles = [];
let totalArticle = 0;
let products = [];

/* -- Condition checking if the localStorage (the cart) is empty. Then send a message and get the user back the index -- */
if (localStorage.length == 0) {
  alert(`Le panier est vide, n'hésitez pas à consulter notre page produit`);
  location.href = "index.html";
}

/* -- Variable Dictionnary of english colors to french -- */
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

/* -- Function that convert the color format and translate it into french -- */
const colorsTranslator = (color) => {
  if (!color.includes('/')) {
    return colorsDictionnary[color.toLowerCase()];
  }
  else {
    /* -- If the colors contain a '/' translate separatly each color then add each other into a new translated string-- */
    const colorsSplitted = color.split('/');
    let colors = [];
    let colorsAdded;
    for (i = 0; i < colorsSplitted.length; i++) {
      colors[i] = colorsDictionnary[colorsSplitted[i].toLowerCase()];
      colorsAdded = ` ${colors[i - 1]} / ${colors[i]}`;
    }
    return colorsAdded;
  }
};

/* -- Function initialise all DOM creation  -- */
const apiAsync = async () => {
  try {
    // Entering the Loop depending on the local storage length
    for (let i = 0; i < localStorage.length; ++i) {
      let idValues = localStorage.getItem(localStorage.key(i));
      const cartItems = idValues.split(',');

      //init some variables according to the product add on the product.html page
      const productId = cartItems[0];
      const productColor = cartItems[1];
      let productQty = cartItems[2];
      let cart = [productId, productColor, productQty];


      //init the fetch on specific product add on cart
      let response = await fetch(getAllProducts + productId);
      let data = await response.json();

      const keyName = data.name + ' ' + productColor;

      document.querySelector('#cart__items').appendChild(document.createElement('article'));
      document.querySelectorAll('article')[i].setAttribute('id', `articleNb${i}`);

      document.querySelector(`#articleNb${i}`).setAttribute('class', 'cart__item');
      document.querySelector(`#articleNb${i}`).setAttribute('data-id', productId);
      document.querySelector(`#articleNb${i}`).setAttribute('data-color', productColor);

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
      document.querySelectorAll(`#articleNb${i} .cart__item__content__description p`)[0].textContent = colorsTranslator(productColor);
      document.querySelectorAll(`#articleNb${i} .cart__item__content__description p`)[1].textContent = `${data.price} € / Unité`;

      document.querySelector(`#articleNb${i} .cart__item__content__settings`).appendChild(document.createElement('div'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings`).appendChild(document.createElement('div'));
      document.querySelectorAll(`#articleNb${i} .cart__item__content__settings div`)[0].setAttribute('class', `cart__item__content__settings__quantity`);
      document.querySelectorAll(`#articleNb${i} .cart__item__content__settings div`)[1].setAttribute('class', `cart__item__content__settings__delete`);

      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity`).appendChild(document.createElement('p'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity`).appendChild(document.createElement('input'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity p`).textContent = `Qté :`;
      let cartItemQty = document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`);
      cartItemQty.setAttribute('type', "number");
      cartItemQty.setAttribute('class', "productQty");
      cartItemQty.setAttribute('name', "productQty");
      cartItemQty.setAttribute('min', "1");
      cartItemQty.setAttribute('max', "100");
      cartItemQty.setAttribute('value', `${productQty}`);

      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete`).appendChild(document.createElement('p'));
      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).setAttribute('class', 'deleteItem');
      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).textContent = 'Supprimer';

      //Init a new array Products wich we add in the productIds
      products.push(productId);

      /* -- Function to remove item in local storage and in array products -- */
      const removeItem = () => {
        let promptAnswer = (confirm(`Êtes vous sûr de vouloir supprimer cet article de votre panier ?`));
        if (promptAnswer) {
          localStorage.removeItem(keyName);
          location.reload();
          products.splice(i, 1);
        }
        //if Prompt abort get the last value of productQty on display
        else {
          cartItemQty.value = productQty;
        }
      }

      // Reset the priceCalcul array to an empty array and add the price actual data multiply by the productQty
      let priceCalcul = [];
      priceCalcul.push(data.price * productQty);

      // Reset the articleCalcul array to an empty array and add the productQty
      let articleCalcul = [];
      articleCalcul.push(productQty);

      /* -- New Event listener on change on the input quantity -- 
      -- If 0 entered trigger the removeItem function -- 
      -- Invalid quantity under 0 or over 100 or no quantity --
      -- Else, set the new cartItemQty value to the local storage and dinamicly change 
        the the total price and the total articles quantity by calculate the difference -- */
      document.querySelector(`#articleNb${i} .cart__item__content__settings__quantity input`).addEventListener('change', () => {
        if (cartItemQty.value == 0) {
          removeItem();
        }
        else if (cartItemQty.value < 0 || cartItemQty.value > 100 || cartItemQty.value == '') {
          cartItemQty.value = productQty;
          alert(`Merci d'indiquer un nombre d'article compris entre 1 et 100`);
        }
        else {
          productQty = cartItemQty.value;
          localStorage.removeItem(keyName);
          cart = [productId, productColor, parseFloat(productQty)];
          localStorage.setItem(keyName, cart);

          priceCalcul.push(data.price * productQty); //insert the new price into the array
          totalPrice += -priceCalcul[0] + priceCalcul[1];
          document.querySelector('.cart__price #totalPrice').textContent = totalPrice;

          priceCalcul = [];
          priceCalcul.push(data.price * productQty); // reinit the priceCalcul value

          articleCalcul.push(productQty); //insert the new article value into the array
          totalArticle += parseFloat(articleCalcul[0]) - 2 * (parseFloat(articleCalcul[0])) + parseFloat(articleCalcul[1]);
          document.querySelector('.cart__price #totalQuantity').textContent = totalArticle;

          articleCalcul = [];
          articleCalcul.push(productQty); // reinit the articleCalcul value
        }
      });
      /* -- End of the Event listener on change on the input quantity -- /*

      /* -- New Event listener on click on the delete button triggering the removeItem Function -- */
      document.querySelector(`#articleNb${i} .cart__item__content__settings__delete p`).addEventListener('click', removeItem);

      // Add into the arrays -- allPrices the price of the actual data multiply by productQty 
      // and add to the allArticles the productQty
      allPrices.push(data.price * productQty);
      allArticles.push(productQty);
    }
    // End of the "Big" Loop that cycle all the product added

    // New loop cycle all the articles prices to calculate the total Article prices and total Quantity of Article
    for (i = 0; i < allPrices.length; i++) {
      totalPrice += allPrices[i];
      totalArticle += parseFloat(allArticles[i]);
    }

    // Actualize the display of total Article and total Price on loading
    document.querySelector('.cart__price #totalQuantity').textContent = totalArticle;
    document.querySelector('.cart__price #totalPrice').textContent = totalPrice;
  }
  catch (error) {
    alert(error)
  }
}
//End of the API Async Function

//Launch the apiAsync function
apiAsync();
/* -- End of 1st Part of the Code -- /*


/* -------------------------------- 2nd Part of the Code -------------------------------- */
/* -- This code Part focus on checking the form part and seding the products and contact information to the API -- */

/* -- Variable Init Declarations -- */
let orderId = "";
let contact = {};

// -- Const dedicated to Regex Verification Method -- //
const regexFirstName = /^[A-Za-z\é\è\ê\-]+$/;
const regexLastName = regexFirstName;
const regexCity = regexFirstName;
const regexAddress = /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Associate specific variables with a DOM element
const firstName = document.querySelector('input#firstName');
const lastName = document.querySelector('input#lastName');
const address = document.querySelector('input#address');
const city = document.querySelector('input#city');
const email = document.querySelector('input#email');

// Function to check the session storage that stored the contact inforamtion, if present display the last known data into the form
const checkSessionStorage = (identifier, keyName) => {
  if (sessionStorage.getItem(keyName) === null || sessionStorage.getItem(keyName).length == 0 || sessionStorage.getItem(keyName) === "") {
    identifier.value = "";
  }
  else {
    identifier.value = sessionStorage.getItem(keyName);
  }
}

//Launch the function check session storage for each of specific contact value
checkSessionStorage(firstName, 'firstName');
checkSessionStorage(lastName, 'lastName');
checkSessionStorage(address, 'address');
checkSessionStorage(city, 'city');
checkSessionStorage(email, 'email');

// Function to test all the contact Value except email
const testRegex = (identifier, regexName, idSelector, keyName) => {
  if (regexName.test(identifier.value) != true) {
    document.querySelector(idSelector).textContent = `${identifier.value} n'est pas valide !`;
    return false;
  }
  else {
    sessionStorage.removeItem(keyName);
    sessionStorage.setItem(keyName, identifier.value)
    document.querySelector(idSelector).textContent = ``;
    return true;
  }
}


/* -- Function to send the contact object & products array to the API's BackEnd-- */
const sendToServer = async () => {
  //Initialise the const to define the sendind the POST object 
  const settings = {
    method: 'POST',
    body: JSON.stringify({ contact, products }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

  //Call the appi with the settings
  try {
    const fetchResponse = await fetch(`http://localhost:3000/api/products/order`, settings);
    const data = await fetchResponse.json();
    orderId = data.orderId;

    // Check if the OrderId has been modified, clear the local storage then send the user to the confirmation page.
    if (orderId != "") {
      localStorage.clear();
      location.href = "confirmation.html?id=" + orderId;
    }
    else {
      throw new Error('Le numéro de commande présente un problème, merci de réessayer ultérieurement')
    }
  } catch (error) {
    alert(error)
  }

}

// Function that post the contact object and products array to the back end
document.querySelector('#order').addEventListener('click', (evt) => {
  evt.preventDefault();
  if (testRegex(firstName, regexFirstName, '#firstNameErrorMsg', 'firstName')
    && testRegex(lastName, regexLastName, '#lastNameErrorMsg', 'lastName')
    && testRegex(city, regexCity, '#cityErrorMsg', 'city')
    && testRegex(address, regexAddress, '#addressErrorMsg', 'address')
    && testRegex(email, regexEmail, '#emailErrorMsg', 'email')) {

    contact.firstName = firstName.value;
    contact.lastName = lastName.value;
    contact.city = city.value;
    contact.address = address.value;
    contact.email = email.value;
    sendToServer()
  }
})


