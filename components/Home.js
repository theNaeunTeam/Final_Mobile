import React, {useEffect, useState} from "react";
import {View, Button, Platform, Text, Alert, StyleSheet, Pressable} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import GetLocation from "./GetLocation";

function Home() {
  const [id, setId] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const sId = await SecureStore.getItemAsync("id");
    const sPw = await SecureStore.getItemAsync("pw");
    await setId(sId);
  };

  const url = `https://kenken0803.herokuapp.com/getDB?id=1&start=0`;

  const getDB = async () => {
    try {
      const DBlist = await axios.get(url);
      console.log(DBlist);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <Text>{id}</Text>
        <Text style={styles.buttonText}>님 환영합니다</Text>
      </View>
      <View style={styles.viewMiddle}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={null}>출근하기..</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>퇴근하기!</Text>
        </Pressable>
      </View>
      <View style={styles.viewMiddle}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTop: {
    flex: 1,
    backgroundColor: "#D4ECDD",
    justifyContent: "center",
    alignItems: "center",
  },
  viewMiddle: {
    flex: 1,
    backgroundColor: "#345B63",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row"
  },
  button: {
    backgroundColor: "#D4ECDD",
    padding: 15,
    borderRadius: 5,
    margin: 15,
    width:"30%"
  },
  buttonText: {
    fontSize: 20,
    color: "#112031",
    textAlign: "center",
  },
});

export default Home;
