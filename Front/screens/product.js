import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import Search from '../assets/search.png'
import Controller from '../assets/controller.jpg'
import axios from 'axios'

export default function Product(props){


  return (
    <View>
        <Text>{props.route.params.product_name}</Text>
        <Text>{props.route.params.product_message}</Text>
        <Image
            source={{uri: props.route.params.product_image}}
            style={{height: 300, width: 300}}
        />
        <Text>{props.route.params.product_price}</Text>
        <Button 
            title='Ask for Product'
            onPress={()=>Alert.alert("Send SMS to the owner of the product")}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  
})