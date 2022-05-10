let itemImg = document.querySelectorAll('.item__img');
let currentUrl = new URL(window.location.href);
let params = new URLSearchParams(currentUrl.search);
let pageId = params.get("id");

const findIndex = (dataName) => {
    let dataIndex;
    for (let i = 0; i < dataName.length; i++) {
        if (pageId == dataName[i]._id) {
            dataIndex = i;
        }
    }
    return dataIndex;
}

const nbOfColors = (dataName) => {
    let colorsNb = dataName[findIndex(dataName)].colors.length;
    return colorsNb;
}

let colorsDictionnary = {
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

//const data = JSON.parse(res);


const removeChoice = () => {
    document.querySelector('#colors').removeChild((document.querySelectorAll('#colors option'))[0]);
    document.querySelector('#colors').removeEventListener('click', removeChoice);
};

const url = `http://localhost:3000/api/products`;
fetch(url)
    .then((res) =>
        res.json().then((data) => {
            document.querySelector('article .item__img').appendChild(document.createElement('img'));
            let itemImg = document.querySelector('.item__img img');
            itemImg.setAttribute('src', data[findIndex(data)].imageUrl)
            itemImg.setAttribute('alt', data[findIndex(data)].altTxt);

            document.querySelector('#title').textContent = data[findIndex(data)].name;
            document.querySelector('#price').textContent = data[findIndex(data)].price;
            document.querySelector('#description').textContent = data[findIndex(data)].description;

            for (let i = 0; i < nbOfColors(data); i++) {
                document.querySelector('#colors').appendChild(document.createElement('option'));
                document.querySelectorAll('#colors option')[i + 1].setAttribute('value', data[findIndex(data)].colors[i]);
                console.log(colorsDictionnary[(data[findIndex(data)].colors[i])]);
                document.querySelectorAll('#colors option')[i + 1].textContent = colorsDictionnary[data[findIndex(data)].colors[i]];
            }

            document.querySelector('#colors').addEventListener('click', removeChoice);
        }))
    .catch((error) => {
        console.log(error)
    });