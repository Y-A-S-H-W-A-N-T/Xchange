import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile(props){


  const LogOut = async()=>{
    AsyncStorage.clear()
    console.log("XXXXXXXXXXX LOG OUT XXXXXXXXXXX")
    props.navigation.dispatch(
      StackActions.replace('login')//pass parameters
    )
  }

  return (
    <View>
      <Text>PROFILE PAGE</Text>
      <TouchableOpacity onPress={LogOut}><Text>LOG OUT</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  
})