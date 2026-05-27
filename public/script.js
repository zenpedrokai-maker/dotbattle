// ELEMENTOS

const game = document.getElementById("game");

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player3 = document.getElementById("player3");
const player4 = document.getElementById("player4");

const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const score3 = document.getElementById("score3");
const score4 = document.getElementById("score4");

const walls = document.querySelectorAll(".wall");


// SONS

const somKill = new Audio("kill.mp3");


// POSIÇÕES

let p1 = { x: 50, y: 50, pontos: 0 };
let p2 = { x: 800, y: 50, pontos: 0 };
let p3 = { x: 50, y: 500, pontos: 0 };
let p4 = { x: 800, y: 500, pontos: 0 };


// SOCKET

const socket = io();


// KILL MODE

let killMode1 = false;
let killMode2 = false;
let killMode3 = false;
let killMode4 = false;


// PLAYERS CONGELADOS

let frozen1 = false;
let frozen2 = false;
let frozen3 = false;
let frozen4 = false;


// TAMANHO MAPA

const gameWidth = 900;
const gameHeight = 600;


// BOLINHAS

for(let i = 0; i < 100; i++){

    const dot = document.createElement("div");

    dot.classList.add("dot");

    const randomX = Math.random() * 880;
    const randomY = Math.random() * 580;

    dot.style.left = randomX + "px";
    dot.style.top = randomY + "px";

    game.appendChild(dot);
}


// =========================
// POWER KILL
// =========================

const killPower = document.createElement("div");

killPower.classList.add("kill-power");

game.appendChild(killPower);


// APARECER

function aparecerKillPower(){

    const randomX = Math.random() * (gameWidth - 40);
    const randomY = Math.random() * (gameHeight - 40);

    killPower.style.left = randomX + "px";
    killPower.style.top = randomY + "px";

    killPower.style.display = "block";
}


// PRIMEIRA VEZ

aparecerKillPower();


// SUMIR

setInterval(() => {

    killPower.style.display = "none";

}, 8000);


// REAPARECER

setInterval(() => {

    if(killPower.style.display === "none"){

        aparecerKillPower();

    }

}, 15000);


// =========================
// ATUALIZAR JOGADORES
// =========================

function atualizarJogadores(){

    player1.style.left = p1.x + "px";
    player1.style.top = p1.y + "px";

    player2.style.left = p2.x + "px";
    player2.style.top = p2.y + "px";

    player3.style.left = p3.x + "px";
    player3.style.top = p3.y + "px";

    player4.style.left = p4.x + "px";
    player4.style.top = p4.y + "px";
}


// =========================
// PAREDES
// =========================

function bateuNaParede(x, y){

    for(let wall of walls){

        const wallX = wall.offsetLeft;
        const wallY = wall.offsetTop;

        const wallW = wall.offsetWidth;
        const wallH = wall.offsetHeight;

        if(
            x < wallX + wallW &&
            x + 30 > wallX &&
            y < wallY + wallH &&
            y + 30 > wallY
        ){
            return true;
        }
    }

    return false;
}


// =========================
// LIMITAR MAPA
// =========================

function limitarMapa(player){

    if(player.x < 0){
        player.x = 0;
    }

    if(player.y < 0){
        player.y = 0;
    }

    if(player.x > gameWidth - 30){
        player.x = gameWidth - 30;
    }

    if(player.y > gameHeight - 30){
        player.y = gameHeight - 30;
    }
}


// =========================
// COLISÃO DOTS
// =========================

function verificarColisao(playerElement, playerData, scoreElement){

    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot) => {

        const dotX = parseFloat(dot.style.left);
        const dotY = parseFloat(dot.style.top);

        const distanciaX = Math.abs(playerData.x - dotX);
        const distanciaY = Math.abs(playerData.y - dotY);

        if(distanciaX < 20 && distanciaY < 20){

            dot.remove();

            playerData.pontos++;

            scoreElement.innerText = playerData.pontos;
        }

    });
}


// =========================
// VERIFICAR PLAYERS
// =========================

function verificarPlayers(){

    if(
        killMode1 &&
        Math.abs(p1.x - p2.x) < 25 &&
        Math.abs(p1.y - p2.y) < 25
    ){
        congelarPlayer(2);
    }

    if(
        killMode1 &&
        Math.abs(p1.x - p3.x) < 25 &&
        Math.abs(p1.y - p3.y) < 25
    ){
        congelarPlayer(3);
    }

    if(
        killMode1 &&
        Math.abs(p1.x - p4.x) < 25 &&
        Math.abs(p1.y - p4.y) < 25
    ){
        congelarPlayer(4);
    }


    if(
        killMode2 &&
        Math.abs(p2.x - p1.x) < 25 &&
        Math.abs(p2.y - p1.y) < 25
    ){
        congelarPlayer(1);
    }

    if(
        killMode2 &&
        Math.abs(p2.x - p3.x) < 25 &&
        Math.abs(p2.y - p3.y) < 25
    ){
        congelarPlayer(3);
    }

    if(
        killMode2 &&
        Math.abs(p2.x - p4.x) < 25 &&
        Math.abs(p2.y - p4.y) < 25
    ){
        congelarPlayer(4);
    }


    if(
        killMode3 &&
        Math.abs(p3.x - p1.x) < 25 &&
        Math.abs(p3.y - p1.y) < 25
    ){
        congelarPlayer(1);
    }

    if(
        killMode3 &&
        Math.abs(p3.x - p2.x) < 25 &&
        Math.abs(p3.y - p2.y) < 25
    ){
        congelarPlayer(2);
    }

    if(
        killMode3 &&
        Math.abs(p3.x - p4.x) < 25 &&
        Math.abs(p3.y - p4.y) < 25
    ){
        congelarPlayer(4);
    }


    if(
        killMode4 &&
        Math.abs(p4.x - p1.x) < 25 &&
        Math.abs(p4.y - p1.y) < 25
    ){
        congelarPlayer(1);
    }

    if(
        killMode4 &&
        Math.abs(p4.x - p2.x) < 25 &&
        Math.abs(p4.y - p2.y) < 25
    ){
        congelarPlayer(2);
    }

    if(
        killMode4 &&
        Math.abs(p4.x - p3.x) < 25 &&
        Math.abs(p4.y - p3.y) < 25
    ){
        congelarPlayer(3);
    }

}


