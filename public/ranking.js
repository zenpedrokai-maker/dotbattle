function mostrarRanking() {

    const jogadores = [
        { nome: "AZUL", pontos: p1.pontos, cor: "#00aaff" },
        { nome: "VERMELHO", pontos: p2.pontos, cor: "#ff3333" },
        { nome: "VERDE", pontos: p3.pontos, cor: "#00cc44" },
        { nome: "AMARELO", pontos: p4.pontos, cor: "#ffd700" }
    ];

    jogadores.sort((a, b) => b.pontos - a.pontos);

    const ranking = document.getElementById("ranking");

   ranking.innerHTML = `
    <div class="ranking-box">

        <h1>🏆 RANKING FINAL 🏆</h1>

        <h2 style="
            text-align:center;
            color:${jogadores[0].cor};
            margin-bottom:20px;
        ">
            👑 VENCEDOR: ${jogadores[0].nome}
        </h2>

    </div>
`;


const rankingBox = ranking.querySelector(".ranking-box");

jogadores.forEach((jogador, index) => {

    const medalhas = ["🥇", "🥈", "🥉", "🏅"];

    rankingBox.innerHTML += `
        <div class="rank-item">
            <span>${medalhas[index]} ${index + 1}º Lugar - ${jogador.nome}</span>
            <span>${jogador.pontos}</span>
        </div>
    `;
});



    ranking.style.display = "flex";
	
	socket.emit(
    "fimDeJogo",
    jogadores
);

   const itens = ranking.querySelectorAll(".rank-item");

itens.forEach((item, index) => {

    item.style.borderLeft =
    `8px solid ${jogadores[index].cor}`;

});
}