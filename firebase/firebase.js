import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
    updateDoc,
    deleteDoc,
    increment,
    where,
    query,
    deleteField,
  } from "firebase/firestore";
import {v4 as uuidv4} from "uuid";



const app = firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
})


export const auth = app.auth();

const db = getFirestore();

export const getUserData = async (user) => {
  const docSnapUser = await getDoc(doc(db, "users", user.email))
  const userData = docSnapUser.data();
  return userData;
}

export const findMyCharacters = async (user) => {
  const q = query(collection(db, "characters"), where("creator", "==", user.uid))
  const qSnapshotCharacters = await getDocs(q);
  const characterArray = [];
  qSnapshotCharacters.forEach((doc) => {
      characterArray.push(doc.data());
  })
  return characterArray;
}

export const findMyCustomBGs = async (user) => {
  const q = query(collection(db, "custom_backgrounds"), where("creator", "==", user.uid));
  const qSnapshotBGs = await getDocs(q);
  const bgArray = [];
  qSnapshotBGs.forEach((doc) => {
    bgArray.push(doc.data());
  })
  return bgArray;
}

export const saveCharacter = async (thisChar, user) => {

  const newUid = uuidv4();

  await setDoc(
    doc(db, "characters", `${newUid}`), 
    {
      ...thisChar,
      creator: user.uid,
      uid: newUid,
    },
    { merge: false }
    )
}

export const updateCharacter = async (character) => {
  const characterRef = doc(db, "characters", `${character.uid}`);

  await updateDoc(characterRef, {
    ...character,
  })
}

export const deleteCharacter = async (uid) => {

  const characterRef = doc(db, "characters", `${uid}`);
  
  await deleteDoc(characterRef);

}

export const saveCustomBG = async (newBG, user) => {

  const newUid = uuidv4();

  await setDoc(
    doc(db, "custom_backgrounds", `${newUid}`), 
    {
      ...newBG,
      creator: user.uid,
      uid: newUid,
    },
    { merge: false }
    )
}

export default app;
