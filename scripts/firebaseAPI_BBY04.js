//---------------------------------------
//---------------------------------------
// Your web app's Firebase configuration
//---------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyAfVSBReObbl0g6_hHhfqbVMfZQT829vgw",
  authDomain: "bby04-ed8d8.firebaseapp.com",
  projectId: "bby04-ed8d8",
  storageBucket: "bby04-ed8d8.appspot.com",
  messagingSenderId: "759882351704",
  appId: "1:759882351704:web:988fa4dc13e7d02212b62d",
  measurementId: "G-BLCG5V0Z3T",
};
//-------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//-------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
