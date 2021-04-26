import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Image, StyleSheet, Text, Switch, TextInput, View, Button, FlatList, TouchableWithoutFeedback, Keyboard, Alert, Vibration} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class HomeScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: null,
      skillBasketball: null,
      skillSoccer: null,
      skillVolleyball: null,
      skillTennis: null,
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const skillBasketball = await AsyncStorage.getItem('skillBasketball');
      const skillSoccer = await AsyncStorage.getItem('skillSoccer');
      const skillTennis = await AsyncStorage.getItem('skillTennis');
      const skillVolleyball = await AsyncStorage.getItem('skillVolleyball');
      this.setState({
        email: email,
        name: name,
        skillBasketball: skillBasketball,
        skillSoccer: skillSoccer,
        skillTennis: skillTennis,
        skillVolleyball: skillVolleyball
      });
    } catch(e) {
      console.log(e);
    }
  }  

  setValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch(e) {
      console.log(e);
    }
  }

  render(){
    return(
      <Swiper>
        <View style={styles.container}>
          <Text style={styles.title2}>Where would you like to play?</Text>
		      <Text style={styles.title}></Text>
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
        <View style={styles.profileScreen}>
          <Text style={{fontSize: 40, color: 'navy'}}>Profile Screen</Text>
          <View alignItems="center">

            {/*NAME*/}
            <Text style={styles.h2}>Name: {this.state.name}</Text> 
            <View style={styles.row}>
              <TextInput 
                style={styles.h2} 
                textAlign="center"
                placeholder="Edit Name"
                onChangeText={(text) => {this.setState({name: text});}}
              />
                <View style={styles.spacing}></View>
              <Button title="Submit" onPress={() => this.setValue('name', this.state.name)}/>
            </View>
          </View>

          {/*EMAIL*/}
          <Text style={styles.h2}>Email: {this.state.email}</Text> 
          <Image source={require('./images/villanovalogo.png')} style={{width: 250, height: 200}} />
          <Text style={styles.title3}>My Skills</Text>
          <View alignItems="center">

            {/*BASKETBALL SKILL LEVEL*/}
            <Text style={styles.h2}>Basketball Skill: {this.state.skillBasketball}/10</Text>
            <View style={styles.row}>
              <TextInput 
                style={styles.h2} 
                textAlign="center"
                placeholder="Edit Skill Level"
                onChangeText={(text) => {this.setState({skillBasketball: text});}}
              />
                <View style={styles.spacing}></View>
              <Button title="Submit" onPress={() => this.setValue('skillBasketball', this.state.skillBasketball)}/>
            </View>

            {/*SOCCER SKILL LEVEL*/}
            <Text style={styles.h2}>Soccer Skill: {this.state.skillSoccer}/10</Text>
            <View style={styles.row}>
              <TextInput 
                style={styles.h2} 
                textAlign="center"
                placeholder="Edit Skill Level"
                onChangeText={(text) => {this.setState({skillSoccer: text});}}
              />
                <View style={styles.spacing}></View>
              <Button title="Submit" onPress={() => this.setValue('skillSoccer', this.state.skillSoccer)}/>
            </View>

            {/*VOLLEYBALL SKILL LEVEL*/}
            <Text style={styles.h2}>Volleyball Skill: {this.state.skillVolleyball}/10</Text>
            <View style={styles.row}>
              <TextInput 
                style={styles.h2} 
                textAlign="center"
                placeholder="Edit Skill Level"
                onChangeText={(text) => {this.setState({skillVolleyball: text});}}
              />
                <View style={styles.spacing}></View>
              <Button title="Submit" onPress={() => this.setValue('skillVolleyball', this.state.skillVolleyball)}/>
            </View>

            {/*TENNIS SKILL LEVEL*/}
            <Text style={styles.h2}>Tennis Skill: {this.state.skillTennis}/10</Text>
            <View style={styles.row}>
              <TextInput 
                style={styles.h2} 
                textAlign="center"
                placeholder="Edit Skill Level"
                onChangeText={(text) => {this.setState({skillTennis: text});}}
              />
                <View style={styles.spacing}></View>
              <Button title="Submit" onPress={() => this.setValue('skillTennis', this.state.skillTennis)}/>
            </View>
          </View>
        </View>
      </Swiper>
    );
  }
}

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      location: "",
    };
  }

  componentDidMount() {
    console.log('Hello from outerspace');
    this.findLocalGames();
  }

  componentDidUpdate() {
    this.findLocalGames();
  }

  findLocalGames = async() => {
    let games = [];
    const d = require('./assets/test-data.json');
    const loc = this.props.route.params.location;
    games = d[loc];
    try {
      const gameID = await AsyncStorage.getItem('gameID');
      if(gameID != null){
        const ID = parseInt(gameID);
        for (let i = 0; i < ID; i++) {
          let gameKey = i.toString();
          const localGame = await AsyncStorage.getItem(gameKey);
          if(localGame != null ){
            const game = JSON.parse(localGame);
            if(game.location == loc){
              let displayed = false;
              for (let j = 0; j < games.length; j++) {
                if(games[j].id == game.id){
                  displayed = true;
                }
              }
              if(!displayed){
                games.push(game);
              }
            }
          }
        }
      }
    } catch(e) {
      console.log(e);
    }    

    this.setState({
      data: games,
      location: loc
    });
  }

  renderItem = (item) => {
    return( 
      <View style={styles.container}>
        <TouchableOpacity style={styles.gameInfo} onPress={()=>{this.props.navigation.navigate('GameInfo', {game: item})}}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.title}>Date: {item.date} {item.time}</Text>
          <Text style={styles.title}>{item.sport}</Text>
          <Text style={styles.title}>{item.players}/{item.players_needed}</Text>
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
      <View style={styles.container2}>
        <Image source={require('./images/logo.png')} style={{width: 400, height: 300, marginTop: 10}} />
        <Text style={styles.title3}>Log In</Text>
        <TextInput name='email' value={this.state.email} placeholder='Enter Email' onChangeText={this.handleEmailChange}/>
        <TextInput name='password' value={this.state.password} placeholder='Enter Password' onChangeText={this.handlePasswordChange}/>
        <Button title="Submit" onPress={()=> this.login(this.state.email, this.state.password)}/>
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
      <View style={styles.container2}>
        <Image source={require('./images/logo.png')} style={{width: 400, height: 300}} />
        <Text style={styles.title3}> Create your account: </Text>
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
      total_players: null,
      players: null,
      competative: false,
      isVisible: false,
      date: new Date(),
      selectedSport: null,
    }
  }

  setSport = (val) => {
    this.setState({
      selectedSport: val
    });
  }

  showPicker = () => {
    this.setState({
      isVisible: true
    });
  }

  hidePicker = () => {
    this.setState({
      isVisible: false
    });
  }

  handleDate = (date) => {
    this.setState({
      date: date
    });
    this.hidePicker();
  }

  createGame = async() => {
    if (!this.state.selectedSport) {
      Alert.alert('Alert', 'Must select a sport');
      return;
    }
    if (!this.state.total_players) {
      Alert.alert('Alert', 'Must have total players needed');
      return;
    }
    if (!this.state.players) {
      Alert.alert('Alert', 'Must have amount of players needed');
      return;
    }
    let date_data = this.state.date;
    var tod = "am";
    let a = date_data.getMonth() + 1; 
    let b = date_data.getDate();
    let date = a + "/" + b; 
    let c = this.state.date.getHours();
    if ( c === 0 ) {
      c = 12;
    }
    else if( c >= 12) {
      tod = "pm";
      c = c-12;
      if ( c === 0 ) {
        c = 12;
      }
    }
    let d = this.state.date.getMinutes();
    let time = c + ':' + d + tod;
    let newGameID = null;
    let newGameName = null;
    let gameID = null;

    try {
      gameID = await AsyncStorage.getItem('gameID');
    } catch(e) {
      console.log(e);
    }

    if(gameID == null){
      gameID = 0;
    }else{
      gameID = parseInt(gameID);
    }

    newGameID = gameID.toString();
    newGameName = "Game " + newGameID; //Add an option for user to choose name?
    gameID++;

    try {
      await AsyncStorage.setItem('gameID', gameID.toString());
    } catch(e) {
      console.log(e);
    }

    console.log(typeof newGameID);
    const data = {
      'id': gameID,
      'name': newGameName,
      'location': this.state.location,
      'players_needed': this.state.total_players,
      'players': this.state.total_players - this.state.players,
      'competative': this.state.competative,
      'date': date,
      'time': time,
      'sport': this.state.selectedSport,
      'posted': new Date(),
    };

    try {
      const newGame = JSON.stringify(data);
      await AsyncStorage.setItem(newGameID, newGame);
      console.log(data);

    } catch(e) {
      console.log(e);
    }
    this.props.navigation.navigate('Games');
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container2}>
          <Image source={require('./images/wildcat.png')} style={{width: 250, height: 200}} />
          <Button title='Select Date and Time' onPress={this.showPicker}/>
          <DateTimePickerModal
            isVisible={this.state.isVisible}
            mode='datetime'
            minuteInterval={15}
            onConfirm={this.handleDate}
            onCancel={this.hidePicker}
            is24Hour={false}
          />
          <Text style={styles.title3}>{this.state.date.toDateString()}</Text>
          <Text style={styles.title3}>{this.state.date.toTimeString()}</Text>
          <RNPickerSelect
            style={{            
              inputIOS: {
                alignSelf: 'center',
                padding: 10
              }
            }}
            placeholder={{ label: 'Select Sport', value: null}}
            onValueChange={(value) => {this.setSport(value)}}
            items={[
              { label: 'Soccer', value: 'Soccer'},
              { label: 'Volleyball', value: 'Volleyball'},
              { label: 'Basketball', value: 'Basketball'},
              { label: 'Tennis', value: 'Tennis'},
            ]}
          />
          <Text style={styles.title3}>Total Players?</Text>
          <TextInput value={this.state.total_players} name='total_players' placeholder={'Enter Number'} keyboardType='numeric' onChangeText={(text) => {this.setState({total_players: text})}}/>
          <Text style={styles.title3}>Players Needed?</Text>
          <TextInput value={this.state.players} name='players' placeholder={'Enter Number'} keyboardType='numeric' onChangeText={(text) => {this.setState({players: text})}}/>
          <Text style={styles.title3}>Competetive?</Text> 
          <Switch 
            onValueChange={(val) => {this.setState({competative: val})}} 
            value={this.state.competative}
            trackColor={{ false: '#767577', true: '#81b0ff'}}
          />
          <Button title="Create Game!" onPress={() => this.createGame()}/>
        </View>
      </DismissKeyboard>
    )
  }
}

class GameInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      players: null,
      joinShow: true,
      leaveShow: false,
    };
  }

  setLeaveShow = async(val) => {
    try {
      if(val) {
        await AsyncStorage.setItem('leaveShow', 'true');
      }
      else {
        await AsyncStorage.setItem('leaveShow', 'false');
      }
    } catch(e) {
      console.log(e);
    }
  }

  getLeaveShow = async() => {
    try {
      const show = await AsyncStorage.getItem('leaveShow');
      if(show === 'true') {
        this.setState({
          leaveShow: true,
          joinShow: false,
        })
      } else {
        this.setState({
          leaveShow: false,
          joinShow: true,
        })
        return false;
      }
    } catch(e) {
      console.log(e);
    }
  }

  componentDidMount() {
    const game = this.props.route.params.game;
    this.getLeaveShow();
    this.setState({
      data: game,
      players: game.players,
      total_players: game.players_needed,
    });
  }

  handleJoin = () => {
    this.setLeaveShow(true);
    this.setState({
      joinShow: false,
      leaveShow: true,
    });
    if(this.state.players + 1 <= this.state.total_players) {
      this.setState({players: this.state.players + 1}, () => this.addPlayer());
    } else {
      Alert.alert('Alert', 'This game is full sorry :(');
    }
  }

  handleLeave = () => {
    this.setLeaveShow(false);
    this.setState({
      joinShow: true,
      leaveShow: false,
    });
    if(this.state.players - 1 > 0) {
      this.setState({players: this.state.players - 1}, () => this.removePlayer());
    } else {
      Alert.alert('Alert', 'This game needs atleast one player');
    }
  }

  renderItem = (item) => {
    return(
      <View>
        <Text style={{paddingBottom: 15}}>{item.name} Skill: {item.skill}</Text>
      </View>   
    );
  }

  addPlayer = async() => {
    try {
      const gameId = (this.state.data.id - 1).toString();
      AsyncStorage.getItem(gameId).then( async(data) => {
        console.log('potatoes');
        console.log(data);
        data = JSON.parse(data);
        console.log(data);
        data.players++;
        console.log(data);
        await AsyncStorage.setItem(gameId, JSON.stringify(data));
      }).done();
    } catch(e) {
      console.log(e);
    }
  }

  removePlayer = async() => {
    
  }

  render() {
    console.log(this.state.data);
    console.log(this.state.players);
    const data = this.state.data;
    const p_data = [
      {
        "name": "Andrew",
        "skill": 6
      },
      {
        "name": "Sebastian",
        "skill": 7
      },
      {
        "name": "Justin",
        "skill": 7
      }
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.title4}>{data.sport}</Text>
        <Text style={styles.title4}>Players: {this.state.players}/{data.players_needed}</Text>
        <Text style={styles.title4}> Time: {data.time}</Text>
        <Text style={styles.title4}> Day: {data.date}</Text>
        {data.competative ? (
          <Text style={styles.title4}>Competative</Text>
        ): (<Text style={styles.title4}>Not Competative</Text>)}
        <Text style={styles.title4}>Checked In Players: </Text>
        <FlatList data={p_data} renderItem={({item}) => this.renderItem(item)} keyExtractor={(item, index) => index.toString()}/>
        <Text style={styles.title4}> Posted at {data.posted}</Text>
        {this.state.joinShow ? (
          <Button title="Join Game" onPress={()=>{this.handleJoin()}}/>
        ) : null}
        {this.state.leaveShow ? (
          <Button title="Leave Game" onPress={()=>{this.handleLeave()}}/>
        ) : null}
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

  clear = async() => {

  }
  componentDidMount() {

  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
          <Stack.Screen options={{headerShown: false}} name="Signup" component={SignUpScreen}/>
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
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
    backgroundColor: '#001F5B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  
  container2: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10
  },

  profileScreen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10
  },

  row: {
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  
  title: {
    fontSize: 30,
	color: "white",
  },
  
    title2: {
    fontSize: 33,
	color: "white",
  },
  
   title3: {
    fontSize: 30,
	color: "navy",
  },
  
   title4: {
    fontSize: 20,
	color: "white",
  },

  h2: {
    fontSize: 20,
    color: "navy",
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
  },
});
