import React, {useCallback, useEffect, useState} from "react";
import type {Node} from "react";
import {SafeAreaView, Text, View, StyleSheet, StatusBar} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {Entypo} from "@expo/vector-icons";
import * as Font from "expo-font";
import Login from "./components/Login";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Register from "./components/Register";
import TimeCardHome from "./components/TimeCardHome";
import 'react-native-gesture-handler';

const App: () => Node = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView onLayout={onLayoutRootView} style={styles.pagerView}>
        <Stack.Navigator
          initialRouteName={isLogin ? "Time Card" : "Login Page"}>
          <Stack.Screen name="Login Page" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Time Card"
            component={TimeCardHome}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: "#112031",
  },
});

export default App;
