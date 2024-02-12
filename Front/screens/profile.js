import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Pic from '../assets/user.png'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"
import { storage } from '../config'
import axios from 'axios'

export default function Profile(props){

  const [user_id,setUser_id] = useState('')
  console.log(user_id)

  const [user,setUser] = useState({
    name: '',
    pfp_link: ''
  })
  const [loading,setLoading] = useState(true)

  const URL = `http://172.19.78.219:8000/upload_profile_pic`

  const user_URL = `http://172.19.78.219:8000/userDetails`

  useEffect(()=>{
    async function Get_Async_Storage(){  // fetching user id from AsyncStorage
      try {
        const value = await AsyncStorage.getItem('userID')
        if (value) {
          setUser_id(value)
          axios.post(user_URL,{id: value})
          .then((res)=>{
            console.log("DATA - ",res.data)
            setUser((prev)=>({...prev,name: res.data.username,pfp_link: res.data.profilePic_link}))
            setLoading(false)
          })
          .catch((err)=>{
            Alert.alert(err)
          })
        }
      } catch (e) {
        console.log("Unable to fetch user id from Async Storage ->",e)
      }
    }
    Get_Async_Storage()
  },[])


  

  const [image,setImage] = useState('')
  const [url,setUrl] = useState('')

  async function SelectImage(){
    const { permission } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true
    })
    console.log(response)
    setImage(response.assets[0].uri)
    if(!response.assets[0].uri){
      Alert.alert("Select image again")
      setLoading(false)
      await SelectImage()
      setImage(response.assets[0].uri)
    }
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
        const Img_ref = ref(storage,'picture')
        const uploadProfile_Pic = ()=>{
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
        }
        uploadProfile_Pic()
        console.log('PIC - ',url)
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
                uploadProfile_Pic()
                if(!url){
                  Alert.alert("Upload Again")
                  uploadProfile_Pic()
                  return
                }
                // Uploading Profile Picture
                await axios.post(URL,{
                  id: user_id,
                  link: url
                })
                
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




















  const LogOut = async()=>{
    AsyncStorage.clear()
    console.log("XXXXXXXXXXX LOG OUT XXXXXXXXXXX")
    props.navigation.dispatch(
      StackActions.replace('login')//pass parameters
    )
  }

  return (
    <View>
      {loading && <Text style={styles.text}>LOADING.............</Text>}
      <View style={styles.box}>
        <View style={styles.profile_box}>
          {!user.pfp_link && <Image source={Pic} style={styles.profile_pic}/>}
          {user.pfp_link && <Image source={{uri : user.pfp_link}} style={styles.profile_pic}/>}
        </View>
      </View>
      <TouchableOpacity style={{alignItems: 'center'}} onPress={SelectImage}>
        <Text>edit✏️</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text>{user.name}</Text>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.logout_button}>
          <Text style={styles.text}>My Products</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity onPress={LogOut} style={styles.logout_button}>
          <Text style={styles.text}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logout_button: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'black',
    width: '50%'
  },
  text: {
    fontSize: 25
  },
  box: {
    alignItems: 'center',
    marginTop: 50,
  },
  profile_pic: {
      height: 100,
      width: 100,
  },
  profile_box: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 100,
    width: '27%',
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: 'black',
  }
})