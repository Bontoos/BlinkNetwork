const newsContainer = document.querySelector('.news .container');
const newsItems = document.querySelectorAll('.news .container .item');
const dotsContainer = document.querySelector('.news .dots');
const arrowLeft = document.querySelector('.news .arrow-left');
const arrowRight = document.querySelector('.news .arrow-right');

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let startPos = 0;

// Create dots
function createDots() {
  dotsContainer.innerHTML = ""; // Clear existing dots
  for (let i = 0; i < newsItems.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateScroll();
    });
    dotsContainer.appendChild(dot);
  }
}

// Update scrolling position
function updateScroll() {
  const width = newsContainer.offsetWidth;
  currentTranslate = -currentIndex * width;
  prevTranslate = currentTranslate;
  newsContainer.style.transform = `translateX(${currentTranslate}px)`;

  // Update active dot
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Handle arrow navigation
arrowLeft.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : newsItems.length - 1;
  updateScroll();
});

arrowRight.addEventListener('click', () => {
  currentIndex = (currentIndex < newsItems.length - 1) ? currentIndex + 1 : 0;
  updateScroll();
});

// Touch & Mouse Drag Functionality
function touchStart(e) {
  isDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  startPos = currentTranslate;
  animationID = requestAnimationFrame(animation);
  newsContainer.style.transition = 'none';
}

function touchMove(e) {
  if (!isDragging) return;
  const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  const diff = currentX - startX;
  currentTranslate = startPos + diff;
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  newsContainer.style.transition = 'transform 0.3s ease-in-out';

  const width = newsContainer.offsetWidth;
  if (currentTranslate - prevTranslate < -width / 3 && currentIndex < newsItems.length - 1) {
    currentIndex++;
  } else if (currentTranslate - prevTranslate > width / 3 && currentIndex > 0) {
    currentIndex--;
  }

  updateScroll();
}

// Animation loop for smoother dragging
function animation() {
  newsContainer.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

// Event Listeners
newsContainer.addEventListener('mousedown', touchStart);
newsContainer.addEventListener('mousemove', touchMove);
newsContainer.addEventListener('mouseup', touchEnd);
newsContainer.addEventListener('mouseleave', touchEnd);
newsContainer.addEventListener('touchstart', touchStart);
newsContainer.addEventListener('touchmove', touchMove);
newsContainer.addEventListener('touchend', touchEnd);

// Initialize
createDots();
updateScroll();
