import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  projectId: "schoolproject-8df63",
  appId: "1:687512141015:web:144cc0e700810ee0598492",
  storageBucket: "schoolproject-8df63.firebasestorage.app",
  apiKey: "AIzaSyBok_FJqsnoJvqKYQp8ILV_AjR737DS2dE",
  authDomain: "schoolproject-8df63.firebaseapp.com",
  messagingSenderId: "687512141015",
};

// Initialize Firebase safely (prevent double initialization)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function logoutFirebase(): Promise<void> {
  await signOut(auth);
}

export function onAuthStatusChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export interface UserCloudSyncData {
  oils?: any[];
  customBlends?: any[];
  customRoomSprays?: any[];
  shoppingList?: string[];
  lastSyncedAt?: string;
}

/**
 * Saves user data to their dedicated private document in Firestore:
 * collections/users/{userId}
 */
export async function syncUserDataToCloud(userId: string, data: UserCloudSyncData) {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      {
        ...data,
        lastSyncedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn("Cloud sync error:", error);
    return false;
  }
}

/**
 * Loads cloud data for a user if exists
 */
export async function fetchUserCloudData(userId: string): Promise<UserCloudSyncData | null> {
  try {
    const userDocRef = doc(db, "users", userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserCloudSyncData;
    }
    return null;
  } catch (error) {
    console.warn("Error fetching cloud data:", error);
    return null;
  }
}

/**
 * Real-time subscription to cloud document changes across devices
 */
export function subscribeToUserCloudData(
  userId: string,
  onData: (data: UserCloudSyncData) => void
) {
  const userDocRef = doc(db, "users", userId);
  return onSnapshot(
    userDocRef,
    (snap) => {
      if (snap.exists()) {
        onData(snap.data() as UserCloudSyncData);
      }
    },
    (err) => {
      console.warn("Firestore subscription listener notice:", err);
    }
  );
}
