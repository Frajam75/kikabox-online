
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSCcLo6udOD0fJCezTNk_VgiJ8aXTjTD50Lx81fZYtJHGUp22ulBkcbncfuwbPcBw/pub?output=csv";

let listaBrani = [];

function caricaListaBrani() {
  fetch(CSV_URL)
    .then(response => response.text())
    .then(csv => {
      const righe = csv.trim().split('\n').slice(1);
      listaBrani = righe.map(riga => {
        const [titolo, artista] = riga.split(',');
        return { titolo: titolo.trim(), artista: artista.trim() };
      });

      aggiornaDatalist();
    });
}

function aggiornaDatalist() {
  const datalistTitoli = document.getElementById("datalist-titoli");
  const datalistArtisti = document.getElementById("datalist-artisti");

  const titoliUnici = [...new Set(listaBrani.map(b => b.titolo))];
  const artistiUnici = [...new Set(listaBrani.map(b => b.artista))];

  datalistTitoli.innerHTML = titoliUnici.map(t => `<option value="${t}">`).join('');
  datalistArtisti.innerHTML = artistiUnici.map(a => `<option value="${a}">`).join('');
}

function collegaCampiBidirezionali() {
  const inputTitolo = document.getElementById("titolo-ascolto");
  const inputArtista = document.getElementById("artista-ascolto");

  inputTitolo.addEventListener("input", () => {
    const trovato = listaBrani.find(b => b.titolo.toLowerCase() === inputTitolo.value.toLowerCase());
    if (trovato) {
      inputArtista.value = trovato.artista;
    }
  });

  inputArtista.addEventListener("input", () => {
    const titoli = listaBrani
      .filter(b => b.artista.toLowerCase() === inputArtista.value.toLowerCase())
      .map(b => b.titolo);

    const datalistTitoli = document.getElementById("datalist-titoli");
    datalistTitoli.innerHTML = titoli.map(t => `<option value="${t}">`).join('');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  caricaListaBrani();
  collegaCampiBidirezionali();
});
