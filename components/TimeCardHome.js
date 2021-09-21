import React, {useState} from "react";
import {Button, Text, View} from "react-native";
import GetLocation from "./GetLocation";
import DTP from "./DTP";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function TimeCardHome() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={GetLocation}
        options={{
          drawerIcon: props => <Entypo name="home" size={24} color="black" />,
          headerRight: props => (
            <EvilIcons name="refresh" size={30} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="LOG"
        component={DTP}
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
        component={DTP}
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
        component={DTP}
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
        component={DTP}
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
        component={DTP}
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

export default TimeCardHome;
