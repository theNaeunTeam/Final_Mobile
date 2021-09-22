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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    wifiname: "AndroidWifi",
    wifimac: "00:13:10:85:fe:01",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    wifiname: "BlackFlame5",
    wifimac: "4:d4:c4:c8:66:d4",
  },
];

const Item = ({wifiname, wifimac}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{wifiname}</Text>
    <Text>{wifimac}</Text>
  </View>
);

function WiFi() {
  const renderItem = ({item}) => (
    <Item wifiname={item.wifiname} wifimac={item.wifimac} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
    borderColor:'black',
    borderStyle:'solid',
  },
});
export default WiFi;
