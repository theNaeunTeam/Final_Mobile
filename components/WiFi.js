import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {connect} from "react-redux";

function WiFi(props) {
  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>


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
