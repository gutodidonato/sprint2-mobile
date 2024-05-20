import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import { useContext, useEffect, useState } from "react";
  import React from "react";
  import { AuthContext } from "../contexts/auth";

  
  export default function Lanches({ navigation }) {
    const [servico, setServico] = useState([])
    const { user, logar, deslogar} = useContext(AuthContext);

    const url = `http://192.168.0.83:8080/servicos/cliente/${user.local}/${user.avaliacao}`;
  
    const makeAPICall = async () => {
      try {
        const response = await fetch(url, {mode: "cors", });
        const data = await response.json();
        setServico(data);
        console.log(data)
      } catch (e) {
        console.error("Error fetching restaurantes:", e);
      }
    };
  
  
    useEffect(() => {
      makeAPICall();
    }, []);
  
  
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/fundo.png")}
          resizeMode="cover"
          style={styles.fundoPreto}
        >
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <View style={styles.caixa}>
            <Text style={styles.titulo}>Lanches</Text>
            <FlatList
            data={servico} 
            renderItem={({ item }) => (
            <View style={estilo.caixa}>
              <TouchableOpacity>
                  <Text style={estilo.titulo}>{item.nome}</Text>
                  <View style={estilo.caixinha}>
                    <Text style={estilo.texto}>preço : {item.preco}</Text>
                    <Text style={estilo.texto}>nome empresa: {item.empresa}</Text>
                  </View>
                  <View style={estilo.caixinha}>
                    <Text style={estilo.texto}>avaliacao :{item.avaliacao}</Text>
                    <Text style={estilo.texto}>local : {item.local}</Text>
                  </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.nome} 
        />
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
    titulo: {
      fontSize: 22,
      marginBottom: 20
    }
  
  });
  
  const estilo = StyleSheet.create({
    caixa: {
      flex: 1,
      backgroundColor: "#7e7e7e",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      paddingHorizontal: 30,
      paddingVertical: 20,
      marginVertical: 10
    },
    texto: {
      color: "white"
    },
    caixinha: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20
    },
    titulo: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center'
    }
  })
  