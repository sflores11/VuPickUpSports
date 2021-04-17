import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocationScreen extends Component {
  render() {
    //You can't add styling to the react buttons so those spacing views are used instead
    return(
      <View>
        <Text style={styles.title}>West Campus</Text>
        <Button title="Soccer Fields"></Button>
          <View style={styles.spacing}></View> 
        <Button title="St. Mary's Gym"></Button>
          <View style={styles.spacing}></View>
        <Button title="Tennis Courts"></Button>
        <View style={styles.spacing}></View>
        <Button title="Volleyball Courts"></Button>
        <View style={styles.spacing}></View>
        <Button title="Basketball Courts"></Button>
        <Text style={styles.title}>South Campus</Text>
        <Button title="Pike Field"></Button>
          <View style={styles.spacing}></View>
        <Button title="Volleyball Courts"></Button>
          <View style={styles.spacing}></View>
        <Button title="Basketball Courts"></Button>
        <Text style={styles.title}>Main Campus</Text>
        <Button title="Alumni Gym"></Button>
          <View style={styles.spacing}></View>
        <Button title="Austin Field"></Button>
          <View style={styles.spacing}></View>
        <Button title="Tennis Courts"></Button>
          <View style={styles.spacing}></View>
        <Button title="Basketball Courts"></Button>
      </View>
    );
  }
}

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: '',
    };
  }

  login = async(email, password) => {
    try {
      const sEmail = await AsyncStorage.getItem('email');
      const sPassword = await AsyncStorage.getItem('password');
      if(email === sEmail && password === sPassword) {
        console.log('hello');
        this.setStatus();
        this.props.navigation.navigate('Home');
      }
    } catch(e) {
      console.log(e);
    }
  }

  handleEmailChange = (text) => {
    this.setState({email: text});
  }

  handlePasswordChange = (text) => {
    this.setState({password: text});
  }

  setStatus = async() => {
    try {
      console.log('here');
      await AsyncStorage.setItem('status', 'true');
    } catch(e) {
      console.log(e);
    }
  }

  checkStatus = async() => {
    try {
      const status = await AsyncStorage.getItem('status');
      console.log(status);
      if(status) {
        console.log('jello');
        this.props.navigation.navigate('Home');
      }
    } catch(e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.checkStatus();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LogIn</Text>
        <TextInput name='email' value={this.state.email} placeholder='Enter Email' onChangeText={this.handleEmailChange}/>
        <TextInput name='password' value={this.state.password} placeholder='Enter Password' onChangeText={this.handlePasswordChange}/>
        <Button title="submit" onPress={()=> this.login(this.state.email, this.state.password)}/>
        <Button title="Sign Up" onPress={()=> this.props.navigation.navigate('Signup')}/>
      </View>
    );
  }
}

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: '',
    };
  }

  signUp = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      this.props.navigation.navigate('Login')
    } catch(e) {
      console.log(e);
    }
  };

  handleEmail = (text) => {
    this.setState({email: text});
  }

  handlePassword = (text) => {
    this.setState({password: text});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> This is the Sign Up Screen </Text>
        <TextInput name='email' value={this.state.email} placeholder='Enter Email' onChangeText={this.handleEmail}/>
        <TextInput name='password' value={this.state.password} placeholder='Enter Password' onChangeText={this.handlePassword}/>
        <Button title="submit" onPress={()=> this.signUp(this.state.email, this.state.password)}/>
      </View>
    );
  }
}

class HomeScreen extends Component {
  render() {
    return (
      <Text> Hello </Text>
    )
  }
}

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Signup" component={SignUpScreen}/>
          <Stack.Screen name="Home" component={LocationScreen}/>
          {/* <Stack.Screen name="Games" component={GameScreen}/>
          <Stack.Screen name="GameInfo" component={GameInfoScreen}/>
          <Stack.Screen name="CreateGame" component={CreateGameScreen}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  title: {
    fontSize: 30
  },

  spacing:{
    width: 5,
    height: 5
  }
});
