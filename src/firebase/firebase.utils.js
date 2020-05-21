import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCx-co7xXqvdiAI6-rBiRH6tQ0Zl5NKX7o",
  authDomain: "crown-backend-9b733.firebaseapp.com",
  databaseURL: "https://crown-backend-9b733.firebaseio.com",
  projectId: "crown-backend-9b733",
  storageBucket: "crown-backend-9b733.appspot.com",
  messagingSenderId: "664929363642",
  appId: "1:664929363642:web:1c73962f8a8b02db370483",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  console.log(userAuth);
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(userRef);
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
