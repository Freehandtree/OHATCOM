let username = "";

function login() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('chatPage').style.display = 'block';
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message) {
        addMessage(`${username}: ${message}`);
        document.getElementById('messageInput').value = '';
    }
}

function sendColor(color) {
    addMessage(`${username} sent a color signal`, color);
}

function addMessage(message, color) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    if (color) {
        messageElement.style.color = color;
    }
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}
