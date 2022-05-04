import fetch from 'node-fetch';
//import { response } from '../../back/app';

const url = `http://localhost:3000/api/products`;

fetch(url).then((res) =>
  res.json().then((data) => {
    console.log(data.length)
    console.log(data[1].name)
    console.log(data[2].name)
    console.log(data[3].name)
    console.log(data[4].name)
    console.log(data[5].name)
    console.log(data[6].name)
    console.log(data[7].name)
  })
);


