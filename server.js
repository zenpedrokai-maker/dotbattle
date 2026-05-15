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

app.use("/public", express.static("public"));

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
"https://dotbattle.onrender.com/public/controller.html";


// ROTA QR CODE

app.get("/qrcode", async (req, res) => {

    const qr = await QRCode.toDataURL(controllerURL);

    res.send(qr);
});


// SOCKET

io.on("connection", (socket) => {

    console.log("Conectado:", socket.id);

    socket.on("joinGame", () => {

        if(Object.keys(players).length >= 4){
            return;
        }

        players[socket.id] = {
            x: 100,
            y: 100
        };

        io.emit("players", players);

        io.emit(
            "playerCount",
            Object.keys(players).length
        );
    });

    socket.on("move", (dir) => {

        const p = players[socket.id];

        if(!p) return;

        const speed = 15;

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