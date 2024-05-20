import * as React from "react";
import AuthProvider from "./src/contexts/auth";
import {initializeApp} from "firebase/app"
import {config} from "./src/config/firebaseConnection"
import { StatusBar } from "expo-status-bar";
import Rotas from "./src/rotas/Rotas";

export const firebase = initializeApp(config.firebaseConfig);



export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" backgroundColor="gray" />
      <Rotas />
    </AuthProvider>
  );
}
