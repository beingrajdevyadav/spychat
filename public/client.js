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
function showRegister(){
    hero.style.display = "none";
    register.style.display = "flex";
    chats.style.display = "none";
};

// show chat
function showChat(){
    hero.style.display = "none";
    register.style.display = "none";
    chats.style.display = "block";
};

// window onload
window.onload = async()=>{
    let user = JSON.parse(localStorage.getItem("spychat-user"));
    if(!user){
        showHero();
    }else{
        showChat();
        socket.emit("joinChat", user);
    };
};

// next button click
nextButton.addEventListener("click", showRegister);

// start button click
startButton.addEventListener("click", async()=>{
    const username = usernameInput.value.trim();
    if(username){
        const ip = await getIP();
        const uniqueId = `${username}_${ip}`;
        const user = {
            username, ip, uniqueId
        };
        localStorage.setItem("spychat-user", JSON.stringify(user));
        showChat();
        socket.emit("joinChat", user);
    }else{
        showHero();
    }
});