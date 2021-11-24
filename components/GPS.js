import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import {connect} from 'react-redux';

function GPS(props) {
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({});

  useEffect(() => {
    setRegion({
      latitude: Number(props.state.data.gpsLat[0]),
      longitude: Number(props.state.data.gpsLon[0]),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView style={styles.map} region={region}>
          {props.state.data.gpsName.map((res, index) => {
            return (
              <>
                <Marker
                  coordinate={{
                    latitude: Number(props.state.data.gpsLat[index]),
                    longitude: Number(props.state.data.gpsLon[index]),
                  }}
                  title={res}
                />
                <Circle
                  center={{
                    latitude: Number(props.state.data.gpsLat[index]),
                    longitude: Number(props.state.data.gpsLon[index]),
                  }}
                  radius={500}
                  strokeWidth={1}
                  strokeColor={'#1a66ff'}
                  fillColor={'rgba(230,238,255,0.5)'}
                />
              </>
            );
          })}
        </MapView>
      )}
      <View style={styles.container}>
        <ScrollView style={styles.viewTop}>
          {props.state.data.gpsName.map((res, index) => {
            return (
              <View key={index + 'd'} style={styles.item}>
                <Text key={index + 'a'} />
                <Text style={styles.title} key={index + 'b'}>
                  장소 {index + 1} => {res}
                </Text>
                <Text key={index + 'c'}>
                  위도 : {props.state.data.gpsLat[index]}
                </Text>
                <Text key={index + 'd'}>
                  경도 : {props.state.data.gpsLon[index]}
                </Text>
                <Text key={index + 'e'} />
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
  },
  viewTop: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    margin: 10,
    width: '95%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(GPS);
