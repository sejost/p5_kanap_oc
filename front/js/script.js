/* -- Variable Init Declarations -- */
const getAllProducts = `http://localhost:3000/api/products/`;

/* -- Main function calling the API-- */
const apiAsync = async () => {
  try {
    let response = await fetch(getAllProducts);
    let data = await response.json();

    /* -- Init Loop : "As long as the data is long do this" -- */
    for (let i = 0; i < data.length; i++) {

      /* -- Creation of the Anchors as child of the section -- */
      document.querySelector('#items').appendChild(document.createElement('a'));
      let anchorNb = document.querySelectorAll('#items a')[i];
      anchorNb.setAttribute('href', `./product.html?id=${data[i]._id}`);

      /* -- Creation of the Articles as child of a -- */
      anchorNb.appendChild(document.createElement('article'));
      let articleNb = document.querySelectorAll('#items a article')[i];

      /* -- Creation of the images, title H3 and paragraph as child of Article -- */
      articleNb.appendChild(document.createElement('img'));
      articleNb.appendChild(document.createElement('h3'));
      articleNb.appendChild(document.createElement('p'));
      let imgNb = document.querySelectorAll('#items img')[i];
      let titleNb = document.querySelectorAll('#items h3')[i];
      let paragraphNb = document.querySelectorAll('#items p')[i];

      /* -- Setting the content & attributes of the images, title H3 and paragraph -- */
      imgNb.setAttribute('src', data[i].imageUrl);
      imgNb.setAttribute('alt', data[i].altTxt);
      titleNb.setAttribute('class', data[i].name);
      titleNb.textContent = data[i].name;
      paragraphNb.textContent = data[i].description;
    }
  }
  /* -- Catch and display error message if so --*/
  catch (error) {
    alert(`Erreur lors du chargement de la page, merci de réessayer ultérieurement`);
  }
}

/* -- Automatic Execution of the function -- */
apiAsync();

