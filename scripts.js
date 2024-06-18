// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6W4hZ0NItBahd2ISkG3hnqXplphxR-zQ",
  authDomain: "gymohacom.firebaseapp.com",
  projectId: "gymohacom",
  storageBucket: "gymohacom.appspot.com",
  messagingSenderId: "413388682153",
  appId: "1:413388682153:web:b8f8825f1e0b084afb8ab8",
  measurementId: "G-KGHLMZBMH3"
};



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let username = "";

function login() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('chatPage').style.display = 'block';
        listenForMessages();
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message) {
        db.collection("messages").add({
            username: username,
            message: message,
            color: null,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('messageInput').value = '';
    }
}

function sendColor(color) {
    db.collection("messages").add({
        username: username,
        message: `${username} sent a color signal`,
        color: color,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function listenForMessages() {
    db.collection("messages")
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
            document.getElementById('messages').innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                addMessage(`${data.username}: ${data.message}`, data.color);
            });
        });
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
