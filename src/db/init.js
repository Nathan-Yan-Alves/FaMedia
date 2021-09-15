const firebaseConfig = {
    apiKey: "AIzaSyANtEtpk3BjYbrpDyk1N8i5_SwOZFrCsC0",
    authDomain: "famedia-1161a.firebaseapp.com",
    projectId: "famedia-1161a",
    storageBucket: "famedia-1161a.appspot.com",
    messagingSenderId: "576711616089",
    appId: "1:576711616089:web:4b3a35728983ac380bb348",
    measurementId: "G-Z13Z37YWTS",
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();
