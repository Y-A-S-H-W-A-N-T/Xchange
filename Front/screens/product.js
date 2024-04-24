import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Message from '../assets/message.png'
import Package from '../assets/package.png'
import * as SMS from 'expo-sms'
import { LinearGradient } from 'expo-linear-gradient';
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
        "Ask this product by sending SMS to the owner",
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

  const currentDate = new Date()
  const min = currentDate.getMinutes();

  return (
    <LinearGradient
      colors={['#fff','#fff','#f48282']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{product.product_name}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.product_link }}
            style={styles.image}
          />
          <View style={styles.time_info}>
            <Text style={styles.date}>{product.upload_date} / {product.upload_month} / 2024</Text>
            <Text style={styles.time}>{product.upload_time} : {product.upload_min} hrs</Text>
          </View>
        </View>
        <Text style={styles.description}>{product.product_message}</Text>
        <Text style={styles.price}>₹{product.product_price}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={Send_SMS}
        >
          <Image
            style={styles.book_logo}
            source={Package}
          />
          <Text style={styles.buttonText}>Ask for Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('chat', { userId: user, ownerId: product.product_owner, productId: product._id })}
        >
          <Image
            style={styles.message_logo}
            source={Message}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F05454', // Text color for better visibility
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#463d4a'
  },
  image: {
    alignSelf: 'center',
    height: 300,
    aspectRatio: 1, // Maintain aspect ratio
    resizeMode: 'cover', // Resize the image to cover its container
    marginBottom: 10,
    borderRadius: 10, // Add border radius for rounded corners
    borderWidth: 3, // Add border width for styling
    borderColor: 'black', // Add border 
    elevation: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#84df4c'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d75228',
    padding: 5,
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
    color: '#463d4a',
    fontWeight: 'bold',
    borderBottomWidth: 1
  },
  time: {
    fontSize: 16,
    color: '#463d4a',
    marginLeft: 'auto',
    fontWeight: 'bold',
    borderBottomWidth: 1
  },
  message_logo: {
    height: 60,
    width: 60,
    marginLeft: 20,
    marginLeft: 'auto',
    marginTop: '20%'
  },
  book_logo: {
    height: 40,
    width: 40,
    marginLeft: '25%',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 1000,
    backgroundColor: '#d75b57',
    paddingTop: 5
  },
  time_info: {
    flexDirection: 'row',
  }
})
