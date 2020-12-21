//Unsplash API
const count = 10;
const apiKey = '25jIjLz3JJbWckjCdB0hhzhMI4pxlaGe5rJObuBMdcE';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log('Ooops no photos', err);
  }
}

//On Load
getPhotos();
