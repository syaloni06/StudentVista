
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBqe2Z25E5Kgl4mtqIakdWnhamaFgX82w",
  authDomain: "studentvista-a2d3d.firebaseapp.com",
  projectId: "studentvista-a2d3d",
  storageBucket: "studentvista-a2d3d.firebasestorage.app",
  messagingSenderId: "363954997917",
  appId: "1:363954997917:web:1a88fbb762cd468a826274",
  measurementId: "G-L1GWCD7B3L",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
