import { View, Image, StyleSheet, Text, TouchableOpacity, Button, Alert, TextInput} from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import axios from 'axios'
import { StackActions } from '@react-navigation/native' // replace this screem after the user uploads the product
import * as FileSystem from 'expo-file-system'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { storage } from '../config'


export default function Role(props){


    Alert.alert(props.route.params.id)

    const URL = `http://172.19.78.219:8000/image`
    const [image,setImage] = useState('')
    const [url,setUrl] = useState('')
    const [Product_Name,setProductName] = useState('')

    async function SelectImage(){
        const { permission } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true
        })
        setImage(response.assets[0].uri)
      }     

      async function Upload(){
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
          const Img_ref = ref(storage,Product_Name)
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
        }
        catch(err){
          console.log(err)
        }
      }


  return (
    <View>
        <Text>SELL YOUR PRODUCT HERE</Text>
        <TextInput placeholder='Name of the Product' onChangeText={(text)=> setProductName(text)}/>
        <TouchableOpacity onPress={SelectImage}><Text>SELECT IMAGE</Text></TouchableOpacity>
        <Button
          onPress={Upload}
          title="UPLOAD IMAGE"
          color="#841584"
        />
        { image && <Image source={{uri: image}} style={{height: 250,width: 350}}/> }
    </View>
  )
}

const styles = StyleSheet.create({
  
})