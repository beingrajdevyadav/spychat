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