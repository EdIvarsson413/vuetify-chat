import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDH5bK2D1P40vFo3-aMhrFQVmkCMyuK1AU",
    authDomain: "vuetify-chat-6eb72.firebaseapp.com",
    projectId: "vuetify-chat-6eb72",
    storageBucket: "vuetify-chat-6eb72.appspot.com",
    messagingSenderId: "861130851631",
    appId: "1:861130851631:web:965133d2507e83fbab8dda"
};

// Inicializar Firebase con los sevicios requeridos
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };