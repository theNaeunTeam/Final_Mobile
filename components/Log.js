import React, {useState} from "react";
import {View, Button, Platform, Text, Alert, StyleSheet} from "react-native";
import DTP from "./DTP";

function Log() {
  return (
      <View style={styles.container}>
          <View style={styles.viewTop}>
             <DTP/>
          </View>
          <View style={styles.viewMiddle}>
              <Text>기록 표시</Text>
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
        justifyContent: "flex-start",
        // alignItems: "center"
    },
    viewMiddle: {
        flex: 1,
        backgroundColor: "#345B63",
        justifyContent: "center",
        alignItems: "center"
    },
});
export default Log;
