import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCW-8axM-5BZe9rUkPJodbIiioLw7Xvg6g",
  	authDomain: "react-facebook-messenger-f85da.firebaseapp.com",
  	projectId: "react-facebook-messenger-f85da",
  	storageBucket: "react-facebook-messenger-f85da.appspot.com",
  	messagingSenderId: "1043600950538",
  	appId: "1:1043600950538:web:0f4f9ddeaa14e0c94ba6f3"
});

const db = firebaseApp.firestore();

export default db;