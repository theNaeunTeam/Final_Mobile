import React, {useState, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import {connect} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings(props) {
  return (
    <View>
        <Pressable
        style={styles.button}
        onPress={()=>{
          AsyncStorage.clear();
          props.navigation.navigate('Login Page');
        }}>
        <Text style={styles.labelText}>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D4ECDD",
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#112031",
    textAlign: "center",
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(Settings);

// export default Settings;
