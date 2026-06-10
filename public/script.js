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

// VELOCIDADES

let speed1 = 5;
let speed2 = 5;
let speed3 = 5;
let speed4 = 5;

// SONS

const somKill = new Audio("kill.mp3");


// POSIÇÕES


let p1 = { x: 50, y: 50, pontos: 0 };
let p2 = { x: 800, y: 50, pontos: 0 };
let p3 = { x: 50, y: 500, pontos: 0 };
let p4 = { x: 800, y: 500, pontos: 0 };

//STEAL MODE

let stealMode1 = false;
let stealMode2 = false;
let stealMode3 = false;
let stealMode4 = false;


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

// tamanho do mapa
const gameWidth = 900;
const gameHeight = 600;


// BOLINHAS


for(let i = 0; i < 20; i++){

    const dot = document.createElement("div");

    dot.classList.add("dot");

    const randomX = Math.random() * (gameWidth - 20);
const randomY = Math.random() * (gameHeight - 20);

    dot.style.left = randomX + "px";
    dot.style.top = randomY + "px";

    game.appendChild(dot);
}


// POWER-UP VELOCIDADE

const speedPower = document.createElement("div");

speedPower.classList.add("speed-power");

game.appendChild(speedPower);

// POWER KILL

const killPower = document.createElement("div");

killPower.classList.add("kill-power");



game.appendChild(killPower);


// POSIÇÃO ALEATÓRIA

function aparecerKillPower(){

 const randomX = Math.random() * (gameWidth - 40);
const randomY = Math.random() * (gameHeight - 40);

    killPower.style.left = randomX + "px";
    killPower.style.top = randomY + "px";

    killPower.style.display = "block";
}

// SUMIR APÓS 8 SEGUNDOS

setTimeout(() => {

    killPower.style.display = "none";

}, 8000);

aparecerKillPower();


// REAPARECER

setInterval(() => {

    if(killPower.style.display === "none"){

        aparecerKillPower();

    }

}, 15000);


// FUNÇÃO PARA GERAR POSIÇÃO ALEATÓRIA

function aparecerPowerUp(){

const randomX = Math.random() * (gameWidth - 40);
const randomY = Math.random() * (gameHeight - 40);

    speedPower.style.left = randomX + "px";
    speedPower.style.top = randomY + "px";

    speedPower.style.display = "block";
	
}

// SUMIR APÓS 8 SEGUNDOS

setTimeout(() => {

    speedPower.style.display = "none";

}, 8000);




// PRIMEIRA APARIÇÃO

aparecerPowerUp();


// REAPARECER A CADA 15 SEGUNDOS

setInterval(() => {

    // só reaparece se estiver escondido
    if(speedPower.style.display === "none"){

        aparecerPowerUp();

    }

}, 15000);




// ATUALIZAR JOGADORES


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

// LIMITAR MAPA


function limitarMapa(player){

    // esquerda -> direita
    if(player.x < -30){
        player.x = gameWidth;
    }

    // direita -> esquerda
    if(player.x > gameWidth){
        player.x = -30;
    }

    // topo -> baixo
    if(player.y < -30){
        player.y = gameHeight;
    }

    // baixo -> topo
    if(player.y > gameHeight){
        player.y = -30;
    }
}


// COLISÃO


function verificarColisao(playerElement, playerData, scoreElement){

    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot) => {

        const dotX = parseFloat(dot.style.left);
        const dotY = parseFloat(dot.style.top);

        const distanciaX = Math.abs(playerData.x - dotX);
        const distanciaY = Math.abs(playerData.y - dotY);

        if(distanciaX < 35 && distanciaY < 35){

            dot.remove();

            playerData.pontos++;

            scoreElement.innerText = playerData.pontos;
        }

    });
}

function verificarPlayers(){

    // PLAYER 1

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


    // PLAYER 2

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


    // PLAYER 3

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


    // PLAYER 4

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

function congelarPlayer(player){

    // PLAYER 1

    if(player === 1){

        if(frozen1) return;

        frozen1 = true;
		
		socket.emit("freezePlayer", 1);

        player1.classList.add("frozen");

        setTimeout(() => {

            frozen1 = false;

            player1.classList.remove("frozen");

        }, 8000);
    }


    // PLAYER 2

    if(player === 2){

        if(frozen2) return;

        frozen2 = true;
		
		socket.emit("freezePlayer", 2);

        player2.classList.add("frozen");

        setTimeout(() => {

            frozen2 = false;

            player2.classList.remove("frozen");

        }, 8000);
    }


    // PLAYER 3

    if(player === 3){

        if(frozen3) return;

        frozen3 = true;
		
		socket.emit("freezePlayer", 3);

        player3.classList.add("frozen");

        setTimeout(() => {

            frozen3 = false;

            player3.classList.remove("frozen");

        }, 8000);
    }


    // PLAYER 4

    if(player === 4){

        if(frozen4) return;

        frozen4 = true;
		
		socket.emit("freezePlayer", 4);

        player4.classList.add("frozen");

        setTimeout(() => {

            frozen4 = false;

            player4.classList.remove("frozen");

        }, 8000);
    }

}

// VITÓRIA


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

            mostrarRanking();

        }, 100);

}

}

