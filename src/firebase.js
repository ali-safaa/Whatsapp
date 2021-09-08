import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCBds0LgF2BP5EPtRBei3syLylULC3FNtQ",
    authDomain: "whatsapp-clone-14b8d.firebaseapp.com",
    projectId: "whatsapp-clone-14b8d",
    storageBucket: "whatsapp-clone-14b8d.appspot.com",
    messagingSenderId: "674534535799",
    appId: "1:674534535799:web:41b2578a761cd28ee44c72",
    measurementId: "G-3FYLY302GR"
  };

  const firebaseApp  = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;