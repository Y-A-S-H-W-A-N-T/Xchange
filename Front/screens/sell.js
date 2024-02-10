import { View, Image, StyleSheet, Text, TouchableOpacity, Button, Alert, TextInput} from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import axios from 'axios'
import { StackActions } from '@react-navigation/native' // replace this screem after the user uploads the product
import * as FileSystem from 'expo-file-system'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { storage } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Sell(props){


    // Fetching user id from Async Storage

  const [user_id,setUser_id] = useState()

  async function Get_Async_Storage(){
    try {
      const value = await AsyncStorage.getItem('userID')
      if (value !== null) {
        setUser_id(value)
      }
    } catch (e) {
      console.log("Unable to fetch user id from Async Storage",e)
    }
  }
  Get_Async_Storage()

  console.log("Fetching user id from Async Storage",user_id)

  
    const URL = `http://172.19.78.219:8000/upload_Product`

    const [image,setImage] = useState('')
    const [url,setUrl] = useState('')
    const [Product_Details,setProduct_Details] = useState({
      product_name: '',
      product_link: '',
      product_price: '',
      product_message: ''
    })

    async function SelectImage(){
        const { permission } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true
        })
        setImage(response.assets[0].uri)
      }     

      async function Add_Image(){
        try{
          const { uri } = await FileSystem.getInfoAsync(image)
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          })
          const filename = image.substring(image.lastIndexOf('/'+ 1))
          const Img_ref = ref(storage,Product_Details.product_name)
          uploadBytes(Img_ref,blob)
          .then(async(res)=>{
              await getDownloadURL(res.ref)
              .then((link)=>{
                setUrl(link)
              })
              .catch((err)=>{
                Alert.alert(err)
                console.log(err)
              })
          })
          console.log('LINK - ',url)
          Alert.alert(url)
          setProduct_Details((prev)=>({...prev,product_link: url}))
        }
        catch(err){
          console.log(err)
        }
      }
      console.log("Product_Details - ",Product_Details)


      const Upload = ()=>{
        axios.post(URL,Product_Details)
      }


  return (
    <View>
        <Text>SELL YOUR PRODUCT HERE</Text>
        <TextInput placeholder='Name of the Product' onChangeText={(text)=> setProduct_Details((prev)=>({...prev,product_name: text}))}/>
        <TouchableOpacity onPress={SelectImage}><Text>SELECT IMAGE</Text></TouchableOpacity>
        { image && <Image source={{uri: image}} style={{height: 250,width: 350}}/> }
        <Button
          onPress={Add_Image}
          title="UPLOAD IMAGE"
          color="#841584"
        />
        <TextInput placeholder='Price' onChangeText={(text)=> setProduct_Details((prev)=>({...prev,product_price: text}))}/>
        <TextInput placeholder='Add a message' onChangeText={(text)=> setProduct_Details((prev)=>({...prev,product_message: text}))}/>
        <Button
          onPress={Upload}
          title="Upload Product"
          color="#841584"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  
})