// Perform search when pressing Enter or clicking the search icon
document.getElementById('search-bar').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

document.querySelector('.search-icon').addEventListener('click', performSearch);

function performSearch() {
    const searchValue = document.getElementById('search-bar').value.toLowerCase();
    const textBoxes = document.querySelectorAll('.text-box');

    textBoxes.forEach(box => {
        let boxMatched = false; // Track if a match is found in the box

        const items = box.querySelectorAll('li');
        items.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(searchValue)) {
                item.classList.add('highlight'); // Use CSS class for highlighting
                boxMatched = true; // Mark box as matched
            } else {
                item.classList.remove('highlight'); // Remove highlight class
            }
        });

        // Briefly highlight the box border if a match is found
        if (boxMatched) {
            box.style.borderColor = 'transparent'; // Hide the border color initially
            box.style.boxShadow = '0 0 20px rgba(0, 180, 255, 1)'; // Brighter blue glow effect


            // Remove the highlight after 2 seconds
            setTimeout(() => {
                items.forEach(item => {
                    item.classList.remove('highlight'); // Remove highlight from items
                });
                box.style.boxShadow = 'none'; // Remove glow effect
            }, 2000);
        }
    });
}
