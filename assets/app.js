let playersData = [];

fetch("api/players.php")
.then(res => res.json())
.then(data => {
    playersData = data;
    render(data);
});

function render(data) {
    let html = "";

    data.forEach(p => {
        html += `
        <div class="card">
            <h2>${p.name}</h2>

            <p>🎮 Alias : ${p.name}</p>
            <p>👤 Prénom : ${p.first_name ?? "Unknown"}</p>
            <p>👤 Nom : ${p.last_name ?? "Unknown"}</p>

            <p>🌍 Pays : ${p.nationality ?? "Unknown"}</p>

            <p>🎮 Jeu : ${p.current_videogame?.name ?? "Unknown"}</p>
</a>
        </div>
        `;
    });

    document.getElementById("players").innerHTML = html;
}


document.getElementById("search").addEventListener("input", e => {
    const v = e.target.value.toLowerCase();

    render(playersData.filter(p =>
        p.name.toLowerCase().includes(v)
    ));
});