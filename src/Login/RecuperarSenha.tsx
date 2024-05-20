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
import { getAuth, sendPasswordResetEmail} from "firebase/auth";


export default function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState('');



  async function handleRecuperarSenha(email) {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('A password reset link has been sent to your email address. Please check your inbox (including spam) and follow the instructions to reset your password.');
      navigation.navigate("Login");
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('An error occurred while sending the password reset email. Please try again later.');
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
          <Text style={styles.titulo}>Recuperar Senha</Text>
          <Text style={styles.textoLogin}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite seu email"  
            value={email}
            onChangeText={(text) => setEmail(text)}/>


          <TouchableOpacity
            style={styles.button}
            onPress={handleRecuperarSenha}
          >
            <Text style={styles.buttonText}> Recuperar Senha</Text>
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