// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, Firestore } from "firebase/firestore";


let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

if (Number(process.env.REACT_APP_DEVELOPMENT_MODE)) {

  app = initializeApp({
    apiKey: 'API KEY',
    projectId: 'padaria-35820'
  });

  console.log(">>> DEVELOPMENT MODE")
  
  db = getFirestore();
  connectFirestoreEmulator(db, 'localhost', 8080);
  
  auth = getAuth();
  connectAuthEmulator(auth, "http://localhost:9099");

} else {

  const firebaseConfig = {
    apiKey: process.env.APP_ENV_FIREBASE_API_KEY,
    authDomain: process.env.APP_ENV_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.APP_ENV_FIREBASE_PROJECT_ID,
    storageBucket: process.env.APP_ENV_FIREBASE_STORE_BUCKET,
    messagingSenderId: process.env.APP_ENV_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.APP_ENV_FIREBASE_APP_ID
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
