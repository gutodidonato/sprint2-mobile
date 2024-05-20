import React, {useState, createContext, useEffect} from 'react';
import { signInWithEmailAndPassword, getAuth, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, get, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});



function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(()=>{
    async function loadStorage(){
      const userStored = await AsyncStorage.getItem('Auth_user')
    if (userStored){
      setUser(JSON.parse(userStored));
    }
  }
    loadStorage()

  }, [])
  
  const auth = getAuth();

  async function deslogar(){
    const auth = getAuth()
    console.log("Deslogar...")
    await signOut(auth);
    await AsyncStorage.removeItem('Auth_user');
    setUser({})
    console.log("Deslogado")
  }

  async function logar(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const db = getDatabase();
      const userRef = ref(db, 'usuarios/' + uid);
      const snapshot = await get(userRef);
      const userData = {
        uid: uid,
        nome: snapshot.val().nome,
        email: userCredential.user.email,
        cpf: snapshot.val().cpf,
        status: snapshot.val().status,
        local: snapshot.val().local,
        avaliacao : snapshot.val().avaliacao
      };
      setUser(userData);
      storageUser(userData);
    } catch (error) {
      alert("Ops, algo deu errado: " + error.message);
    }
  }


  async function storageUser(data){
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
  }


  return (
    <AuthContext.Provider value={{ user, logar, deslogar }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;