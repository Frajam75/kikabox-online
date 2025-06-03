
document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7XBUd9XhYP--6iywxL9j6ikr_9uazrJm5NWuH2AkZTzoiNlUY-77ie5hI8vwnlkjZPKx8lQM7Nhkm/pub?output=csv";
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyT5LPQryhmB_ZknfXPM3NUxlm3yb9m1g08nNmDUGSGRzx-D17UEiWwYG-urPNgYfkqMg/exec";

  let brani = [];

  fetch(CSV_URL)
    .then(res => res.text())
    .then(data => {
      const rows = data.split("\n").slice(1).map(r => r.split(","));
      brani = rows.filter(r => r.length >= 2);

      const artistiSet = new Set();
      const titoliSet = new Set();

      const artistaInput = document.getElementById("artistaInput");
      const titoloInput = document.getElementById("titoloInput");

      const artistiDatalist = document.getElementById("artistiSuggeriti");
      const titoliDatalist = document.getElementById("titoliSuggeriti");

      brani.forEach(([artista, titolo]) => {
        if (artista && titolo) {
          artistiSet.add(artista.trim());
          titoliSet.add(titolo.trim());
        }
      });

      artistiSet.forEach(artista => {
        let opt = document.createElement("option");
        opt.value = artista;
        artistiDatalist.appendChild(opt);
      });

      titoliSet.forEach(titolo => {
        let opt = document.createElement("option");
        opt.value = titolo;
        titoliDatalist.appendChild(opt);
      });

      artistaInput.addEventListener("input", () => {
        const val = artistaInput.value.toLowerCase();
        const corrispondenti = brani.filter(([artista]) => artista.toLowerCase().includes(val)).map(([_, titolo]) => titolo);
        updateDatalist(titoliDatalist, [...new Set(corrispondenti)]);
      });

      titoloInput.addEventListener("input", () => {
        const val = titoloInput.value.toLowerCase();
        const corrispondenti = brani.filter(([_, titolo]) => titolo.toLowerCase().includes(val)).map(([artista]) => artista);
        updateDatalist(artistiDatalist, [...new Set(corrispondenti)]);
      });
    });

  function updateDatalist(datalist, values) {
    while (datalist.firstChild) datalist.removeChild(datalist.firstChild);
    values.forEach(v => {
      let opt = document.createElement("option");
      opt.value = v;
      datalist.appendChild(opt);
    });
  }

  document.getElementById("inviaAscolto").addEventListener("click", () => {
    const artista = document.getElementById("artistaInput").value;
    const titolo = document.getElementById("titoloInput").value;
    const dedica = document.getElementById("dedica").value;
    const nome = document.getElementById("nomeRichiedenteAscolto").value;
    fetch(WEBHOOK_URL, {
      method: "POST",
      body: new URLSearchParams({
        tipo: "ascolto",
        artista, titolo, dedica, nome,
        data: new Date().toLocaleString()
      })
    }).then(() => alert("Richiesta inviata!"));
  });
});
