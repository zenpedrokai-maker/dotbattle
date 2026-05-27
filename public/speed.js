// =========================
// POWER SPEED
// =========================


// CRIAR POWER

const speedPower = document.createElement("div");

speedPower.classList.add("speed-power");

game.appendChild(speedPower);


// APARECER POWER

function aparecerSpeedPower(){

    const randomX = Math.random() * (gameWidth - 40);
    const randomY = Math.random() * (gameHeight - 40);

    speedPower.style.left = randomX + "px";
    speedPower.style.top = randomY + "px";

    speedPower.style.display = "block";
}


// ESCONDER POWER

function esconderSpeedPower(){

    speedPower.style.display = "none";

}


// PRIMEIRA APARIÇÃO

aparecerSpeedPower();


// SUMIR APÓS 8 SEGUNDOS

setInterval(() => {

    esconderSpeedPower();

}, 8000);


// REAPARECER A CADA 15 SEGUNDOS

setInterval(() => {

    if(speedPower.style.display === "none"){

        aparecerSpeedPower();

    }

}, 15000);


// VERIFICAR COLISÃO COM POWER

function verificarPowerSpeed(){

    if(speedPower.style.display === "none"){
        return;
    }

    const powerX = parseFloat(speedPower.style.left);
    const powerY = parseFloat(speedPower.style.top);


    // PLAYER 1

    if(
        Math.abs(p1.x - powerX) < 30 &&
        Math.abs(p1.y - powerY) < 30
    ){

        ativarSpeed();

        esconderSpeedPower();
    }


    // PLAYER 2

    if(
        Math.abs(p2.x - powerX) < 30 &&
        Math.abs(p2.y - powerY) < 30
    ){

        ativarSpeed();

        esconderSpeedPower();
    }


    // PLAYER 3

    if(
        Math.abs(p3.x - powerX) < 30 &&
        Math.abs(p3.y - powerY) < 30
    ){

        ativarSpeed();

        esconderSpeedPower();
    }


    // PLAYER 4

    if(
        Math.abs(p4.x - powerX) < 30 &&
        Math.abs(p4.y - powerY) < 30
    ){

        ativarSpeed();

        esconderSpeedPower();
    }

}


// ATIVAR SPEED

function ativarSpeed(){

    console.log("PEGOU SPEED");

    socket.emit("speedBoost");

}