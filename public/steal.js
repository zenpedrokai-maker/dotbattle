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


function cicloStealPower(){

    aparecerStealPower();

    // FICA VISÍVEL 8s
    setTimeout(() => {

        stealPower.style.display = "none";

        // ESPERA 15s PRA VOLTAR
        setTimeout(() => {

            cicloStealPower();

        }, 15000);

    }, 8000);

}

// COMEÇAR CICLO
cicloStealPower();

function verificarStealPlayers(){

    if(
        stealMode1 &&
        Math.abs(p1.x - p2.x) < 25 &&
        Math.abs(p1.y - p2.y) < 25
    ){
        roubarTudo(1, 2);
    }

    if(
        stealMode1 &&
        Math.abs(p1.x - p3.x) < 25 &&
        Math.abs(p1.y - p3.y) < 25
    ){
        roubarTudo(1, 3);
    }

    if(
        stealMode1 &&
        Math.abs(p1.x - p4.x) < 25 &&
        Math.abs(p1.y - p4.y) < 25
    ){
        roubarTudo(1, 4);
    }
	
	if(
    stealMode2 &&
    Math.abs(p2.x - p1.x) < 25 &&
    Math.abs(p2.y - p1.y) < 25
){
    roubarTudo(2, 1);
}

if(
    stealMode2 &&
    Math.abs(p2.x - p3.x) < 25 &&
    Math.abs(p2.y - p3.y) < 25
){
    roubarTudo(2, 3);
}

if(
    stealMode2 &&
    Math.abs(p2.x - p4.x) < 25 &&
    Math.abs(p2.y - p4.y) < 25
){
    roubarTudo(2, 4);
}

if(
    stealMode3 &&
    Math.abs(p3.x - p1.x) < 25 &&
    Math.abs(p3.y - p1.y) < 25
){
    roubarTudo(3, 1);
}

if(
    stealMode3 &&
    Math.abs(p3.x - p2.x) < 25 &&
    Math.abs(p3.y - p2.y) < 25
){
    roubarTudo(3, 2);
}

if(
    stealMode3 &&
    Math.abs(p3.x - p4.x) < 25 &&
    Math.abs(p3.y - p4.y) < 25
){
    roubarTudo(3, 4);
}

if(
    stealMode4 &&
    Math.abs(p4.x - p1.x) < 25 &&
    Math.abs(p4.y - p1.y) < 25
){
    roubarTudo(4, 1);
}

if(
    stealMode4 &&
    Math.abs(p4.x - p2.x) < 25 &&
    Math.abs(p4.y - p2.y) < 25
){
    roubarTudo(4, 2);
}

if(
    stealMode4 &&
    Math.abs(p4.x - p3.x) < 25 &&
    Math.abs(p4.y - p3.y) < 25
){
    roubarTudo(4, 3);
}

    // faça igual para player2, player3 e player4
}

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
        Math.abs(player.x - powerX) < 45 &&
        Math.abs(player.y - powerY) < 45
    ){

        ativarStealMode(numero);

        stealPower.style.display = "none";

        console.log("PLAYER ROUBOU PONTOS:", numero);
    }

}

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

function roubarTudo(ladrao, vitima){

    let pLadrao;
    let pVitima;

    if(ladrao === 1) pLadrao = p1;
    if(ladrao === 2) pLadrao = p2;
    if(ladrao === 3) pLadrao = p3;
    if(ladrao === 4) pLadrao = p4;

    if(vitima === 1) pVitima = p1;
    if(vitima === 2) pVitima = p2;
    if(vitima === 3) pVitima = p3;
    if(vitima === 4) pVitima = p4;

    if(pVitima.pontos <= 0) return;

    pLadrao.pontos += pVitima.pontos;
    pVitima.pontos = 0;

    atualizarPlacar();

    // DESATIVA O PODER APÓS ROUBAR

    if(ladrao === 1){
        stealMode1 = false;
        player1.classList.remove("steal-mode");
    }

    if(ladrao === 2){
        stealMode2 = false;
        player2.classList.remove("steal-mode");
    }

    if(ladrao === 3){
        stealMode3 = false;
        player3.classList.remove("steal-mode");
    }

    if(ladrao === 4){
        stealMode4 = false;
        player4.classList.remove("steal-mode");
    }
}