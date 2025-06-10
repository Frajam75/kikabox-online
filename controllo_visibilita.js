import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd86VRjAKDRO35FmkIBpezjWNjjyt1k-Y",
  authDomain: "kikabox-7a71b.firebaseapp.com",
  projectId: "kikabox-7a71b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function applicaVisibilita() {
  const docRef = doc(db, "visibilita", "impostazioni");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    // Mostra/nasconde i moduli in base ai valori booleani
    document.getElementById("modulo-ascolto")?.classList.toggle("hidden", !data.modulo_ascolto);
    document.getElementById("modulo-karaoke")?.classList.toggle("hidden", !data.modulo_karaoke);
    document.getElementById("modulo-voti")?.classList.toggle("hidden", !data.modulo_voti);
    document.getElementById("modulo-chat")?.classList.toggle("hidden", !data.modulo_chat);
    document.getElementById("modulo-annunci")?.classList.toggle("hidden", !data.modulo_annunci);
    document.getElementById("modulo-suggerimenti")?.classList.toggle("hidden", !data.modulo_suggerimenti);

    // Se tutta la pagina deve essere nascosta
    if (!data.pagina_intera) {
      document.body.innerHTML = "<h2 style='text-align:center;'>Pagina non disponibile</h2>";
    }

  } else {
    console.error("Documento impostazioni non trovato");
  }
}

// Esegui la funzione al caricamento
applicaVisibilita();
