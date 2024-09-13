document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      const loadingScreen = document.getElementById('loadingScreen');
      loadingScreen.classList.add('hidden');
      // Optionally, remove the loading screen element from the DOM after the transition
      setTimeout(function() {
        loadingScreen.remove();
      }, 500); // Match the transition duration in CSS
    }, 1000); // Change back to 3000
  });
  
  // Toggle dropdown menu
const menuButton = document.getElementById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');

menuButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('visible');

  if (dropdownMenu.classList.contains('visible')) {
    document.querySelectorAll('.dropdown-item').forEach((item, index) => {
      item.style.animation = `dropdown-fade-in 0.5s forwards ${index * 0.1}s`;
    });
  } else {
    document.querySelectorAll('.dropdown-item').forEach((item) => {
      item.style.animation = `dropdown-fade-out 0.5s forwards`;
    });
  }
});
