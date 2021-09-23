import React, {useState} from "react";
import {
  View,
  Button,
  Platform,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, {Circle, Marker} from "react-native-maps";

function GPS() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.172912,
          longitude: 129.127699,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{latitude: 35.172912, longitude: 129.127699}}
          title="this is a marker"
          description="this is a marker example"
        />
        <Circle
          center={{
            latitude: 35.172912,
            longitude: 129.127699,
          }}
          radius={500}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
      </MapView>
      <View style={styles.container}>
          <Text>            latitude: 35.172912,
              longitude: 129.127699</Text>
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
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});
export default GPS;
