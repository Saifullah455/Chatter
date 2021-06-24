import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCYemS8yEzzvkyd67UxTJjYmH-QwZjoEYo",
    authDomain: "chat-application-57b57.firebaseapp.com",
    projectId: "chat-application-57b57",
    storageBucket: "chat-application-57b57.appspot.com",
    messagingSenderId: "476814481173",
    appId: "1:476814481173:web:848d35860588e95c66fb1c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;