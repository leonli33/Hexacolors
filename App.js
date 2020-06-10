import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './Screens/StartScreen'

export default function App() {
  return (
      <StartScreen></StartScreen>    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
