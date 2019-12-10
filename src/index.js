import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAiLhuYXnUmjpf7SSXnzMulZlAZCSrxLsw",
  authDomain: "ideaapp-d8108.firebaseapp.com",
  databaseURL: "https://ideaapp-d8108.firebaseio.com",
  projectId: "ideaapp-d8108",
  storageBucket: "ideaapp-d8108.appspot.com",
  messagingSenderId: "320573061262",
  appId: "1:320573061262:web:cbe4faa165967aaeef71df",
  measurementId: "G-9RDFRW7S14"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
