const socket = io();

const hero = document.getElementById("hero");
const register = document.getElementById("register");
const chats = document.getElementById("chats");

const nextButton = document.getElementById("next");
const startButton = document.getElementById("startBtn");
const usernameInput = document.getElementById("usernameInput");

const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("send-btn");
const chatsBody = document.getElementById("chats-body");

// function to get IP Address
function getIP() {
    return fetch("https://api.ipify.org?format=json")
        .then(res => res.json)
        .then(data => data.ip);
};

// show register
function showHero() {
    hero.style.display = 'block';
    register.style.display = "none";
    chats.style.display = "none";
};

// show register
function showRegister() {
    hero.style.display = "none";
    register.style.display = "flex";
    chats.style.display = "none";
};

// show chat
function showChat() {
    hero.style.display = "none";
    register.style.display = "none";
    chats.style.display = "block";
};

// window onload
window.onload = async () => {
    let user = JSON.parse(localStorage.getItem("spychat-user"));
    if (!user) {
        showHero();
    } else {
        showChat();
        socket.emit("joinChat", user);
    };
};

// next button click
nextButton.addEventListener("click", showRegister);

// start button click
startButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    if (username) {
        const ip = await getIP();
        const uniqueId = `${username}_${ip}`;
        const user = {
            username, ip, uniqueId
        };
        localStorage.setItem("spychat-user", JSON.stringify(user));
        showChat();
        socket.emit("joinChat", user);
    } else {
        showHero();
    }
});


// send button click
sendBtn.addEventListener("click", () => {
    const txt = msgInput.value.trim();
    if (txt) {
        const user = JSON.parse(localStorage.getItem("spychat-user"));
        socket.emit("message", {
            user: user,
            message: txt,
            time: new Date().toLocaleTimeString()
        });
        msgInput.value = "";
    }
});


// socket.io info
socket.on("info", (data) => {
    if (data.type === "info") {
        const p = document.createElement("p");
        p.className = "info";
        p.innerText = data.message;
        chatsBody.appendChild(p);
    }
});


// socket.io message
socket.on("message", (data) => {
    const user = JSON.parse(localStorage.getItem("spychat-user"));
    let clname = data.user.uniqueId === user.uniqueId ? "chat sent" : "chat received";
    const p = document.createElement("p");
    p.classList.add(clname);
    p.textContent = `${data.message}`;
    chatsBody.appendChild(p);
});