// no tiene uso este archivo


// Import the functions you need from the SDKs you need
const firebase = require("firebase")

const firebaseConfig = {
  apiKey: "AIzaSyCX6QwX6pv3lhx_4ez83SgvmEO68w577L4",
  authDomain: "proyecto-back-front-3eac3.firebaseapp.com",
  projectId: "proyecto-back-front-3eac3",
  storageBucket: "proyecto-back-front-3eac3.appspot.com",
  messagingSenderId: "819191299582",
  appId: "1:819191299582:web:85e140fa62ba25603b94af"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = deb.collection('Users') // nombre de la colección


module.exports = User //nombre de variable donde guardas la colección