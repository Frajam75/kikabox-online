
document.getElementById('visibilityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const visibilitySettings = {};
    formData.forEach((value, key) => {
        visibilitySettings[key] = true;
    });

    const tuttiIModuli = ['ascolto', 'karaoke', 'chat', 'voti', 'suggerimenti', 'annunci', 'pagina_visibile'];
    tuttiIModuli.forEach(modulo => {
        if (!visibilitySettings[modulo]) {
            visibilitySettings[modulo] = false;
        }
    });

    fetch('https://script.google.com/macros/s/AKfycbyT5LPQryhmB_ZknfXPM3NUxlm3yb9m1g08nNmDUGSGRzx-D17UEiWwYG-urPNgYfkqMg/exec', {
        method: 'POST',
        body: JSON.stringify({ tipo: 'visibilita', dati: visibilitySettings })
    }).then(() => {
        document.getElementById('salvataggioStatus').innerText = "Impostazioni salvate con successo!";
    }).catch(() => {
        document.getElementById('salvataggioStatus').innerText = "Errore nel salvataggio.";
    });
});
