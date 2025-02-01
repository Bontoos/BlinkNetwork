const navLinks = document.querySelectorAll('.hero .container ul li a'); // Make sure you're selecting the <a> tags

// You can add an offset if necessary (e.g., for a sticky header)
const offset = 0; // Adjust this value depending on your header size or design

navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href').substring(1); // Get the target section ID
    const targetSection = document.getElementById(targetId); // Get the target section

    // Check if the section exists
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - offset, // Scroll to the section with an offset
        behavior: 'smooth'
      });
    }
  });
});
