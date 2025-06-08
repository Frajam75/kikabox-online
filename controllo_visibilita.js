// Inizializzazione Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd86VRjAKDRO35FmkIBpezjWNjjyt1k-Y",
  authDomain: "kikabox-7a71b.firebaseapp.com",
  projectId: "kikabox-7a71b",
  storageBucket: "kikabox-7a71b.appspot.com",
  messagingSenderId: "921138873322",
  appId: "1:921138873322:web:148bad4db454d57bbaa893",
  measurementId: "G-V27WV50TBE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funzione per applicare la visibilità ai moduli
async function applicaVisibilita() {
  try {
    const docRef = doc(db, "visibilita", "moduli");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      for (const [modulo, visibile] of Object.entries(data)) {
        const elemento = document.getElementById(modulo);
        if (elemento) {
          elemento.style.display = visibile ? "block" : "none";
        }
      }
    } else {
      console.error("Nessun documento trovato in Firestore.");
    }
  } catch (error) {
    console.error("Errore nel recuperare la visibilità:", error);
  }
}

// Avvio all'apertura della pagina
document.addEventListener("DOMContentLoaded", applicaVisibilita);
