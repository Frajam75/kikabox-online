import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

// 🔐 Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAd86VRjAKDRO35FmkIBpezjWNjjyt1k-Y",
  authDomain: "kikabox-7a71b.firebaseapp.com",
  projectId: "kikabox-7a71b",
  storageBucket: "kikabox-7a71b.appspot.com",
  messagingSenderId: "921138873322",
  appId: "1:921138873322:web:148bad4db454d57bbaa893",
  measurementId: "G-V27WV50TBE"
};

// 🔄 Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 👤 Autenticazione automatica (modificabile con login form se serve)
signInWithEmailAndPassword(auth, "admin@kikabox.it", "password123")
  .then(() => console.log("Accesso effettuato"))
  .catch((error) => console.error("Errore di accesso:", error));

// 📦 Salva configurazione
document.getElementById("salvaBtn").addEventListener("click", async () => {
  const moduli = ["ascolto", "karaoke", "voti", "suggerimenti", "chat", "annunci"];
  const visibilita = {};

  moduli.forEach(modulo => {
    visibilita[modulo] = document.getElementById(modulo).checked;
  });

  try {
    await setDoc(doc(db, "configurazione", "moduli"), visibilita);
    alert("Configurazione salvata con successo.");
  } catch (e) {
    console.error("Errore nel salvataggio:", e);
    alert("Errore durante il salvataggio.");
  }
});

// ✅ Carica configurazione esistente
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "configurazione", "moduli");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dati = docSnap.data();
      Object.keys(dati).forEach(modulo => {
        const checkbox = document.getElementById(modulo);
        if (checkbox) checkbox.checked = dati[modulo];
      });
    }
  }
});
