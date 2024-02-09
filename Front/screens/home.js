import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { StackActions } from '@react-navigation/native'
import Search from '../assets/search.png'
import Controller from '../assets/controller.jpg'

export default function Home(props){


  return (
    <View>
      <View style={styles.search_bar}>
        <TextInput style={styles.search}/><TouchableOpacity><Image source={Search} style={styles.search_button}/></TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
        <View style={styles.card}><Image source={Controller} style={styles.card_image}/></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  search_bar: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  search: {
    padding: 10,
    borderWidth: 5,
    borderColor: 'black',
    width: '60%',
    height: 40,
    marginTop: 5
  },
  search_button: {
    height: 50,
    width: 90
  },
  card: {
    alignItems: 'center'
  },
  card_image: {
    borderWidth: 5,
    borderColor: 'black',
    marginTop: 20
  }

})