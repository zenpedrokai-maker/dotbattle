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

            <div class="rank-item">
                <span>🥇 1º Lugar - ${jogadores[0].nome}</span>
                <span>${jogadores[0].pontos}</span>
            </div>

            <div class="rank-item">
                <span>🥈 2º Lugar - ${jogadores[1].nome}</span>
                <span>${jogadores[1].pontos}</span>
            </div>

            <div class="rank-item">
                <span>🥉 3º Lugar - ${jogadores[2].nome}</span>
                <span>${jogadores[2].pontos}</span>
            </div>

            <div class="rank-item">
                <span>🏅 4º Lugar - ${jogadores[3].nome}</span>
                <span>${jogadores[3].pontos}</span>
            </div>

        </div>

    `;

    ranking.style.display = "flex";

    const itens = ranking.querySelectorAll(".rank-item");

    itens[0].style.borderLeft = `8px solid ${jogadores[0].cor}`;
    itens[1].style.borderLeft = `8px solid ${jogadores[1].cor}`;
    itens[2].style.borderLeft = `8px solid ${jogadores[2].cor}`;
    itens[3].style.borderLeft = `8px solid ${jogadores[3].cor}`;
}