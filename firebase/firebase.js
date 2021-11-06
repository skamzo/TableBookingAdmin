import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyArYgWehJfgRisk8FhEZ5FoqcCvoW7798I",
  
    authDomain: "tablebookingapp-389d8.firebaseapp.com",
  
    projectId: "tablebookingapp-389d8",
  
    storageBucket: "tablebookingapp-389d8.appspot.com",
  
    messagingSenderId: "106287945290",
  
    appId: "1:106287945290:web:0b2b53e8b148a12869b8b3"
  
  };

  let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app()
}

const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
