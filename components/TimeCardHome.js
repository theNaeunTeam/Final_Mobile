import React, {useState} from "react";
import {Button, Text, View} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
import Bluetooth from "./Bluetooth";
import GPS from "./GPS";
import Home from "./Home";
import Log from "./Log";
import Settings from "./Settings";
import WiFi from "./WiFi";
import {connect} from "react-redux";

const Drawer = createDrawerNavigator();

function TimeCardHome({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: props => <Entypo name="home" size={24} color="black" />,
          headerRight: props => (
            <EvilIcons name="refresh" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="LOG"
        component={Log}
        options={{
          drawerIcon: props => (
            <Ionicons name="receipt" size={24} color="black" />
          ),
          headerRight: props => (
            <EvilIcons name="refresh" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="GPS information"
        component={GPS}
        options={{
          drawerIcon: props => (
            <MaterialIcons name="gps-fixed" size={24} color="black" />
          ),
          headerRight: props => (
            <EvilIcons name="refresh" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="WiFi information"
        component={WiFi}
        options={{
          drawerIcon: props => (
            <AntDesign name="wifi" size={24} color="black" />
          ),
          headerRight: props => (
            <EvilIcons name="refresh" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Bluetooth information"
        component={Bluetooth}
        options={{
          drawerIcon: props => (
            <MaterialIcons name="settings-bluetooth" size={24} color="black" />
          ),
          headerRight: props => (
            <EvilIcons name="refresh" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: props => (
            <MaterialIcons name="settings" size={24} color="black" />
          ),
          headerRight: props => (
            <MaterialIcons
              name="admin-panel-settings"
              size={30}
              color="black"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function getLoading(state) {
    return {
        state: state,
    };
}

export default connect(getLoading)(TimeCardHome);

// export default TimeCardHome;
