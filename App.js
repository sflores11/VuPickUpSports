import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

class LocationScreen extends Component{

  render(){
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

export default function App() {
  return (
    <View style={styles.container}>
      <LocationScreen></LocationScreen>
    </View>
  );
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
