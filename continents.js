document.addEventListener("DOMContentLoaded", () => {
  fetch("data.csv")
    .then((res) => res.text())
    .then((text) => {
      const lignes = text.trim().split("\n");
      const data = lignes.slice(1).map((ligne) => {
        const champs = ligne.split(",");
        return {
          jeu: champs[0],
          equipe: champs[1],
          continent: champs[2],
          region: champs[3],
          joueur: champs[4],
          pays: champs[5],
          gains: champs[6],
          logo: champs[7] ? champs[7].trim() : null
        };
      });

      const continents = [...new Set(data.map((d) => d.continent).filter(Boolean))];
      const liste = document.getElementById("liste-continents");

      continents.forEach((continent) => {
        const li = document.createElement("li");
        li.classList.add("continent-item");

        const btn = document.createElement("button");
        btn.textContent = continent;
        btn.classList.add("continent-btn");

        btn.addEventListener("click", () => {
          const equipes = data
            .filter((d) => d.continent === continent)
            .map((d) => ({ equipe: d.equipe, logo: d.logo }))
            .filter((e, i, self) => e.equipe && self.findIndex(x => x.equipe === e.equipe) === i);

          const result = document.getElementById("equipes-par-continent");
          result.innerHTML = `<h3>Équipes eSport en ${continent}</h3>`;

          if (equipes.length === 0) {
            result.innerHTML += "<p>Aucune équipe trouvée pour ce continent.</p>";
            return;
          }

          const ul = document.createElement("ul");
          equipes.forEach(({ equipe, logo }) => {
            const liEquipe = document.createElement("li");
            liEquipe.style.display = "flex";
            liEquipe.style.alignItems = "center";
            liEquipe.style.marginBottom = "10px";

            if (logo) {
              const img = document.createElement("img");
              img.src = `logos/${logo}`;
              img.alt = equipe;
              img.classList.add("logo");
              liEquipe.appendChild(img);
            }

            const span = document.createElement("span");
            span.textContent = equipe;
            liEquipe.appendChild(span);

            ul.appendChild(liEquipe);
          });

          result.appendChild(ul);
        });

        li.appendChild(btn);
        liste.appendChild(li);
      });
    })
    .catch(err => console.error("Erreur chargement CSV:", err));
});
