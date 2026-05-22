const stealPower = document.createElement("div");

stealPower.classList.add("speed-power");

stealPower.style.background = "orange";

stealPower.style.boxShadow = `
0 0 10px orange,
0 0 20px yellow,
0 0 40px orange
`;

game.appendChild(stealPower);


// APARECER

function aparecerStealPower(){

    const randomX = Math.random() * 850;
    const randomY = Math.random() * 550;

    stealPower.style.left = randomX + "px";
    stealPower.style.top = randomY + "px";

    stealPower.style.display = "block";
}


// PRIMEIRA VEZ

aparecerStealPower();


// SUMIR

setTimeout(() => {

    stealPower.style.display = "none";

}, 8000);


// REAPARECER

setInterval(() => {

    if(stealPower.style.display === "none"){

        aparecerStealPower();

    }

}, 15000);


// VERIFICAR COLISÃO

function verificarStealPower(){

    if(stealPower.style.display === "none"){
        return;
    }

    const powerX = parseFloat(stealPower.style.left);
    const powerY = parseFloat(stealPower.style.top);


    verificarRoubo(p1, p2, score1, score2);
    verificarRoubo(p2, p1, score2, score1);
    verificarRoubo(p3, p4, score3, score4);
    verificarRoubo(p4, p3, score4, score3);


    function verificarRoubo(jogador, inimigo, placarJogador, placarInimigo){

        if(
            Math.abs(jogador.x - powerX) < 30 &&
            Math.abs(jogador.y - powerY) < 30
        ){

            if(inimigo.pontos > 0){

                inimigo.pontos--;
                jogador.pontos++;

                placarJogador.innerText = jogador.pontos;
                placarInimigo.innerText = inimigo.pontos;
            }

            stealPower.style.display = "none";
        }
    }
}