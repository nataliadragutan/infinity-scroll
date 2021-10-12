const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Unsplash API
const count = 5;
const apiKey = config.API_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//Check if all images where loaded
function imageLoading(){
    console.log('image loading');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}
// Helper Function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
// Create elements for  Links and Photos, and add to the Dom.
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //Run function for each object in photosArrary
    photosArray.forEach((photo) =>{
        //create an <a> element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoading);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // Catch Error Here
    }
}
//Check to see if scrolling bear bottom of page. Load More Photos
window.addEventListener('scroll', () => {
    // console.log('scrolled')
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        //console.log('load more');
    }
})
getPhotos(); 