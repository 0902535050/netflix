// import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {

// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// export { storage };


import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1RJYwOjJDzQUxnn2m9DhTQ9tP1fWwLcw",
  authDomain: "netflix-99af9.firebaseapp.com",
  projectId: "netflix-99af9",
  storageBucket: "netflix-99af9.appspot.com",
  messagingSenderId: "45338647724",
  appId: "1:45338647724:web:6aa91c1826bb0c360ad309",
  measurementId: "G-LG793KQC81"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;