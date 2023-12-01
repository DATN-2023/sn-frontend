import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBgXVtMkTVYqKDyPk2MnbR4ZXkQ44pYDJs",
    authDomain: "test-1a4cc.firebaseapp.com",
    databaseURL: "https://test-1a4cc.firebaseio.com",
    projectId: "test-1a4cc",
    storageBucket: "test-1a4cc.appspot.com",
    messagingSenderId: "772685687500",
    appId: "1:772685687500:web:5ae7e6d49250335f543069",
    measurementId: "G-N6P4XVLF0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)
console.log('test firebase')
getToken(messaging).then((currentToken) => {
    if (currentToken) {
        console.log('currentToken', currentToken)
    } else {

    }
}).catch((e) => {
    console.log('An error occurred while retrieving token. ', err);
})