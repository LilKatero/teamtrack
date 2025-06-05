async function fetchData() {
  const response = await fetch('data.csv');
  const text = await response.text();
  const data = text.trim().split('\n').map(row => row.split(','));
  const headers = data[0];
  const rows = data.slice(1);

  const continentsDiv = document.getElementById('liste-continents');
  const joueursBody = document.querySelector('#table-joueurs tbody');
  const jeuxDiv = document.getElementById('liste-jeux');

  const continents = new Set();
  const jeux = {};

  // Map équipe => { joueurs: Set(), logo: string }
  const equipesMap = new Map();

  rows.forEach(row => {
    // En supposant que ton CSV a maintenant cette structure :
    // type, nom, pays, continent, gain, jeu, tournois, equipe, logo
    // donc on récupère en plus le logo (colonne 8)
    const [type, nom, pays, continent, gain, jeu, tournois, equipe, logo] = row;

    if (type === 'joueur') {
      // Pour l'instant tu affiches les joueurs en tableau, on va plutôt regrouper par équipe
      if (!equipesMap.has(equipe)) {
        equipesMap.set(equipe, { joueurs: new Set(), logo: logo || null });
      }
      equipesMap.get(equipe).joueurs.add(nom);
      if (!equipesMap.get(equipe).logo && logo) {
        equipesMap.get(equipe).logo = logo;
      }
    } else if (type === 'equipe') {
      continents.add(continent);
      if (!jeux[jeu]) jeux[jeu] = [];
      jeux[jeu].push(equipe);
      if (!equipesMap.has(equipe)) {
        equipesMap.set(equipe, { joueurs: new Set(), logo: logo || null });
      } else if (!equipesMap.get(equipe).logo && logo) {
        equipesMap.get(equipe).logo = logo;
      }
    }
  });

  // Affichage continents (inchangé)
  continents.forEach(continent => {
    continentsDiv.innerHTML += `<button onclick="alert('Affichage des équipes du continent ${continent}')">${continent}</button> `;
  });

  // Affichage jeux (inchangé)
  Object.keys(jeux).forEach(j => {
    jeuxDiv.innerHTML += `<h3>${j}</h3><ul>${jeux[j].map(eq => `<li>${eq}</li>`).join('')}</ul>`;
  });

  // Affichage joueurs regroupés par équipe avec logo
  joueursBody.innerHTML = ""; // Clear avant affichage
  equipesMap.forEach(({ joueurs, logo }, equipe) => {
    const imgSrc = logo ? `logos/${logo}` : "";
    joueursBody.innerHTML += `
      <tr>
        <td style="display:flex; align-items:center;">
          ${imgSrc ? `<img src="${imgSrc}" alt="${equipe}" style="width:40px; height:40px; margin-right:10px; object-fit:contain; border-radius:4px;">` : ''}
          <span>${equipe}</span>
        </td>
        <td>${Array.from(joueurs).join(', ')}</td>
      </tr>
    `;
  });
}

window.onload = fetchData;
