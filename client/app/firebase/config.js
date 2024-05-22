import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

const firebaseConfig = JSON.parse(config);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
