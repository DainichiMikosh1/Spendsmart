import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyc62X1YkmLhwUq5573l20FRqc8-huT4I",
  authDomain: "spendsmart-e8115.firebaseapp.com",
  projectId: "spendsmart-e8115",
  storageBucket: "spendsmart-e8115.firebasestorage.app",
  messagingSenderId: "4589846011",
  appId: "1:4589846011:web:c6b55b45e0afd5ff145f5e"
};

// Inicializa firebase
const app = initializeApp(firebaseConfig);

// Inicializa firebase auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) //Permite que Firebase utilice librerías de almacenamiento compatibles con React Native para guardar información como el token de autenticación del usuario.
});

const db = getFirestore(app);
export { auth, db};