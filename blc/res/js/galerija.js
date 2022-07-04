const photos = document.querySelectorAll('.photo');
const overlay = document.querySelector('.gallery-overlay');
const overlayImg = document.querySelector('.overlay-img');
let overlayOpen = false;
let currentPhoto = null;
let currentPosition = null;

const closeOverlay = () => {
    window.scrollTo(0,currentPosition);
    overlay.style.display = 'none';
    overlayOpen = false;
    document.querySelector('.gallery-wrapper').style.overflow = 'initial';
    document.querySelector('html').style.overflow = 'initial';
    document.querySelector('body').style.overflow = 'initial';
    currentPhoto = null;
}

const openOverlay = () => {
    currentPosition = window.pageYOffset;
    window.scrollTo(0, 0);
    overlay.style.display = 'flex';
    document.querySelector('.gallery-wrapper').style.overflow = 'hidden';
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('body').style.overflow = 'hidden';
    overlayOpen = true;
}

const showNextPhoto = () => {
    if(currentPhoto === null) return;
    let maxPhotoIndex = photos.length - 1;
    let nextPhotoIndex  = parseInt(currentPhoto) + 1;
    if(nextPhotoIndex > maxPhotoIndex) nextPhotoIndex = 0;
    overlayImg.src = photos[nextPhotoIndex].src;
    currentPhoto = photos[nextPhotoIndex].dataset.id;
}
const showPreviousPhoto = () => {
    if(currentPhoto === null) return;
    let maxPhotoIndex = photos.length - 1;
    let nextPhotoIndex  = parseInt(currentPhoto) - 1;
    if(nextPhotoIndex < 0 ) nextPhotoIndex = maxPhotoIndex;
    overlayImg.src = photos[nextPhotoIndex].src;
    currentPhoto = photos[nextPhotoIndex].dataset.id;
}


photos.forEach(photo => {
    photo.addEventListener('click', event => {
        event.preventDefault();
        overlayImg.src = event.target.src;
        openOverlay();
        currentPhoto = event.target.dataset.id;
    });

})

overlay.addEventListener('click', () => {
    closeOverlay();
});

document.addEventListener('keydown', (event) => {
    if(!overlayOpen) return;
    switch (event.key) {
        case 'Escape':
            closeOverlay();
            break;
        case 'ArrowLeft':
            showPreviousPhoto();
            break;
        
        case 'ArrowRight':
            showNextPhoto();
            break;
    
        default:
            break;
    }

});