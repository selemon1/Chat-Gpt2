const chatContainer = document.getElementById('chat');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userMessage = userInput.value;
    appendMessage(userMessage, 'user');
    userInput.value = '';

    // Call the actual API for bot response
    const botMessage = await generateBotResponse(userMessage);
    appendMessage(botMessage, 'bot');
}

async function generateBotResponse(userMessage) {
    const response = await fetch('/get_response', { // Adjust the endpoint to match your server's route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_input: userMessage })
    });

    const responseData = await response.json();
    return responseData.response;
}

function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
