import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react'
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const store = createStore(rootReducer, applyMiddleware(thunk))

console.log(firebase.auth) // Undefined
console.log(firebase.default.auth) // Function
const firebaseConfig = {
  apiKey: "AIzaSyA8ER9BC0buNeYNEeiL035prrDWVUrNbQ4",
  authDomain: "instagram-demo-d934b.firebaseapp.com",
  projectId: "instagram-demo-d934b",
  storageBucket: "instagram-demo-d934b.appspot.com",
  messagingSenderId: "481450335364",
  appId: "1:481450335364:web:f85d3fdab8da53086f76d1",
  measurementId: "G-QD4V6S1WNK"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'



const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=> {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1,justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){ 
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} ></Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen} ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
     );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
             <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}></Stack.Screen>
             <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} ></Stack.Screen>
             <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}></Stack.Screen>

          </Stack.Navigator> 
        </NavigationContainer>
      </Provider>
      
    )
  }
}


export default App




