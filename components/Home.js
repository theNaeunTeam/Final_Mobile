import React, {useEffect, useState} from "react";
import {
  View,
  Button,
  Platform,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import GetLocation from "./GetLocation";
import {connect} from "react-redux";
import NetInfo from "@react-native-community/netinfo";

function Home(props) {
  const [id, setId] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await SecureStore.getItemAsync("id")
      .then(async res => {
        await setId(res);

        const url = `https://kenken0803.herokuapp.com/timeCardInitg?email=${res}`;
        const authGroup = await axios.get(url);
        const authGroupData = authGroup.data;

        const wifiName = authGroupData.map(data => data.wifiName);
        const wifiNameData = wifiName.filter(data => data !== null);
        await console.log("와이파이이름 : " + wifiNameData);

        const wifiAddr = authGroupData.map(data => data.wifiAddr);
        const wifiAddrData = wifiAddr.filter(data => data !== null);
        await console.log("와이파이주소 : " + wifiAddrData);

        const btName = authGroupData.map(data => data.btName);
        const btNameData = btName.filter(data => data !== null);
        await console.log("블투이름 : " + btNameData);

        const btAddr = authGroupData.map(data => data.btAddr);
        const btAddrData = btAddr.filter(data => data !== null);
        await console.log("블투주소 : " + btAddrData);

        const nfcName = authGroupData.map(data => data.nfcName);
        const nfcNameData = nfcName.filter(data => data !== null);
        await console.log("nfc이름 : " + nfcNameData);

        const nfcAddr = authGroupData.map(data => data.nfcAddr);
        const nfcAddrData = nfcAddr.filter(data => data !== null);
        await console.log("nfc주소 : " + nfcAddrData);

        const gpsName = authGroupData.map(data => data.gpsName);
        const gpsNameData = gpsName.filter(data => data !== null);
        await console.log("gps이름 : " + gpsNameData);

        const gpsLat = authGroupData.map(data => data.gpsLat);
        const gpsLatData = gpsLat.filter(data => data !== null);
        await console.log("gps lat : " + gpsLatData);

        const gpsLon = authGroupData.map(data => data.gpsLon);
        const gpsLonData = gpsLon.filter(data => data !== null);
        await console.log("gps lon : " + gpsLonData);

        const data = {
          wifiName: wifiNameData,
          wifiAddr: wifiAddrData,
          btName: btNameData,
          btAddr: btAddrData,
          nfcName: nfcNameData,
          nfcAddr: nfcAddrData,
          gpsName: gpsNameData,
          gpsLat: gpsLatData,
          gpsLon: gpsLonData,
          groupName: authGroupData[0].authGroupName,
          workTime: authGroupData[0].workTime,
          lunchtime: authGroupData[0].lunchtime,
          startTime: authGroupData[0].startTime,
          endTime: authGroupData[0].endTime,
        };
        await console.log(data);
        await props.dispatch({type: "initDB", payload: {data}});
        await setLoading(false);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };

  const SSIDchk = () => {
    let res = true;
    NetInfo.fetch("wifi").then(state => {
      if (!state.isWifiEnabled) {
        Alert.alert("와이파이 켜주세요");
        return false;
      }
      if (!state.isConnected) {
        Alert.alert("와이파이에 연결해주세요");
        return false;
      }
      const SSID = state.details.ssid;
      const BSSID = state.details.bssid;
      props.state.data.wifiName.map((val, index) => {
        if (
          props.state.data.wifiName[index] === SSID &&
          props.state.data.wifiAddr[index] === BSSID
        ) {
          Alert.alert(
            "인증완료!",
            props.state.data.wifiName[index] + props.state.data.wifiAddr[index],
          );
          res = false;
          setDisable(false);
          return false;
        }
      });
      if (res) Alert.alert("인증 실패");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <Text style={styles.buttonText}>{id} 님 환영합니다</Text>
        {loading ? (
          <ActivityIndicator size="large"/>
        ) : (
          <View>
            <Text style={styles.buttonText}>
              소속 : {props.state.data.groupName}
            </Text>
            <Text style={styles.buttonText}>{new Date().toString()}</Text>
            <Text style={styles.buttonText}>
              {" "}
              근무 시간 : {props.state.data.workTime}
            </Text>
            <Text style={styles.buttonText}>
              {" "}
              점심 시간 : {props.state.data.lunchtime}
            </Text>
            <Text style={styles.buttonText}>
              {" "}
              근무 인정 시간 : {props.state.data.startTime}
            </Text>
            <Text style={styles.buttonText}>
              {" "}
              퇴근 인정 시간 : {props.state.data.endTime}
            </Text>
          </View>
        )}
        <View style={styles.viewMiddle}>
          <Pressable
            style={disable ? styles.button : styles.disabledButton}
            disabled={!disable}
            onPress={() => {
              SSIDchk();
            }}>
            <Text style={styles.buttonText}>출근</Text>
          </Pressable>
          <Pressable
            style={!disable ? styles.button : styles.disabledButton}
            onPress={SSIDchk}
            disabled={disable}>
            <Text style={styles.buttonText}>외출시작</Text>
          </Pressable>
          <Pressable
            style={!disable ? styles.button : styles.disabledButton}
            onPress={SSIDchk}
            disabled={disable}>
            <Text style={styles.buttonText}>외출종료</Text>
          </Pressable>
          <Pressable
            style={!disable ? styles.button : styles.disabledButton}
            disabled={disable}
            onPress={SSIDchk}>
            <Text style={styles.buttonText}>퇴근</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.scView}>
        <Button
          title={"test"}
          onPress={() => {
            console.log(props.state.data);
          }}
        />
          <Text></Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scView: {
    flex: 1,
  },
  viewTop: {
    flex: 1,
    backgroundColor: "#ffbf3f",
    justifyContent: "center",
    alignItems: "center",
      paddingTop: 20,
  },
  viewMiddle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#D4ECDD",
    // padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 70,
    height: 70,
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
    // padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 70,
    height: 70,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#112031",
    textAlign: "center",
    fontWeight: "bold",
    margin: 1,
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(Home);
