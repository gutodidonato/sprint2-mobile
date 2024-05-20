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
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../contexts/auth";


export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { user, logar, deslogar  } = useContext(AuthContext);

  async function signIn(){
    try {
      await logar(email, password);
    } catch {
      alert('Erro ao logar');
    }
  }

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigation.navigate('Principal');
    }
  }, [user, navigation]);

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
          <Text style={styles.titulo}>Login</Text>
          <Text style={styles.textoLogin}>Email</Text>
          <TextInput style={styles.input} 
            placeholder="Digite seu Email"
            value={email}
            onChangeText={(text) => setEmail(text)}/> 
          <Text style={styles.textoLogin}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}/>
          <TouchableOpacity
            style={styles.button}
            onPress={signIn}
          >
            <Text style={styles.buttonText}> Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonNormal}
            onPress={() => {
              navigation.navigate("RecuperarSenha");
            }}
          >
            <Text>
              Esqueceu a<Text style={styles.linkText}> Senha?</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cadastro");
            }}
          >
            <Text>
              Nova Empresa? Entre em
              <Text style={styles.linkText}> Contato!</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCriar}
            onPress={() => {
              navigation.navigate("Cadastro");
            }}
          >
            <Text>
              Você não tem uma conta?
              <Text style={styles.linkText}> Registrar!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#777676",
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
