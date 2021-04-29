import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCyTxCp-PxPcZuUOsAdh2DHGvF4ZLj9sfc",
  authDomain: "chat-app-e16ab.firebaseapp.com",
  projectId: "chat-app-e16ab",
  storageBucket: "chat-app-e16ab.appspot.com",
  messagingSenderId: "868661793956",
  appId: "1:868661793956:web:7ee1e4ba06ac6c19898231",
  measurementId: "G-4Q08EFX3EF"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebaseapp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

//firebase.initializeApp(firebaseConfig);

export {auth,provider};
export default db;