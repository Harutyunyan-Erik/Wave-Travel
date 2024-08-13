import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setDoc, getDocs, doc, getDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGimK9pe1t51qOSpOEXqM4gyn-mm9Wgxk",
    authDomain: "wavetravel-80098.firebaseapp.com",
    projectId: "wavetravel-80098",
    storageBucket: "wavetravel-80098.appspot.com",
    messagingSenderId: "829298066006",
    appId: "1:829298066006:web:2afece04372b857d4471f7",
    measurementId: "G-D2JZWSPNEW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 


export {
    app, auth, db, getFirestore, setDoc, getDocs, doc, getDoc, collection, onAuthStateChanged
}
