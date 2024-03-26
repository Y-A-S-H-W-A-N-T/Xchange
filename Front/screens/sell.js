import { View, Image, StyleSheet, Text, TouchableOpacity, Button, Alert, TextInput} from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { StackActions } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { storage } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Sell(props){

    const URL = `/upload_Product`

    const [user_id,setUser_id] = useState()
    const [image,setImage] = useState('')
    const [url,setUrl] = useState('')
    const [Product_Details,setProduct_Details] = useState({
      product_name: '',
      product_link: '',
      product_price: '',
      product_message: '',
      product_owner: ''
    })

    useEffect(()=>{

      // Fetching user id from Async Storage
        
      async function Get_Async_Storage(){
        try {
          const value = await AsyncStorage.getItem('userID')
          if (value !== null) {
            setUser_id(value)
            setProduct_Details((prev)=>({...prev,product_owner: value}))
          }
        } catch (e) {
          console.log("Unable to fetch user id from Async Storage ->",e)
        }
      }
      Get_Async_Storage()
    
      console.log("Fetching user id from Async Storage",user_id)
      console.log("Product_Details - ",Product_Details)
    },[user_id])

    async function SelectImage(){
        const { permission } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true
        })
        setImage(response.assets[0].uri)
        Add_Image()
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
          const upload_to_firebase = async()=>{
            const Img_ref = ref(storage,Product_Details.product_name)
            await uploadBytes(Img_ref,blob)
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
          }
          upload_to_firebase()
          if(!url)
          {
            upload_to_firebase()
          }
          console.log('came HERE ------------------------------------------------ ',url)
          setProduct_Details((prev)=>({...prev,product_link: url}))
          if(Product_Details.product_link.length<5)
          {
            upload_to_firebase()
          }
          Alert.alert(
            "Hi",
            "Upload Picture?",
            [
               {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
               },
               {
                text: "Confirm",
                onPress: async() =>{
                  Alert.alert("Upload image - ",url)
                  upload_to_firebase()
                }
               }
            ],
            { cancelable: false }
         )
        }
        catch(err){
          console.log(err)
        }
      }

      // Uploading Product to Mongodb Atlas

      const Upload = async()=>{ 
        axios.post(URL,Product_Details)
        props.navigation.dispatch(
          StackActions.replace('main')
        )
      }


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.info}>
            You can upload Product which will be visible to the users of this app. They can request you for your Product.
        </Text>
      </View>
        <View style={styles.Product_name}>
          <TextInput style={styles.input} placeholder='Name of the Product' onChangeText={(text)=> setProduct_Details((prev)=>({...prev,product_name: text}))}/>
        </View>
        <View  style={styles.Details}>
          <TextInput style={styles.input} placeholder='Price' onChangeText={(text)=> setProduct_Details((prev)=>({...prev,product_price: text}))}/>
          <TextInput style={styles.input} placeholder='Add a message' onChangeText={(text)=> setProduct_Details((prev)=>({...prev,product_message: text}))}/>
        </View>
        <View  style={styles.Select_Image}>
          <TouchableOpacity onPress={SelectImage}><Text style={styles.selectImageText}>SELECT IMAGE</Text></TouchableOpacity>
        </View>
        <View style={styles.Image}>
          { image && <Image source={{uri: image}} style={styles.imageStyle}/> }
        </View>
        {
          image && !url &&
          <View style={styles.Upload_Image}>
            <TouchableOpacity onPress={Add_Image} style={styles.Upload_Product}>
                <Text>Upload Image </Text>
            </TouchableOpacity>
          </View>
        }
        {
          url &&
          <View style={styles.Upload_Button}>
            <TouchableOpacity onPress={Upload} style={styles.Upload_Product}>
                  <Text style={styles.sell}>SELL 📦</Text>
            </TouchableOpacity>
          </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Product_name: {
    marginBottom: 0,
  },
  input: {
    borderWidth: 2,
    borderColor: '#121212',
    padding: 10,
    width: 'auto',
    marginBottom: 10,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#F05454',
    elevation: 20,
  },
  Select_Image: {
    marginBottom: 20,
  },
  selectImageText: {
    color: '#F05454',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#121212',
    borderWidth: 2,
    padding: 10,
    borderColor: 'white',
    textAlign: 'center',
    elevation: 10,
  },
  Image: {
    marginBottom: 20,
  },
  imageStyle: {
    height: 250,
    width: 350,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#F05454'
  },
  Upload_Image: {
    marginBottom: 20,
  },
  Details: {
    marginBottom: 20,
  },
  Upload_Button: {
    marginBottom: 20,
  },
  Upload_Product: {
    backgroundColor: '#F05454',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#121212',
    elevation: 10,
  },
  info: {
    textAlign: 'center',
    color: '#121212',
    fontSize: 16,
    marginTop: -100,
  },
  sell:{
    fontSize: 20,
    color: '#F5F5F5'
  }
});
