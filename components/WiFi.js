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

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     wifiname: "AndroidWifi",
//     wifimac: "00:13:10:85:fe:01",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     wifiname: "BlackFlame5",
//     wifimac: "4:d4:c4:c8:66:d4",
//   },
// ];

function WiFi(props) {
  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <Button
          title={"test"}
          onPress={() => {
            console.log(props.state.data.wifiName);
          }}
        />
        {props.state.data.wifiName.map((res, index) => {
          return (
            <View>
              <Text key={index} style={styles.item}>
                와이파이 이름 : {props.state.data.wifiName[index]}
              </Text>
              <Text key={index+'a'} style={styles.item}>와이파이 주소 : {props.state.data.wifiAddr[index]}</Text>
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
    // backgroundColor: "#D4ECDD",
    justifyContent: "center",
    alignItems: "center",
  },
  viewMiddle: {
    flex: 1,
    backgroundColor: "#345B63",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#D4ECDD",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    borderColor: "black",
    borderStyle: "solid",
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(WiFi);
