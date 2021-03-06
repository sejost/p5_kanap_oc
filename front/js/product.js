/* -- Variable Init Declarations -- */
let currentUrl = new URL(window.location.href);

/* -- Variable Init Declarations for search into the URL and get the product ID selected-- */
let params = new URLSearchParams(currentUrl.search);
let pageId = params.get("id");
const getOneProduct = `http://localhost:3000/api/products/${pageId}`;

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

/* -- Main function calling the API-- */
const apiAsync = async () => {
    try {
        let response = await fetch(getOneProduct);
        let data = await response.json();

        /* -- Creation HTML architecture -- */
        document.querySelector('article .item__img').appendChild(document.createElement('img'));
        let itemImg = document.querySelector('.item__img img');
        itemImg.setAttribute('src', data.imageUrl)
        itemImg.setAttribute('alt', data.altTxt);

        document.querySelector('#title').textContent = data.name;
        document.querySelector('#price').textContent = data.price;
        document.querySelector('#description').textContent = data.description;

        /* -- Loop create adding multiple colors selector -- */
        for (let i = 0; i < data.colors.length; i++) {
            document.querySelector('#colors').appendChild(document.createElement('option'));
            document.querySelectorAll('#colors option')[i + 1].setAttribute('value', data.colors[i]);
            document.querySelectorAll('#colors option')[i + 1].textContent = colorsTranslator(data.colors[i]);
        }

        /* -- Function to remove the message "SVP, choississez une couleur"-- */
        const removeFirstSelect = () => {
            document.querySelector('#colors').removeChild((document.querySelectorAll('#colors option'))[0]);
            document.querySelector('#colors').removeEventListener('click', removeFirstSelect);
        };

        /* -- Event listener triggerded on click on the select color and callback the remove select function -- */
        document.querySelector('#colors').addEventListener('click', removeFirstSelect);

        /* -- Event listener triggerded on click on button "ajouter au panier" -- 
           -- Push information in an array the cart information and add it into the local storage then display a confirmation message --*/
        document.querySelector('#addToCart').addEventListener('click', () => {
            let cart = [];
            let productQty = document.querySelector('#quantity').value;
            let productColor = document.querySelector('#colors').value;
            let keyName = data.name + ' ' + productColor;

            /* -- Function create a cart with new products-- */
            const newCart = () => {
                cart.push(pageId);
                cart.push(productColor);
                cart.push(productQty);
                localStorage.setItem(data.name + ' ' + productColor, cart);
                displayResult();
            }

            /* -- Function to add a new quantity of products in an existing product item cart-- */
            const addToCart = () => {
                let idValues = localStorage.getItem(keyName);
                const cartItems = idValues.split(',');
                if ((parseInt(productQty) + parseInt(cartItems[2])) > 100) {
                    alert(`Attention, votre panier contient d??j?? ${cartItems[2]} article??s de cette couleur, vous ne pouvez pas d??passer les 100`)
                    localStorage.removeItem(keyName)
                    cart.push(pageId);
                    cart.push(productColor);
                    productQty = cartItems[2];
                    document.querySelector('#quantity').value = cartItems[2];
                    cart.push(productQty);
                    localStorage.setItem(keyName, cart);
                }
                else {
                    localStorage.removeItem(keyName)
                    cart.push(pageId);
                    cart.push(productColor);
                    cart.push(parseInt(productQty) + parseInt(cartItems[2]));
                    localStorage.setItem(keyName, cart);
                    displayResult();
                }
            }

            /* -- Function to display the confirmation adding to cart message-- */
            const displayResult = () => {
                if (productQty > 1) {
                    alert(`Vos ${productQty} articles ont bien ??t?? ajout??s au panier`)
                }
                else {
                    alert(`Votre article a bien ??t?? ajout?? au panier`)
                }
            }
            /* -- Main condition in the event listener to be authorized to add product in a cart -- */
            if (productQty == 0 || productQty > 100 || productQty < 0) {
                alert(`Merci d'indiquer un nombre d'article compris entre 1 et 100`);
            }
            else if (productColor == '') {
                alert(`Merci de pr??ciser la couleur souhait??e de l'article`);
            }
            else if (localStorage.getItem(keyName) != null) {
                addToCart();
            }
            else {
                newCart();
            }
        })

    }
    /* -- Catch and display error message if so --*/
    catch (error) {
        alert(`Erreur lors du chargement de la page`)
        location.href = "index.html";
    }
}
apiAsync()


