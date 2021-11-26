import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create();

client.interceptors.request.use(
    async function (config) {
        // const userToken = await AsyncStorage.getItem('userToken');
        const ownerToken = await AsyncStorage.getItem('ownerToken');
        // const masterToken = await AsyncStorage.getItem('masterToken');

        // if (userToken !== null) { // @ts-ignore
        //     config.headers.Authorization = userToken;
        //     console.log('userToken 읽기 성공');
        //     return config;
        // }

        if (ownerToken !== null) {
            config.headers.Authorization = ownerToken;
            console.log('ownerToken 읽기 성공');
            return config;
        }

        // if (masterToken !== null) {// @ts-ignore
        //     config.headers.Authorization = masterToken;
        //     console.log('masterToken 읽기 성공');
        //     return config;
        // }

        return config;
    },
    function (error) {
        // 오류 요청 가공
        return Promise.reject(error);
    }
);

export {client};