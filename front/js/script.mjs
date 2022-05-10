//import fetch from 'node-fetch';

const url = `http://localhost:3000/api/products`;
let items = document.querySelector('#items');


fetch(url).then((res) =>
  res.json().then((data) => {
    //console.log(data[0]._id);
    //Start of the for loop
    for (let i = 0; i < data.length; i++) {
      //Creation of the Anchors as child of the section
      items.appendChild(document.createElement('a'));
      let anchorNb = document.querySelectorAll('#items a')[i];
      anchorNb.setAttribute('href', `./product.html?id=${data[i]._id}`)

      //Creation of the Articles as child of a
      anchorNb.appendChild(document.createElement('article'));
      let articleNb = document.querySelectorAll('#items a article')[i];

      //Creation of the images, title H3 and paragraph as child of Article
      articleNb.appendChild(document.createElement('img'));
      articleNb.appendChild(document.createElement('h3'));
      articleNb.appendChild(document.createElement('p'));
      let imgNb = document.querySelectorAll('#items img')[i];
      let titleNb = document.querySelectorAll('#items h3')[i];
      let paragraphNb = document.querySelectorAll('#items p')[i];

      //Setting the content & attributes of the images, title H3 and paragraph
      imgNb.setAttribute('src', data[i].imageUrl);
      imgNb.setAttribute('alt', data[i].altTxt);
      titleNb.setAttribute('class', data[i].name);
      titleNb.textContent = data[i].name;
      //paragraphNb.setAttribute('class', data[i].description);
      paragraphNb.textContent = data[i].description;
    }
  })
)
  .catch((error) => {
    console.log(error)
  });




