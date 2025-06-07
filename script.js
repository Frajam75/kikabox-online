
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7XBUd9XhYP--6iywxL9j6ikr_9uazrJm5NWuH2AkZTzoiNlUY-77ie5hI8vwnlkjZPKx8lQM7Nhkm/pub?gid=276449054&single=true&output=csv";

let brani = [];

async function caricaBraniDaCSV() {
  const response = await fetch(CSV_URL);
  const text = await response.text();
  const righe = text.split("\n").slice(1); // salta intestazione

  brani = righe.map(riga => {
    const colonne = riga.split(",");
    return {
      artista: colonne[0]?.trim().toLowerCase(),
      titolo: colonne[1]?.trim().toLowerCase()
    };
  });

  popolaDatalist();
}

function popolaDatalist() {
  const artistiSet = new Set();
  const titoliSet = new Set();

  brani.forEach(b => {
    if (b.artista) artistiSet.add(capitalize(b.artista));
    if (b.titolo) titoliSet.add(capitalize(b.titolo));
  });

  const artistiDatalist = document.getElementById("artisti-lista");
  const titoliDatalist = document.getElementById("titoli-lista");

  artistiDatalist.innerHTML = "";
  titoliDatalist.innerHTML = "";

  artistiSet.forEach(artista => {
    const option = document.createElement("option");
    option.value = artista;
    artistiDatalist.appendChild(option);
  });

  titoliSet.forEach(titolo => {
    const option = document.createElement("option");
    option.value = titolo;
    titoliDatalist.appendChild(option);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ricerca inversa: se scrivi un artista, mostra solo i titoli relativi
document.getElementById("artista-ascolto").addEventListener("input", function () {
  const artistaInput = this.value.toLowerCase();
  const titoliDatalist = document.getElementById("titoli-lista");
  titoliDatalist.innerHTML = "";

  const titoli = brani
    .filter(b => b.artista.includes(artistaInput))
    .map(b => capitalize(b.titolo));

  [...new Set(titoli)].forEach(t => {
    const option = document.createElement("option");
    option.value = t;
    titoliDatalist.appendChild(option);
  });
});

// viceversa: se scrivi un titolo, mostra l'artista
document.getElementById("titolo-ascolto").addEventListener("input", function () {
  const titoloInput = this.value.toLowerCase();
  const artistiDatalist = document.getElementById("artisti-lista");
  artistiDatalist.innerHTML = "";

  const artisti = brani
    .filter(b => b.titolo.includes(titoloInput))
    .map(b => capitalize(b.artista));

  [...new Set(artisti)].forEach(a => {
    const option = document.createElement("option");
    option.value = a;
    artistiDatalist.appendChild(option);
  });
});

caricaBraniDaCSV();

