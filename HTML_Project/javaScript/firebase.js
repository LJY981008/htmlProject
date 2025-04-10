firebase.js

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIYr5xaD01ndxx0anOhCgoKRHT6rAHWnc",
  authDomain: "weeklyme-4e92d.firebaseapp.com",
  projectId: "weeklyme-4e92d",
  storageBucket: "weeklyme-4e92d.firebasestorage.app",
  messagingSenderId: "499565676750",
  appId: "1:499565676750:web:60aa159f30a4917fe6689f",
  measurementId: "G-2D8RFG5CVT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const infoData = await getDocs(collection(db, "info"));
export const commentsData = await getDocs(collection(db, "comments"));


export async function regist(id, pw, name) {
    const newUser = {
        'id': id,
        'pw': pw,
        'name': name
    };
    const addedDocRef = await addDoc(collection(db, "info"), newUser);
}