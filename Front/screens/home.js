import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import SELL from '../assets/sell.png'
import BUY from '../assets/buy1.png'
import React from 'react'

export default function Home(){
  return (
    <View>
      <View style={styles.card}>
        <TouchableOpacity>
          <Image
            style={styles.sell}
            source={SELL}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Sell a product</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.text}>Buy a product</Text>
        <TouchableOpacity>
          <Image
            style={styles.buy}
            source={BUY}
          />
        </TouchableOpacity>
      </View>
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
    marginTop: 130,
    marginLeft: 20,
    flexDirection: 'row',
  },
  text:{
    color: 'green',
    marginTop: '18%',
    margin: 30
  }
})