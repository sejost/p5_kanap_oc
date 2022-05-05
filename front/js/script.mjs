//import fetch from 'node-fetch';

const url = `http://localhost:3000/api/products`;
let items = document.querySelector('#items');


fetch(url).then((res) =>
  res.json().then((data) => {
    //console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      items.appendChild(document.createElement('a'));
      document.querySelectorAll('#items a')[i].textContent = `Lien n°${i + 1}`;
    }

  })
);




