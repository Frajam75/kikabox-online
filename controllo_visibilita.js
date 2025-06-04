document.addEventListener("DOMContentLoaded", () => {
  const STATO_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7XBUd9XhYP--6iywxL9j6ikr_9uazrJm5NWuH2AkZTzoiNlUY-77ie5hI8vwnlkjZPKx8lQM7Nhkm/pub?gid=1906824384&single=true&output=csv";

  fetch(STATO_URL)
    .then(response => response.text())
    .then(data => {
      const stato = data.split("\n")[1]?.trim().toLowerCase();
      if (stato !== "attivo") {
        document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;font-size:24px;text-align:center;padding:1em;'>⛔ Il jukebox è attualmente non disponibile. Torna durante la serata!</div>";
        throw new Error("Sito non attivo");
      }
    })
    .catch(error => console.error("Controllo stato fallito:", error));
});