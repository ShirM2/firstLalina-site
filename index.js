document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded');
    // כאן תוכל להוסיף אינטראקציות נוספות לאתר
});
let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
const API_KEY = 'AIzaSyDHsPd-KKsG1x0cr0_0oyvtHQHrrgXMJ-o';

// Store locations (replace with your own store data)
const stores = [
    { lat: 32.085300, lng: 34.781769, name: 'Store Tel Aviv' },
    { lat: 31.768319, lng: 35.213710, name: 'Store Jerusalem' },
    { lat: 32.794044, lng: 34.989571, name: 'Store Haifa' }
];

function initMap() {
    // Map options
    const mapOptions = {
        zoom: 4,
        center: { lat: 31.768319, lng: 35.213710 }  // Center of the US
    };

    // New map
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Add markers
    stores.forEach(store => {
        const marker = new google.maps.Marker({
            position: { lat: store.lat, lng: store.lng },
            map: map,
            title: store.name
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${store.name}</h3>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
    
}
