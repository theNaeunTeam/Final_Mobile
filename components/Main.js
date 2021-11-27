import React from 'react';
import {Pressable} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Entypo, EvilIcons, Ionicons, MaterialIcons} from '@expo/vector-icons';
import Home from './Home';
import Settings from './Settings';
import {connect, useDispatch} from 'react-redux';
import AddProduct from './AddProduct';

const Drawer = createDrawerNavigator();

function Main(props) {

    const dispatch = useDispatch();

    return (

        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#ffbf3f',
                },
            }}>
            <Drawer.Screen
                name="예약 현황"
                component={Home}
                options={{
                    drawerIcon: props => <Entypo name="home" size={24} color="black"/>,
                    headerRight: props => (
                        <Pressable onPress={() => dispatch({type: 'switch'})}>
                            <EvilIcons name="refresh" size={30} color="black"/>
                        </Pressable>
                    ),
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
            <Drawer.Screen
                name="상품등록"
                component={AddProduct}
                options={{
                    drawerIcon: props => (
                        <Ionicons name="receipt" size={24} color="black"/>
                    ),
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
            <Drawer.Screen
                name="설정"
                component={Settings}
                options={{
                    drawerIcon: props => (
                        <MaterialIcons name="settings" size={24} color="black"/>
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

export default connect(getLoading)(Main);

// export default Main;
