import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, get, set } from 'firebase/database';


export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');

  async function cadastrar() {
    console.log("Iniciando função cadastrar")
    const auth = getAuth();
    if (nome && email && cpf && password){
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const db = getDatabase();
        const userRef = ref(db, 'usuarios/' + userCredential.user.uid);
        await set(userRef, {
          email: email,
          password: password,
          nome: nome,
          cpf: cpf,
          status: "cliente",
          local: "freguesiadoo",
          avaliacao: 5
        });
        alert('Usuário criado: ' + userCredential.user.email);
        navigation.navigate('Login');

        
      } catch (error) {
        if (error.code === 'auth/weak-password') {
          alert('Senha fraca');
        } else if (error.code === 'auth/invalid-email') {
          alert('Email inválido');
        } else {
          alert('Ops, algo deu errado!');
        }
      }
    }
    else{
      alert("Algum dado não foi preenchido")
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="gray" />
      <ImageBackground
        source={require("../assets/fundo.png")}
        resizeMode="cover"
        style={styles.fundoPreto}
      >
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View style={styles.caixa}>
          <Text style={styles.titulo}>Cadastro</Text>
          <Text style={styles.textoLogin}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite seu email"  
            value={email}
            onChangeText={(text) => setEmail(text)}/>

          <Text style={styles.textoLogin}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />

          <Text style={styles.textoLogin}>Nome Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite seu nome completo" 
            value={nome}
            onChangeText={(text) => setNome(text)} />
            
          <Text style={styles.textoLogin}>CPF</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite seu CPF"
            value={cpf}
            onChangeText={(text) => setCPF(text)} />

          <TouchableOpacity
            style={styles.button}
            onPress={cadastrar}
          >
            <Text style={styles.buttonText}> Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  fundoPreto: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "50%",
    display: "flex",
    alignContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    marginTop: 80,
  },
  caixa: {
    backgroundColor: "white",
    borderRadius: 50,
    width: "100%",
    height: 600,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
    paddingTop: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#d4d4d4",
    borderColor: "#d4d4d4",
    width: "60%",
  },
  titulo: {
    fontSize: 25,
    textAlign: "left",
    width: "60%",
    marginVertical: 10,
  },
  textoLogin: {
    fontSize: 18,
    width: "60%",
    textAlign: "left",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "60%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
  linkText: {
    color: "#20179b",
    fontWeight: "600",
  },
  buttonNormal: {
    marginVertical: 10,
  },
  buttonCriar: {
    marginTop: 50,
  },
});