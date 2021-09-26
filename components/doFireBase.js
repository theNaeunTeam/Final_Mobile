import auth from "@react-native-firebase/auth";
import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";

const fireBaseLogin = async (id, pw, {navigation}) => {
  auth()
    .signInWithEmailAndPassword(id, pw)
    .then(async () => {
      console.log("User account created & signed in!");
      await SecureStore.setItemAsync("id", id);
      await SecureStore.setItemAsync("pw", pw);
      await navigation.navigate("Time Card");
    })
    .catch(error => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }
      console.log(error);
        Alert.alert(error);
    });
};

const fireBaseRegister = (id, pw, {navigation}) => {
    auth()
        .createUserWithEmailAndPassword(id, pw)
        .then(() => {
            console.log("User account created & signed in!");
            navigation.navigate("Time Card Login Page");
            alert("가입성공");
        })
        .catch(error => {
            if (error.code === "auth/email-already-in-use") {
                console.log("That email address is already in use!");
            }

            if (error.code === "auth/invalid-email") {
                console.log("That email address is invalid!");
            }
            console.log(error);
            alert(error);
        });
};

const firebaseLogout = async (props) =>{
    auth()
        .signOut()
        .then(async () => {
            console.log('User signed out!');
            try {
                await SecureStore.setItemAsync("id", "");
                await SecureStore.setItemAsync("pw", "");
                await props.navigation.replace("Login Page"); // 뒤로가기 버튼 안생김
            }catch (e){
                console.log(e);
                alert(e);
            }
            alert("로그아웃됨")
        }).catch(error => {
            console.log(error);
            alert(error);
    });
}

export {fireBaseLogin, fireBaseRegister, firebaseLogout};
