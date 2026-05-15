const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const QRCode = require("qrcode");
const os = require("os");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
"https://dotbattle.onrender.com/controller.html";


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

        if(dir === "up") p.y -= speed;
        if(dir === "down") p.y += speed;
        if(dir === "left") p.x -= speed;
        if(dir === "right") p.x += speed;

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