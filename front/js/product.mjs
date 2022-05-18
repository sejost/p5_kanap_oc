let itemImg = document.querySelectorAll('.item__img');
let currentUrl = new URL(window.location.href);
let params = new URLSearchParams(currentUrl.search);
let pageId = params.get("id");

const apiUrlOneProduct = `http://localhost:3000/api/products/${pageId}`;


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



fetch(apiUrlOneProduct)
    .then((res) =>
        res.json()
            .then((data) => {
                document.querySelector('article .item__img').appendChild(document.createElement('img'));
                let itemImg = document.querySelector('.item__img img');
                itemImg.setAttribute('src', data.imageUrl)
                itemImg.setAttribute('alt', data.altTxt);

                document.querySelector('#title').textContent = data.name;
                document.querySelector('#price').textContent = data.price;
                document.querySelector('#description').textContent = data.description;

                for (let i = 0; i < data.colors.length; i++) {
                    document.querySelector('#colors').appendChild(document.createElement('option'));
                    document.querySelectorAll('#colors option')[i + 1].setAttribute('value', data.colors[i]);
                    document.querySelectorAll('#colors option')[i + 1].textContent = colorsTranslator(data.colors[i]);
                }

                const removeFirstSelect = () => {
                    document.querySelector('#colors').removeChild((document.querySelectorAll('#colors option'))[0]);
                    document.querySelector('#colors').removeEventListener('click', removeFirstSelect);
                };

                document.querySelector('#colors').addEventListener('click', removeFirstSelect);

                document.querySelector('#addToCart').addEventListener('click', () => {
                    let cart = [];
                    let cartValue = document.querySelector('#quantity').value;
                    let colorValue = document.querySelector('#colors').value;
                    let keyName = data.name + ' ' + colorValue;
                    const addNewCart = () => {
                        cart.push(pageId);
                        cart.push(colorValue);
                        cart.push(cartValue);
                        localStorage.setItem(data.name + ' ' + colorValue, cart);
                        alert(`Vos ${cartValue} articles ont bien été ajouté au panier`)
                    }

                    const addSomeCart = () => {
                        let idValues = localStorage.getItem(keyName);
                        const cartItemSplitted = idValues.split(',');
                        localStorage.removeItem(keyName)
                        cart.push(pageId);
                        cart.push(colorValue);
                        cart.push(parseInt(cartValue) + parseInt(cartItemSplitted[2]));
                        localStorage.setItem(keyName, cart);
                        alert(`Vos ${cartValue} articles ont bien été ajouté au panier`)
                    }

                    if (cartValue == 0 || cartValue > 100 || cartValue < 0) {
                        alert(`Merci d'indiquer un nombre d'article compris entre 1 et 100`);
                    }
                    else if (colorValue == '') {
                        alert(`Merci de préciser la couleur souhaitée de l'article`);
                    }
                    else if (localStorage.getItem(keyName) != null) {
                        addSomeCart();

                    }
                    else {
                        addNewCart();
                    }
                })
            }))

    .catch((error) => {
        console.error(error)
    });
