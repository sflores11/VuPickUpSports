import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LocationScreen extends Component {

  render() {
    //You can't add styling to the react buttons so those spacing views are used instead
    return(
      <View style={styles.container}>
        <Text style={styles.title}>West Campus</Text>
        <Button title="Soccer Fields" onPress={()=> this.props.navigation.navigate('Games', {location: "WEST_SOCCER"})}/>
          <View style={styles.spacing}></View> 
        <Button title="St. Mary's Gym" onPress={()=> this.props.navigation.navigate('Games', {location: "ST_MARY"})}/>
          <View style={styles.spacing}></View>
        <Button title="Tennis Courts" onPress={()=> this.props.navigation.navigate('Games', {location: "WEST_TENNIS"})}/>
          <View style={styles.spacing}></View>
        <Button title="Volleyball Courts" onPress={()=> this.props.navigation.navigate('Games', {location: "WEST_VOLLEYBALL"})}/>
          <View style={styles.spacing}></View>
        <Button title="Basketball Courts" onPress={()=> this.props.navigation.navigate('Games', {location: "WEST_BASKETBALL"})}/>
        <Text style={styles.title}>South Campus</Text>
        <Button title="Pike Field" onPress={()=> this.props.navigation.navigate('Games', {location: "PIKE"})}/>
          <View style={styles.spacing}></View>
        <Button title="Volleyball Courts" onPress={()=> this.props.navigation.navigate('Games', {location: "SOUTH_VOLLEYBALL"})}/>
          <View style={styles.spacing}></View>
        <Button title="Basketball Courts" onPress={()=> this.props.navigation.navigate('Games', {location: "SOUTH_BASKETBALL"})}/>
        <Text style={styles.title}>Main Campus</Text>
        <Button title="Alumni Gym" onPress={()=> this.props.navigation.navigate('Games', {location: "ALUMNI"})}/>
          <View style={styles.spacing}></View>
        <Button title="Austin Field" onPress={()=> this.props.navigation.navigate('Games', {location: "AUSTIN"})}/>
          <View style={styles.spacing}></View>
        <Button title="Tennis Courts" onPress={()=> this.props.navigation.navigate('Games', {location: "MAIN_TENNIS"})}/>
          <View style={styles.spacing}></View>
        <Button title="Basketball Courts" onPress={()=> this.props.navigation.navigate('Games', {location: "MAIN_BASKETBALL"})}/>
      </View>
    );
  }
}

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      location: ""
    };
  }

  componentDidMount() {
    const d = require('./assets/test-data.json');
    const loc = this.props.route.params.location;
    this.setState({
      data: d[loc],
      location: loc
    });
  }

  renderItem = (item) => {
    return( 
      <View style={styles.container}>
        <TouchableOpacity style={styles.gameInfo} onPress={()=>{this.props.navigation.navigate('GameInfo', {gameName: item.name})}}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.title}>{item.date} {item.time}</Text>
          <Text style={styles.title}>{item.sport}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Games Screen</Text>
        <FlatList 
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button title="Create A Game" onPress={() => {this.props.navigation.navigate('CreateGame', {location: this.state.location})}}/>
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

class CreateGameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.route.params.location,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Hello {this.state.location}</Text>
      </View>
    )
  }
}

class GameInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const d = require('./assets/test-data.json');
    const loc = this.props.route.params.gameName;
    this.setState({
      data: d[loc]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Game</Text>
        <Text> 15/22 </Text>
        <Text>Checked In Players: </Text>
        <Text>Player 1 Skill Level</Text>
        <Text>Player 2 Skill Level</Text>
        <Text>Player 3 Skill Level</Text>
        <Text>Competetive</Text>
        <Text>Posted at 4:02 pm</Text>
        <Button title="Join Game"/>
        <Button title="Leave Game"/>
      </View>
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
      location: ""
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Signup" component={SignUpScreen}/>
          <Stack.Screen name="Home" component={LocationScreen}/>
          <Stack.Screen name="Games" component={GameScreen}/>
          <Stack.Screen name="GameInfo" component={GameInfoScreen}/>
          <Stack.Screen name="CreateGame" component={CreateGameScreen}/>
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
    padding: 10
  },
  
  title: {
    fontSize: 30
  },

  spacing:{
    width: 5,
    height: 5
  },

  gameContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  gameInfo: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "blue",
    padding: 25,
  }
});
