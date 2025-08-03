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
}

// show chat
function showChat(){
    hero.style.display = "none";
    register.style.display = "none";
    chats.style.display = "block";
}