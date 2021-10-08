// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: 'AIzaSyDvzgnSQnO1aVPBLCaA8nU0Bx_Jwmas9Xo',
  authDomain: 'tcl-33-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-33-smart-shopping-list',
  storageBucket: 'tcl-33-smart-shopping-list.appspot.com',
  messagingSenderId: '863557216637',
  appId: '1:863557216637:web:d3e5b61342ab5b1df20414',
};

const firebaseInstance = firebase.initializeApp(firebaseConfig);
const db = firebaseInstance.firestore();

export { db };
