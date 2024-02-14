import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import Search from '../assets/search.png'
import Controller from '../assets/controller.jpg'
import axios from 'axios'
import * as SMS from 'expo-sms'

export default function Product(props){

  const [number,setnumber] = useState('')
  const [message,setmessage] = useState('')

  const product = props.route.params.product

  const URL = `http://172.19.78.219:8000/userDetails`

  useEffect(()=>{
    const result = axios.post(URL,{id: product.product_owner})  // Fetching owner's phone number
    result.then((res)=>setnumber(res.data.phone))
  },[])

  const Send_SMS = async()=>{
    const isAvailable = await SMS.isAvailableAsync();
    setmessage(`Product Name - ${product.product_name}\n Price - ${product.product_price}`)   // Send user name ( person who is buying the product )
    if (isAvailable) {
      Alert.alert(
        "SMS",
        "send a sms to the owner",
        [
           {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
           },
           {
            text: "Confirm",
            onPress: async() => await SMS.sendSMSAsync(number,message)   // Sending SMS
           }
        ],
        { cancelable: false }
     )
    } else {
      Alert.alert("Sms is NOT available")
    }
  }

  return (
    <View>
        <Text>{product.product_name}</Text>
        <Text>{product.product_message}</Text>
        <Image
            source={{uri: product.product_link}}
            style={{height: 300, width: 300}}
        />
        <Text>{product.product_price}</Text>
        <Button 
            title='Ask for Product'
            onPress={Send_SMS}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  
})