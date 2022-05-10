let itemImg = document.querySelectorAll('.item__img');
let currentUrl = new URL(window.location.href);
let params = new URLSearchParams(currentUrl.search);
let pageId = params.get("id");
let myData;
let colorsNb;

const url = `http://localhost:3000/api/products`;


const getMyData = (productsData) => {
    let dataIndex;
    for (let i = 0; i < productsData.length; i++) {
        if (pageId == productsData[i]._id) {
            dataIndex = i;
        }
    }
    myData = productsData[dataIndex];
    return myData;
}

const nbOfColors = (myData) => {
    colorsNb = myData.colors.length;
    return colorsNb;
}

const colorsTranslator = (color) => {

}

const colorsDictionnary = {
    'Blue': 'bleue',
    'White': 'blanc',
    'Black': 'noir',
    'Green': 'vert',
    'Red': 'rouge',
    'Pink': 'rose',
    'grey': 'gris',
    'purple': 'violet',
    'navy': 'marine',
    'silver': 'argent',
    'brown': 'marron',
    'yellow': 'jaune',
    'orange': 'orange'
};

const remove1stSelect = () => {
    document.querySelector('#colors').removeChild((document.querySelectorAll('#colors option'))[0]);
    document.querySelector('#colors').removeEventListener('click', remove1stSelect);
};

fetch(url)
    .then((res) =>
        res.json()
            .then((data) => {
                getMyData(data);
                nbOfColors(myData);

                document.querySelector('article .item__img').appendChild(document.createElement('img'));
                let itemImg = document.querySelector('.item__img img');
                itemImg.setAttribute('src', myData.imageUrl)
                itemImg.setAttribute('alt', myData.altTxt);

                document.querySelector('#title').textContent = myData.name;
                document.querySelector('#price').textContent = myData.price;
                document.querySelector('#description').textContent = myData.description;

                for (let i = 0; i < colorsNb; i++) {
                    document.querySelector('#colors').appendChild(document.createElement('option'));
                    document.querySelectorAll('#colors option')[i + 1].setAttribute('value', myData.colors[i]);
                    document.querySelectorAll('#colors option')[i + 1].textContent = colorsDictionnary[myData.colors[i]];
                }

                document.querySelector('#colors').addEventListener('click', remove1stSelect);
            }))

    .catch((error) => {
        console.log(error)
    });
