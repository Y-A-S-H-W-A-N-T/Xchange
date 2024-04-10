import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as SMS from 'expo-sms'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Product(props){

  const [number,setnumber] = useState('')
  const [message,setmessage] = useState('')
  const [user,setuser] = useState('')

  const product = props.route.params.product

  const URL = `/userDetails`

  useEffect(()=>{
    async function Get_Async_Storage(){
      try {
        const value = await AsyncStorage.getItem('userID')
        setuser(value)
      } catch (e) {
        console.log("Unable to fetch user id from Async Storage ->",e)
      }
    }
    Get_Async_Storage()
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
        <Button
          title='CHAT WITH OWNER'
          onPress={()=>props.navigation.navigate('chat',{userId : user, ownerId: product.product_owner})}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  
})