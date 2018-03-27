import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyALj0HoX8Qoek-WKTH7-xwk0SHL8rvam8c",
  authDomain: "react-todo-with-auth.firebaseapp.com",
  databaseURL: "https://react-todo-with-auth.firebaseio.com",
  projectId: "react-todo-with-auth",
  storageBucket: "",
  messagingSenderId: "15343713077"
};

const devConfig = {
  apiKey: "AIzaSyALj0HoX8Qoek-WKTH7-xwk0SHL8rvam8c",
  authDomain: "react-todo-with-auth.firebaseapp.com",
  databaseURL: "https://react-todo-with-auth.firebaseio.com",
  projectId: "react-todo-with-auth",
  storageBucket: "",
  messagingSenderId: "15343713077"
};

const config = process.env.NODE_ENV === 'production' ?
  prodConfig :
  devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};