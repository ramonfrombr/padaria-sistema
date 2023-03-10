import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential as FirebaseUserCredential,
  signOut,
} from "firebase/auth";

interface initialAuthProps {
  currentUser: FirebaseUser | null;
  signin: (email: string, password: string) => Promise<FirebaseUserCredential>;
  signout: () => Promise<void>;
}

function signin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

function signout() {
  return signOut(auth);
}

const initialAuth: initialAuthProps = {
  currentUser: null,
  signin: signin,
  signout: signout,
};

const AuthContext = createContext(initialAuth);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
