import type {Node} from 'react';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Login from './components/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './components/Main';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer} from './reducers/auth';
import {client} from './lib/client';
import {goodsReducer} from './reducers/goods';
import Detail from './components/Detail';
import {refreshReducer} from './reducers/refresh';

const App: () => Node = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const Stack = createNativeStackNavigator();

    const autoLogin = async () => {
        console.log('자동로그인시도');

        const o_sNumber = await AsyncStorage.getItem('o_sNumber');

        if (o_sNumber !== null) {
            try {
                const res = await client.get(
                    'https://thenaeunteam.link/owner/tokencheck',
                );
                console.log('자동로그인성공');
                setIsLogin(true);
            } catch (e) {
                setIsLogin(false);
                console.log(e);
                console.log('자동로그인 실패');
                AsyncStorage.clear();
            }
        }
    };

    useEffect(() => {
        async function prepare() {
            try {
                await autoLogin();
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync(Entypo.font);
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                // await new Promise(resolve => setTimeout(resolve, 1000));
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

    const rootReducer = combineReducers({
        authReducer,
        goodsReducer,
        refreshReducer,
    });

    const store = createStore(rootReducer);

    return (
        <Provider store={store}>
            <StatusBar barStyle={'light-content'}/>
            <SafeAreaView onLayout={onLayoutRootView} style={styles.pagerView}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={isLogin ? 'Main' : 'Login Page'}>
                        <Stack.Screen
                            name="Login Page"
                            component={Login}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="Main"
                            component={Main}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name={'예약상세'}
                            component={Detail}
                            options={{
                                headerStyle: {
                                    backgroundColor: '#ffbf3f',
                                },
                                // headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontSize: 20,
                                },
                                headerTitleAlign: 'center',
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
        backgroundColor: '#112031',
    },
});

export default App;
