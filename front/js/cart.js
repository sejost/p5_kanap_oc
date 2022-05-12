let products = [];

for (let i = 0; i < localStorage.length; ++i) {
    products[i] = [];
    //console.log(localStorage.getItem(localStorage.key(i)));
    let idValues = localStorage.getItem(localStorage.key(i));
    const cartItemSplitted = idValues.split(',');
    products[i].push(cartItemSplitted[0]);
    products[i].push(cartItemSplitted[1]);
    products[i].push(cartItemSplitted[2]);

    document.querySelector('#cart__items').appendChild(document.createElement('article'));
    document.querySelector('article').setAttribute('class', 'cart__item');
    document.querySelector('article').setAttribute('data-id', cartItemSplitted[0])
    console.log(cartItemSplitted[0])
    document.querySelector('article').setAttribute('data-color', cartItemSplitted[1])
    console.log(cartItemSplitted[1])
}

//<section id="cart__items">
/*
 <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>Vert</p>
        <p>42,00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> -->
*/

//<div class="cart__price">
//<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">
/* <!-- 84,00 -->*/

//<form method="get" class="cart__order__form">
//<p id="firstNameErrorMsg">
/*    <!-- ci est un message d'erreur --> */