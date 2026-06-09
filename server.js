const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const QRCode = require("qrcode");
const os = require("os");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const walls = [


];

function bateuNaParede(x, y){

    for(let wall of walls){

        if(
            x < wall.x + wall.w &&
            x + 30 > wall.x &&
            y < wall.y + wall.h &&
            y + 30 > wall.y
        ){
            return true;
        }
    }

    return false;
}

app.use(express.static("public", {
    index: false
}));


app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/lobby.html");

});

let players = {};


// PEGAR IP

function getLocalIP(){

    const nets = os.networkInterfaces();

    for (const name of Object.keys(nets)) {

        for (const net of nets[name]) {

            if(net.family === "IPv4" && !net.internal){

                return net.address;
            }
        }
    }
}




// GERAR LINK

const controllerURL =
"https://dotbattle.onrender.com/controller";

app.get("/qrcode", async (req, res) => {

    try{

        const qr = await QRCode.toDataURL(controllerURL);

        res.send(qr);

    }catch(err){

        res.status(500).send("Erro QR");

    }

});


// ROTA QR CODE

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/lobby.html");
});

app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/controller", (req, res) => {
    res.sendFile(__dirname + "/public/controller.html");
});

// SOCKET

io.on("connection", (socket) => {
	
	

    console.log("Conectado:", socket.id);

    socket.on("joinGame", () => {

        if(Object.keys(players).length >= 4){
            return;
        }

        const total = Object.keys(players).length;

let posicoes = [
    { x:50, y:50 },
    { x:800, y:50 },
    { x:50, y:500 },
    { x:800, y:500 }
];

players[socket.id] = {
    x: posicoes[total].x,
    y: posicoes[total].y,
    speed: 5,
    frozen: false,
    numero: total + 1
};

socket.emit(
    "meuNumero",
    total + 1
);


        io.emit("players", players);

        io.emit(
            "playerCount",
            Object.keys(players).length
        );
    });
	
	socket.on("freezePlayer", (playerNumero) => {

    const ids = Object.keys(players);

    const playerId = ids[playerNumero - 1];

    if(!players[playerId]) return;

    players[playerId].frozen = true;

    setTimeout(() => {

        players[playerId].frozen = false;

    }, 8000);

});


		
// SPEED BOOST		
		
socket.on("speedBoost", (playerNumero) => {

    const ids = Object.keys(players);

    const playerId = ids[playerNumero - 1];

    const p = players[playerId];

    if(!p) return;

    p.speed = 12;

    console.log("BOOST ATIVADO:", playerNumero);

    setTimeout(() => {

        p.speed = 5;

        console.log("BOOST TERMINOU:", playerNumero);

    }, 8000);

});

    socket.on("move", (dir) => {
		
		const p = players[socket.id];

        if(!p) return;
		
		if(p.frozen) return;
		
		if(p.x < -30){
    p.x = 900;
}

if(p.x > 900){
    p.x = -30;
}

if(p.y < -30){
    p.y = 600;
}

if(p.y > 600){
    p.y = -30;
}

        

        const speed = p.speed;
		console.log("VELOCIDADE:", speed);

        if(dir === "up"){

    let novoY = p.y - speed;

    if(!bateuNaParede(p.x, novoY)){
        p.y = novoY;
    }
}

if(dir === "down"){

    let novoY = p.y + speed;

    if(!bateuNaParede(p.x, novoY)){
        p.y = novoY;
    }
}

if(dir === "left"){

    let novoX = p.x - speed;

    if(!bateuNaParede(novoX, p.y)){
        p.x = novoX;
    }
}

if(dir === "right"){

    let novoX = p.x + speed;

    if(!bateuNaParede(novoX, p.y)){
        p.x = novoX;
    }
}

        io.emit("players", players);
    });

    socket.on("disconnect", () => {

        delete players[socket.id];

        io.emit(
            "playerCount",
            Object.keys(players).length
        );
    });
});

// PORTA RENDER

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

});

