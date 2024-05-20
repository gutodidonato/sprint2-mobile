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
import { useContext, useState } from "react";
import React from "react";
import { AuthContext} from "../contexts/auth";


export default function Configuration({ navigation }) {

  const {user, logar, deslogar} = useContext(AuthContext);


  async function handleLogout() {
    try {
      await deslogar();
      navigation.navigate('Login');
    } catch (error) {
      console.log("Deslogar não funcionou:", error);
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
          <Text style={configStyle.titulo}>Nome do usuário:</Text>
          <Text style={configStyle.usuario}>{user.nome}</Text>

          <Text style={configStyle.titulo}>Email atual:</Text>
          <Text style={configStyle.usuario}>{user.email}</Text>

          <Text style={configStyle.titulo}>Localização atual:</Text>
          <Text style={configStyle.usuario}>{user.local}</Text>

          <Text style={configStyle.titulo}>Status:</Text>
          <Text style={configStyle.usuario}>{user.status}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}> Deslogar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
    marginTop: 120,
  },
  caixa: {
    backgroundColor: "white",
    borderRadius: 50,
    width: "100%",
    height: 500,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 120,
    paddingTop: 40,
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
    marginTop: 10
  },
  buttonText: {
    color: "white",
  },
  buttonCriar: {
    marginTop: 50,
  },
});

const configStyle = StyleSheet.create({
  titulo : {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 5,
  },
  usuario :{
    backgroundColor: '#362e8f',
    borderRadius: 10,
    paddingHorizontal:10,
    paddingVertical: 10,
    color: 'white'
  }
});