// =========================
// CONGELAR
// =========================

function congelarPlayer(player){

    if(player === 1){

        if(frozen1) return;

        frozen1 = true;

        player1.classList.add("frozen");

        setTimeout(() => {

            frozen1 = false;

            player1.classList.remove("frozen");

        }, 8000);
    }


    if(player === 2){

        if(frozen2) return;

        frozen2 = true;

        player2.classList.add("frozen");

        setTimeout(() => {

            frozen2 = false;

            player2.classList.remove("frozen");

        }, 8000);
    }


    if(player === 3){

        if(frozen3) return;

        frozen3 = true;

        player3.classList.add("frozen");

        setTimeout(() => {

            frozen3 = false;

            player3.classList.remove("frozen");

        }, 8000);
    }


    if(player === 4){

        if(frozen4) return;

        frozen4 = true;

        player4.classList.add("frozen");

        setTimeout(() => {

            frozen4 = false;

            player4.classList.remove("frozen");

        }, 8000);
    }

}


// =========================
// VITÓRIA
// =========================

function verificarVitoria(){

    const dotsRestantes = document.querySelectorAll(".dot");

    if(dotsRestantes.length === 0){

        let vencedor = "EMPATE";
        let maiorPontuacao = 0;

        const jogadores = [
            { nome: "AZUL", pontos: p1.pontos },
            { nome: "VERMELHO", pontos: p2.pontos },
            { nome: "VERDE", pontos: p3.pontos },
            { nome: "AMARELO", pontos: p4.pontos }
        ];

        jogadores.forEach((jogador) => {

            if(jogador.pontos > maiorPontuacao){

                maiorPontuacao = jogador.pontos;
                vencedor = jogador.nome;
            }

        });

        setTimeout(() => {

            alert("O vencedor foi: " + vencedor);

        }, 100);

    }

}


// =========================
// VERIFICAR KILL POWER
// =========================

function verificarKillPower(){

    if(killPower.style.display === "none"){
        return;
    }

    const powerX = parseFloat(killPower.style.left);
    const powerY = parseFloat(killPower.style.top);


    if(
        Math.abs(p1.x - powerX) < 30 &&
        Math.abs(p1.y - powerY) < 30
    ){

        ativarKillMode(1);

        somKill.currentTime = 0;
        somKill.play();

        killPower.style.display = "none";
    }


    if(
        Math.abs(p2.x - powerX) < 30 &&
        Math.abs(p2.y - powerY) < 30
    ){

        ativarKillMode(2);

        somKill.currentTime = 0;
        somKill.play();

        killPower.style.display = "none";
    }


    if(
        Math.abs(p3.x - powerX) < 30 &&
        Math.abs(p3.y - powerY) < 30
    ){

        ativarKillMode(3);

        somKill.currentTime = 0;
        somKill.play();

        killPower.style.display = "none";
    }


    if(
        Math.abs(p4.x - powerX) < 30 &&
        Math.abs(p4.y - powerY) < 30
    ){

        ativarKillMode(4);

        somKill.currentTime = 0;
        somKill.play();

        killPower.style.display = "none";
    }

}


// =========================
// ATIVAR KILL
// =========================

function ativarKillMode(player){

    if(player === 1){

        killMode1 = true;

        player1.classList.add("kill-mode");

        setTimeout(() => {

            killMode1 = false;

            player1.classList.remove("kill-mode");

        }, 8000);
    }


    if(player === 2){

        killMode2 = true;

        player2.classList.add("kill-mode");

        setTimeout(() => {

            killMode2 = false;

            player2.classList.remove("kill-mode");

        }, 8000);
    }


    if(player === 3){

        killMode3 = true;

        player3.classList.add("kill-mode");

        setTimeout(() => {

            killMode3 = false;

            player3.classList.remove("kill-mode");

        }, 8000);
    }


    if(player === 4){

        killMode4 = true;

        player4.classList.add("kill-mode");

        setTimeout(() => {

            killMode4 = false;

            player4.classList.remove("kill-mode");

        }, 8000);
    }

}


// =========================
// SOCKET PLAYERS
// =========================

socket.on("players", (players) => {

    const ids = Object.keys(players);

    if(ids[0]){
        p1.x = players[ids[0]].x;
        p1.y = players[ids[0]].y;
    }

    if(ids[1]){
        p2.x = players[ids[1]].x;
        p2.y = players[ids[1]].y;
    }

    if(ids[2]){
        p3.x = players[ids[2]].x;
        p3.y = players[ids[2]].y;
    }

    if(ids[3]){
        p4.x = players[ids[3]].x;
        p4.y = players[ids[3]].y;
    }

    atualizarJogadores();

    verificarColisao(player1, p1, score1);
    verificarColisao(player2, p2, score2);
    verificarColisao(player3, p3, score3);
    verificarColisao(player4, p4, score4);

    verificarKillPower();

    verificarPlayers();

    verificarVitoria();


    // SPEED

    if(typeof verificarPowerSpeed === "function"){
        verificarPowerSpeed();
    }


    // STEAL

    if(typeof verificarStealPower === "function"){
        verificarStealPower();
    }

});