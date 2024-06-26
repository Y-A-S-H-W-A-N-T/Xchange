import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import SELL from '../assets/sell.png'
import BUY from '../assets/buy1.png'
import SKIP from '../assets/skip.png'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'

export default function Role(props){

  const Skip = (e)=>{
    e.preventDefault()
    props.navigation.dispatch(
      StackActions.replace('main')//pass parameters
    )
  }

  return (
    <View>
      <View style={styles.card}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('sell')}>
          <Image
            style={styles.sell}
            source={SELL}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Sell a product!!</Text>
      </View>
      <TouchableOpacity style={styles.skip} onPress={(e)=>Skip(e)}>
        <Image
          source={SKIP}
          style={styles.skip_button}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  sell: {
    height: 150,
    width: 200,
    borderRadius: 30,
    borderWidth: 7,
    borderColor: 'black'
  },
  buy: {
    height: 150,
    width: 200,
    borderRadius: 30,
    borderWidth: 7,
    borderColor: 'black'
  },
  card:{
    borderRadius: 30,
    marginTop: 100,
    marginLeft: 20,
    flexDirection: 'row',
  },
  text:{
    color: 'green',
    marginTop: '18%',
    margin: 30
  },
  skip:{
    marginTop: '20%',
    marginLeft: '40%'
  },
  skip_button:{
    height: 50,
    width: 70
  }
})