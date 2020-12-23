const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const downloadLink = document.getElementById('download-link');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Check if all images werw loaded
function imageLoaded() {
  console.log('image loaded');
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready = ', ready);
  }
}

//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM and
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images ', totalImages);
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    //create Download link
    const link = document.createElement('a');
    setAttributes(link, {
      href: photo.links.download,
    });

    link.innerHTML = 'Click to download';
    imageContainer.appendChild(link);

    const item = document.createElement('a');
    //item.setAttribute('href', photo.links.html);
    //item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    //img.setAttribute('src', photo.urls.regular);
    //img.setAttribute('alt', photo.alt_description);
    //img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listeners, chexk when each photo is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Unsplash API
const count = 10;
const apiKey = '25jIjLz3JJbWckjCdB0hhzhMI4pxlaGe5rJObuBMdcE';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray);
  } catch (err) {
    console.log('Ooops no photos', err);
  }
}

//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    console.log('window.innerHeight', window.innerHeight);
    console.log('window.scrollY', window.scrollY);
    console.log(
      'window.innerHeight + scrollY',
      window.scrollY + window.innerHeight
    );
    console.log(
      'document.body.offsetHeight - 1000',
      document.body.offsetHeight - 1000
    );
    ready = false;
    getPhotos();
    console.log('load more');
    console.log('ready ', ready);
  }
});

// On Load
getPhotos();
