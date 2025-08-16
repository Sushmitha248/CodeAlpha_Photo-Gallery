// Select elements
const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryItems = document.querySelectorAll('.gallery .item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentImageIndex = 0;
let visibleItems = Array.from(galleryItems); // default: all images

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    visibleItems = []; // reset visible list

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        visibleItems.push(item);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Open lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Make sure visibleItems is updated when clicking directly
    visibleItems = Array.from(galleryItems).filter(
      img => img.style.display !== 'none'
    );

    // Find correct index within visibleItems
    currentImageIndex = visibleItems.indexOf(item);

    showLightbox(visibleItems[currentImageIndex].querySelector('img').src);
  });
});

function showLightbox(src) {
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
}

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigate next
nextBtn.addEventListener('click', () => {
  navigateImage(1);
});

// Navigate prev
prevBtn.addEventListener('click', () => {
  navigateImage(-1);
});

function navigateImage(direction) {
  if (visibleItems.length === 0) return; // no images to navigate

  currentImageIndex =
    (currentImageIndex + direction + visibleItems.length) % visibleItems.length;

  lightboxImg.src = visibleItems[currentImageIndex].querySelector('img').src;
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
