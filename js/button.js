// Function to handle the 3D object container toggle and chatbot button click for the first clickable area
function handleGlobalClick() {
    toggleObjectContainer(); // Show or hide the 3D object container
    simulateChatbotClick();  // Simulate the chatbot button click
}

// Function to toggle 3D object visibility
function toggleObjectContainer() {
    const objectContainer = document.getElementById('objectContainer');
    if (objectContainer.style.display === 'none' || !objectContainer.style.display) {
        objectContainer.style.display = 'block';
    } else {
        objectContainer.style.display = 'none';
    }
}

// Function to simulate a click on the chatbot button
function simulateChatbotClick() {
    const chatbotButton = document.querySelector('.chatbot-button-class'); // Replace with actual selector
    if (chatbotButton) {
        chatbotButton.click();
    }
}

// Define the size and position of the first clickable area
const buttonWidth = 50; // Button width in pixels
const buttonHeight = 50; // Button height in pixels
const offsetRight = 19; // Distance from the right edge of the screen
const offsetBottom = 19; // Distance from the bottom edge of the screen

// Define the size and position of the second clickable area
const secondButtonWidth = 50; // Second button width in pixels
const secondButtonHeight = 50; // Second button height in pixels
const secondOffsetRight = 19; // Distance from the right edge of the screen
const secondOffsetBottom = 728; // Distance from the bottom edge of the screen

// Function to create and style the overlay to show the clickable area
function createClickableAreaOverlay(width, height, bottomOffset, rightOffset, id) {
    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.style.position = 'fixed';
    overlay.style.width = `${width}px`;
    overlay.style.height = `${height}px`;
    overlay.style.bottom = `${bottomOffset}px`; // Position from bottom
    overlay.style.right = `${rightOffset}px`;   // Position from right
    overlay.style.backgroundColor = 'transparent'; // Make the background transparent
    overlay.style.zIndex = '10000'; // Ensure it's on top of other elements
    overlay.style.pointerEvents = 'auto'; // Enable clicking
    overlay.style.borderRadius = '50%'; // Make the area round
    overlay.style.display = 'block'; // Ensure the overlay is visible and clickable
    document.body.appendChild(overlay);
}

// Create and show the overlay to visualize the first clickable area
createClickableAreaOverlay(buttonWidth, buttonHeight, offsetBottom, offsetRight, 'clickableAreaOverlay');

// Create and show the second clickable area (this one is now always visible)
createClickableAreaOverlay(secondButtonWidth, secondButtonHeight, secondOffsetBottom, secondOffsetRight, 'secondClickableAreaOverlay');

// Global click listener for the first clickable area
window.addEventListener('click', function(event) {
    const viewportWidth = window.innerWidth; // Viewport width
    const viewportHeight = window.innerHeight; // Viewport height

    // Define the coordinates based on button position and dimensions for the first clickable area
    const areaXStart = viewportWidth - buttonWidth - offsetRight;
    const areaXEnd = viewportWidth - offsetRight;
    const areaYStart = viewportHeight - buttonHeight - offsetBottom;
    const areaYEnd = viewportHeight - offsetBottom;

    // Check if the click happened within the defined area (first clickable area)
    if (
        event.clientX >= areaXStart &&
        event.clientX <= areaXEnd &&
        event.clientY >= areaYStart &&
        event.clientY <= areaYEnd
    ) {
        handleGlobalClick(); // Trigger the functionality
    }
});

// Global click listener for the second clickable area
window.addEventListener('click', function(event) {
    const viewportWidth = window.innerWidth; // Viewport width
    const viewportHeight = window.innerHeight; // Viewport height

    // Define the coordinates based on button position and dimensions for the second clickable area
    const secondAreaXStart = viewportWidth - secondButtonWidth - secondOffsetRight;
    const secondAreaXEnd = viewportWidth - secondOffsetRight;
    const secondAreaYStart = viewportHeight - secondButtonHeight - secondOffsetBottom;
    const secondAreaYEnd = viewportHeight - secondOffsetBottom;

    // Check if the click happened within the defined area (second clickable area)
    if (
        event.clientX >= secondAreaXStart &&
        event.clientX <= secondAreaXEnd &&
        event.clientY >= secondAreaYStart &&
        event.clientY <= secondAreaYEnd
    ) {
        hideObjectContainer(); // Hide the 3D object container, regardless of its current state
    }
});

// Function to hide the 3D object container
function hideObjectContainer() {
    const objectContainer = document.getElementById('objectContainer');
    if (objectContainer) {
        objectContainer.style.display = 'none'; // Ensure it's hidden
    }
}
