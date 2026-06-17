function mostrarRanking() {

    const ranking = [
    {
        nome: document.getElementById("nome1").textContent,
        pontos: p1.pontos
    },
    {
        nome: document.getElementById("nome2").textContent,
        pontos: p2.pontos
    },
    {
        nome: document.getElementById("nome3").textContent,
        pontos: p3.pontos
    },
    {
        nome: document.getElementById("nome4").textContent,
        pontos: p4.pontos
    }
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
	
	

   const itens = ranking.querySelectorAll(".rank-item");

itens.forEach((item, index) => {

    item.style.borderLeft =
    `8px solid ${jogadores[index].cor}`;

});
}