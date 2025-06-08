// controllo_visibilita.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

// Configurazione Firebase
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

// Recupera i moduli attivi da Firestore
async function applicaVisibilitaModuli() {
  try {
    const docRef = doc(db, "configurazione", "moduli");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const moduli = docSnap.data();

      for (const [modulo, attivo] of Object.entries(moduli)) {
        const elemento = document.getElementById(modulo);
        if (elemento) {
          elemento.style.display = attivo ? "block" : "none";
        }
      }
    } else {
      console.warn("Nessuna configurazione trovata in Firestore.");
    }
  } catch (error) {
    console.error("Errore nel recupero dei moduli da Firestore:", error);
  }
}

applicaVisibilitaModuli();