//ATIVAR STEAL MODE

function ativarStealMode(player){

    if(player === 1){

        stealMode1 = true;

        player1.classList.add("steal-mode");

        setTimeout(() => {

            stealMode1 = false;

            player1.classList.remove("steal-mode");

        }, 8000);
    }

    if(player === 2){

        stealMode2 = true;

        player2.classList.add("steal-mode");

        setTimeout(() => {

            stealMode2 = false;

            player2.classList.remove("steal-mode");

        }, 8000);
    }

    if(player === 3){

        stealMode3 = true;

        player3.classList.add("steal-mode");

        setTimeout(() => {

            stealMode3 = false;

            player3.classList.remove("steal-mode");

        }, 8000);
    }

    if(player === 4){

        stealMode4 = true;

        player4.classList.add("steal-mode");

        setTimeout(() => {

            stealMode4 = false;

            player4.classList.remove("steal-mode");

        }, 8000);
    }

}

// POWER-UP VELOCIDADE


function verificarPowerSpeed(){

    // se estiver escondido não verifica colisão
    if(speedPower.style.display === "none"){
        return;
    }

    const powerX = parseFloat(speedPower.style.left);
    const powerY = parseFloat(speedPower.style.top);

    // PLAYER 1

    if(
        Math.abs(p1.x - powerX) < 45 &&
        Math.abs(p1.y - powerY) < 45
    ){

        ativarSpeed(1);

        speedPower.style.display = "none";
    }

    // PLAYER 2

    if(
        Math.abs(p2.x - powerX) < 30 &&
        Math.abs(p2.y - powerY) < 30
    ){

        ativarSpeed(2);

        speedPower.style.display = "none";
    }

    // PLAYER 3

    if(
        Math.abs(p3.x - powerX) < 30 &&
        Math.abs(p3.y - powerY) < 30
    ){

        ativarSpeed(3);

        speedPower.style.display = "none";
    }

    // PLAYER 4

    if(
        Math.abs(p4.x - powerX) < 30 &&
        Math.abs(p4.y - powerY) < 30
    ){

        ativarSpeed(4);

        speedPower.style.display = "none";
    }
}

function verificarKillPower(){
	
	

    if(killPower.style.display === "none"){
        return;
    }

    const powerX = parseFloat(killPower.style.left);
    const powerY = parseFloat(killPower.style.top);


    // PLAYER 1

    if(
        Math.abs(p1.x - powerX) < 30 &&
        Math.abs(p1.y - powerY) < 30
    ){

        ativarKillMode(1);
		
		somKill.currentTime = 0;
somKill.play();

        killPower.style.display = "none";
    }


    // PLAYER 2

    if(
        Math.abs(p2.x - powerX) < 30 &&
        Math.abs(p2.y - powerY) < 30
    ){

        ativarKillMode(2);
		
		somKill.currentTime = 0;
somKill.play();

        killPower.style.display = "none";
    }


    // PLAYER 3

    if(
        Math.abs(p3.x - powerX) < 30 &&
        Math.abs(p3.y - powerY) < 30
    ){

        ativarKillMode(3);
		
		somKill.currentTime = 0;
somKill.play();

        killPower.style.display = "none";
    }


    // PLAYER 4

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

function ativarSpeed(player){

    console.log("PLAYER PEGOU SPEED");
	socket.emit("speedBoost", player);

    // PLAYER 1
    if(player === 1){

        speed1 = 7.5; // +50%

        player1.classList.add("speed-mode");

        setTimeout(() => {

            speed1 = 5;

            player1.classList.remove("speed-mode");

        }, 8000);
    }

    // PLAYER 2
    if(player === 2){

        speed2 = 7.5;

        player2.classList.add("speed-mode");

        setTimeout(() => {

            speed2 = 5;

            player2.classList.remove("speed-mode");

        }, 8000);
    }

    // PLAYER 3
    if(player === 3){

        speed3 = 7.5;

        player3.classList.add("speed-mode");

        setTimeout(() => {

            speed3 = 5;

            player3.classList.remove("speed-mode");

        }, 8000);
    }

    // PLAYER 4
    if(player === 4){

        speed4 = 7.5;

        player4.classList.add("speed-mode");

        setTimeout(() => {

            speed4 = 5;

            player4.classList.remove("speed-mode");

        }, 8000);
    }

}

const socket = io();



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
	
	
limitarMapa(p1);
limitarMapa(p2);
limitarMapa(p3);
limitarMapa(p4);



    atualizarJogadores();

    // COLISÕES
    verificarColisao(player1, p1, score1);
    verificarColisao(player2, p2, score2);
    verificarColisao(player3, p3, score3);
    verificarColisao(player4, p4, score4);

 verificarPowerSpeed();
verificarKillPower();

if(typeof verificarStealPower === "function"){
    verificarStealPower();
}

if(typeof verificarStealPlayers === "function"){
    verificarStealPlayers();
}

verificarPlayers();
verificarVitoria();

});
