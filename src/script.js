// firebase cdn

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByDdPsmc1nKzAbPD9UWs79PlfJSuwWutQ',
  authDomain: 'riderevive-b0422.firebaseapp.com',
  projectId: 'riderevive-b0422',
  storageBucket: 'riderevive-b0422.appspot.com',
  messagingSenderId: '708356116931',
  appId: '1:708356116931:web:6e7ac129c17aa8304ced76',
  measurementId: 'G-085QZPJ22J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Now you can use Firebase services like authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

let cart = document.getElementById('icon');

function func() {
  window.open('cart.html', '_blank');
}

// signup form

let signupForm = document.querySelector('.signup');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    if (!email || !password) {
      alert('Enter the fields first');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          const docData = {
            email,
            password,
          };
          await setDoc(doc(db, 'users', user.uid), docData);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error occured signing up');
          // ..
        });
    }
  });
}

// login form

let loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let email = e.target.email.value;
  let password = e.target.password.value;
  if ((email, password)) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, 'loggedin');

        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('id', user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error');
      });
  } else {
    alert('Fill the fields ');
  }
});
