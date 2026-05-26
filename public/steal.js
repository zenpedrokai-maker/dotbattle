// POWER STEAL

const stealPower = document.createElement("div");

stealPower.classList.add("steal-power");

stealPower.style.background = "orange";

stealPower.style.boxShadow = `
0 0 10px orange,
0 0 20px gold,
0 0 40px orange
`;

game.appendChild(stealPower);


// POSIÇÃO ALEATÓRIA

function aparecerStealPower(){

    const randomX = Math.random() * 820;
    const randomY = Math.random() * 520;

    stealPower.style.left = randomX + "px";
    stealPower.style.top = randomY + "px";

    stealPower.style.display = "block";
}


// PRIMEIRA VEZ

aparecerStealPower();


// SUMIR

setInterval(() => {

    stealPower.style.display = "none";

}, 15000);


// REAPARECER

setInterval(() => {

    if(stealPower.style.display === "none"){

        aparecerStealPower();

    }

}, 8000);


// VERIFICAR COLISÃO

function verificarStealPower(){

    if(stealPower.style.display === "none"){
        return;
    }

    const powerX = parseFloat(stealPower.style.left);
    const powerY = parseFloat(stealPower.style.top);

    verificarRoubo(p1, 1, powerX, powerY);
    verificarRoubo(p2, 2, powerX, powerY);
    verificarRoubo(p3, 3, powerX, powerY);
    verificarRoubo(p4, 4, powerX, powerY);
}


// ROUBAR PONTOS

function verificarRoubo(player, numero, powerX, powerY){

    if(
    Math.abs(p1.x - powerX) < 45 &&
    Math.abs(p1.y - powerY) < 45
){

        roubarPontos(numero);

        stealPower.style.display = "none";
    }

}


function roubarPontos(playerNumero){

    let jogadorAtual;

    if(playerNumero === 1) jogadorAtual = p1;
    if(playerNumero === 2) jogadorAtual = p2;
    if(playerNumero === 3) jogadorAtual = p3;
    if(playerNumero === 4) jogadorAtual = p4;

    const jogadores = [p1, p2, p3, p4];

    jogadores.forEach((jogador) => {

        if(jogador !== jogadorAtual && jogador.pontos > 0){

            jogador.pontos -= 3;

            jogadorAtual.pontos += 3;
        }

    });

    atualizarPlacar();
}


// ATUALIZAR PLACAR

function atualizarPlacar(){

    score1.innerText = p1.pontos;
    score2.innerText = p2.pontos;
    score3.innerText = p3.pontos;
    score4.innerText = p4.pontos;
}