// script.js - JavaScript Animation File

const animatedDiv = document.getElementById('animatedDiv');
const photo = document.getElementById('photo');
const startBtn = document.getElementById('startBtn');

// Photo URLs to switch between
const photos = [
    'james-doakes1753344838-0-412x290.webp',
    'IMG_6273.JPG'
];

let currentPhotoIndex = 0;

function animate() {
    // Disable button during animation
    startBtn.disabled = true;
    
    // Step 1: Slide in from right
    animatedDiv.style.transition = 'transform 1s ease-out';
    animatedDiv.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        // Step 2: Height up, Width up
        animatedDiv.style.transition = 'width 0.8s ease, height 0.8s ease';
        animatedDiv.style.width = '400px';
        animatedDiv.style.height = '400px';
        
        setTimeout(() => {
            // Step 3: Change photo and lower opacity
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            photo.style.opacity = '0.3';
            
            setTimeout(() => {
                photo.src = photos[currentPhotoIndex];
                
                setTimeout(() => {
                    // Step 4: Height low, Width low
                    animatedDiv.style.transition = 'width 0.8s ease, height 0.8s ease';
                    animatedDiv.style.width = '150px';
                    animatedDiv.style.height = '150px';
                    
                    setTimeout(() => {
                        // Step 5: Opacity back to normal
                        photo.style.opacity = '1';
                        
                        setTimeout(() => {
                            // Step 6: Return to original position and size
                            animatedDiv.style.transition = 'width 0.8s ease, height 0.8s ease';
                            animatedDiv.style.width = '200px';
                            animatedDiv.style.height = '200px';
                            
                            setTimeout(() => {
                                // Re-enable button
                                startBtn.disabled = false;
                            }, 800);
                        }, 500);
                    }, 800);
                }, 300);
            }, 500);
        }, 800);
    }, 1000);
}

startBtn.addEventListener('click', animate);