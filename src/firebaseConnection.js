// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwFJAYwVfU5DbWU58b-JTBNSpdG9NcHaY",
  authDomain: "buscador-de-cep-ef097.firebaseapp.com",
  databaseURL: "https://buscador-de-cep-ef097-default-rtdb.firebaseio.com",
  projectId: "buscador-de-cep-ef097",
  storageBucket: "buscador-de-cep-ef097.appspot.com",
  messagingSenderId: "70303950861",
  appId: "1:70303950861:web:ad0b008e43fab9e05f0d44",
  measurementId: "G-E6G4SM5650"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;