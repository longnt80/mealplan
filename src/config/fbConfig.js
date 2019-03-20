import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCjKTLpNXpQJMiIk93fajALP1GD_WA_Y_c",
  authDomain: "mealplan-f2223.firebaseapp.com",
  databaseURL: "https://mealplan-f2223.firebaseio.com",
  projectId: "mealplan-f2223",
  storageBucket: "mealplan-f2223.appspot.com",
  messagingSenderId: "696955285901"
};
firebase.initializeApp(config);
// firebase.firestore();
// firebase.auth();

export default firebase;
