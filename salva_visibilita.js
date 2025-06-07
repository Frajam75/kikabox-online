function salvaVisibilita() {
  const moduli = ["ascolto", "karaoke", "chat", "voti", "suggerimenti", "annunci", "pagina_visibile"];
  const dati = {};

  moduli.forEach(modulo => {
    const checkbox = document.getElementById(modulo);
    dati[modulo] = checkbox && checkbox.checked;
  });

  fetch("https://script.google.com/macros/s/AKfycbyT5LPQryhmB_ZknfXPM3NUxlm3yb9m1g08nNmDUGSGRzx-D17UEiWwYG-urPNgYfkqMg/exec", {
    method: "POST",
    body: JSON.stringify({
      tipo: "visibilita",
      dati: dati
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.text())
    .then(data => {
      alert("Impostazioni salvate con successo!");
    })
    .catch(error => {
      console.error("Errore nel salvataggio:", error);
      alert("Errore nel salvataggio delle impostazioni.");
    });
}
