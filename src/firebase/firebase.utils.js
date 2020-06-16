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
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  for (let category in objectsToAdd) {
    if (objectsToAdd.hasOwnProperty(category)) {
      const newDocRef = collectionRef.doc();
      const { title, items } = objectsToAdd[category];
      batch.set(newDocRef, { title, items });
    }
  }

  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
  const transFormedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transFormedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
