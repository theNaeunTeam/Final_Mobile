import React, {useState} from "react";
import {
  View,
  Button,
  Platform,
  Text,
  Alert,
  StyleSheet,
  FlatList,
} from "react-native";
import GetLocation from "./GetLocation";
import {connect} from "react-redux";

function WiFi(props) {
  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        {props.state.data.wifiName.map((res, index) => {
          return (
            <View style={styles.item}>
              <Text key={index} style={styles.title}>{res}</Text>
              <Text key={index + "a"}>{props.state.data.wifiAddr[index]}</Text>
            </View>
          );
        })}
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
    alignItems: "center",
  },
  item: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 20,
    margin: 10,
    width: "95%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(WiFi);
