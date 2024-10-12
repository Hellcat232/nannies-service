// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDO3DtZaBFNOVRS3bcobqoatJ58wnK12cc",
  authDomain: "nanny-services-eda4a.firebaseapp.com",
  databaseURL:
    "https://nanny-services-eda4a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanny-services-eda4a",
  storageBucket: "nanny-services-eda4a.appspot.com",
  messagingSenderId: "57973395381",
  appId: "1:57973395381:web:19a3e82c29e9e3dd3d53fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getDatabase(app);

export const nanniesRef = ref(db);

// export const database = await get(nanniesRef)
//   .then((nanny) => {
//     if (nanny.exists()) {
//       const data = nanny.val();
//       console.log(data);

//       return data;
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// console.log(database);
