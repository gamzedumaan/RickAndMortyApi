// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore, collection} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBZlX8OOGoZ87crXaNbKRj2SQjY8aYb8E',
  authDomain: 'rickandmorty-81e9c.firebaseapp.com',
  projectId: 'rickandmorty-81e9c',
  storageBucket: 'rickandmorty-81e9c.appspot.com',
  messagingSenderId: '552597589388',
  appId: '1:552597589388:web:fbf96055c4b3e379211aa9',
  measurementId: 'G-Z25F1K64PH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;
