
// salva_visibilita.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

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
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Devi effettuare il login per accedere al manager.");
    window.location.href = "login.html";
  }
});

export async function salvaVisibilita(moduli) {
  try {
    await setDoc(doc(db, "configurazione", "moduli"), moduli);
    alert("Impostazioni salvate correttamente su Firestore.");
  } catch (e) {
    console.error("Errore nel salvataggio:", e);
    alert("Errore nel salvataggio delle impostazioni.");
  }
}

