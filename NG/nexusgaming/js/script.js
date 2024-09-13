// Add this to your script.js file
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add_to_cart');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.style.display = 'block';
            setTimeout(() => {
                popup.style.opacity = '0';
                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.style.opacity = '1'; // Reset opacity for next time
                }, 500); // Wait for fade-out transition to complete (0.5s)
            }, 1000); // Fade out after 1 seconds
        });
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});




document.getElementById('chat-button').addEventListener('click', function() {
    document.getElementById('chat-box').style.display = 'flex';
    document.getElementById('chat-button').style.display = 'none';
    displayInitialMessages();
});

document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('chat-box').style.display = 'none';
    document.getElementById('chat-button').style.display = 'block';
});

document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function displayInitialMessages() {
    setTimeout(() => {
        addMessage('Hi');
    }, 500);

    setTimeout(() => {
        addMessage('How may we assist you?');
    }, 1500);
}

function sendMessage() {
    let input = document.getElementById('chat-input');
    let message = input.value.trim();
    if (message) {
        addMessage(message, 'right');
        input.value = '';
        document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').scrollHeight;
    }
}

function addMessage(text, align = '') {
    let messageContainer = document.createElement('div');
    messageContainer.className = `chat-message ${align}`;
    let messageBubble = document.createElement('div');
    messageBubble.className = `message-bubble ${align}`;
    messageBubble.textContent = text;
    messageContainer.appendChild(messageBubble);
    document.getElementById('chat-content').appendChild(messageContainer);
    document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').scrollHeight;
}
