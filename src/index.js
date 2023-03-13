import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export {
  initializeApp,
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
};
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtTZBLSxDkoQgvs3dkGBc_oxf2v5YGkaI",
  authDomain: "just-u-89aa1.firebaseapp.com",
  projectId: "just-u-89aa1",
  storageBucket: "just-u-89aa1.appspot.com",
  messagingSenderId: "587782316005",
  appId: "1:587782316005:web:04ddeab6c4245f8401d90c",
  measurementId: "G-S4R786TTX4",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRefUsers = collection(db, "users");

function updateFrontPage(user) {
  const docRefUsers = doc(db, "users", user.uid);
  const usernamePage = document.querySelectorAll(".usernameUpdate");
  const level = document.querySelector(".level");
  usernamePage.forEach((x) => {
    onSnapshot(docRefUsers, (doc) => {
      x.textContent = doc.data().username;
    });
  });
  onSnapshot(docRefUsers, (doc) => {
    level.textContent = doc.data().levels;
  });
}

// Signing users UP
if (document.querySelector(".signup") == null) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      console.log("User Signed In");
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      console.log("User Signed Out");
      // ...
    }
    updateFrontPage(user);
  });

  document.querySelectorAll(".taskbox").forEach((task) => {
    task.addEventListener("change", () => {
      console.log("Task Completed");

      document.querySelector(".tasksLeft").textContent -= 1;
      document.querySelector(".tasksLeft1").textContent -= 1;
    });
  });
} else {
  const signUpForm = document.querySelector(".signup");
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signUpForm.email.value;
    const pass = signUpForm.password.value;
    const username = signUpForm.username.value;
    createUserWithEmailAndPassword(auth, email, pass)
      .then((cred) => {
        console.log("user created: ", cred.user);
        setDoc(doc(db, "users", cred.user.uid), {
          email: email,
          username: username,
          levels: 0,
          previousDayTaskDone: true,
          tasksDone: 0,
        });
        console.log("Document Created");
        window.location.assign("../dist/front.html");
      })
      .then(() => {
        signUpForm.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  const loginForm = document.querySelector(".signin");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Clicked");
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("User signed in: ", cred.user);
        window.localStorage.setItem("userId", cred);
        window.location.assign("../dist/front.html");
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}

//Handle Account Status

console.log(auth.currentUser);
