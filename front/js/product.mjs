let itemImg = document.querySelectorAll('.item__img');
let currentUrl = new URL(window.location.href);
let params = new URLSearchParams(currentUrl.search);
let pageId = params.get("id");

const apiUrlOneProduct = `http://localhost:3000/api/products/${pageId}`;


const colorsTranslator = (color) => {
    if (color.includes('/') == true) {
        const colorsSplitted = color.split('/');
        let color1 = colorsDictionnary[colorsSplitted[0].toLowerCase()];
        let color2 = colorsDictionnary[colorsSplitted[1].toLowerCase()];
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
            }))

    .catch((error) => {
        console.log(error)
    });
