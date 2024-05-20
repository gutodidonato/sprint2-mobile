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

export default function Maps({ navigation }) {

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
          <Text>Maps</Text>
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
