import React, {useEffect, useState} from "react";
import {
  View,
  Button,
  Platform,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MapView, {Circle, Marker} from "react-native-maps";
import {connect} from "react-redux";

function GPS(props) {
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 35.172912,
    longitude: 129.127699,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    setRegion({
      latitude: parseFloat(props.state.data.gpsLat),
      longitude: parseFloat(props.state.data.gpsLon),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
        }
    )
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          style={styles.map}
          region={region}
          // initialRegion={{
          //   latitude: `${parseFloat(lat)}`,
          //   longitude: `${parseFloat(lon)}`,
          //   latitudeDelta: 0.01,
          //   longitudeDelta: 0.01,
          // }}>
          >
          <Marker
            coordinate={{latitude: region.latitude, longitude: region.longitude}}
            title="this is a marker"
            description="this is a marker example"
          />
          <Circle
            center={{latitude: region.latitude, longitude: region.longitude}}
            radius={500}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.5)"}
          />
        </MapView>
      )}
      <View style={styles.container}>
        <ScrollView style={styles.viewTop}>
          {props.state.data.gpsName.map((res, index) => {
            return (
              <View key={index + "d"}>
                <Text key={index + "a"} />
                <Text style={styles.buttonText} key={index + "b"}>
                  장소 명 : {props.state.data.gpsName}
                </Text>
                <Text key={index + "c"}>위도 : {props.state.data.gpsLat}</Text>
                <Text key={index + "d"}>경도 : {props.state.data.gpsLon}</Text>
                <Text key={index + "e"} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#112031",
    textAlign: "center",
    fontWeight: "bold",
    margin: 1,
  },
  viewTop: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(GPS);
