let itemImg = document.querySelectorAll('.item__img');
let currentUrl = new URL(window.location.href);
let params = new URLSearchParams(currentUrl.search);
let pageId = params.get("id");

function findIndex(dataName) {
    let dataIndex;
    for (let i = 0; i < dataName.length; i++) {
        if (pageId == dataName[i]._id) {
            dataIndex = i;
        }
    }
    return dataIndex;
}

function nbOfColors(dataName) {
    let colorIndex = dataName[findIndex(dataName)].colors.length;
    return colorIndex;
}


const url = `http://localhost:3000/api/products`;
fetch(url).then((res) =>
    res.json().then((data) => {
        document.querySelector('article .item__img').appendChild(document.createElement('img'));
        let itemImg = document.querySelector('.item__img img');
        itemImg.setAttribute('src', data[findIndex(data)].imageUrl)
        itemImg.setAttribute('alt', data[findIndex(data)].altTxt);

        document.querySelector('#title').textContent = data[findIndex(data)].name;
        document.querySelector('#price').textContent = data[findIndex(data)].price;
        document.querySelector('#description').textContent = data[findIndex(data)].description;

        console.log(nbOfColors(data));
        console.log(data[findIndex(data)].colors[0]);

        document.querySelector('#colors').addEventListener('select', () => {

            //document.querySelector('#colors').removeChild(document.querySelector('#colors option'));
            //document.querySelector('#colors').appendChild(document.createElement('option'));
            //document.querySelector('#colors').appendChild(document.createElement('option'));

        })
    }));