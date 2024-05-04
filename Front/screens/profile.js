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
import Logout from '../assets/logout.png'

export default function Profile(props){

  const [user_id,setUser_id] = useState('')
  const [profile,setProfile] = useState(null)
  console.log(user_id)

  const [user,setUser] = useState({
    name: '',
    pfp_link: ''
  })
  const [loading,setLoading] = useState(true)

  const URL = `/upload_profile_pic`

  const user_URL = `/userDetails`

  useEffect(()=>{
    async function Get_Async_Storage(){  // fetching user id from AsyncStorage
      try {
        const value = await AsyncStorage.getItem('userID')
        if (value) {
          setUser_id(value)
          axios.post(user_URL,{id: value})
          .then((res)=>{
            console.log("DATA - ",res.data)
            setProfile(res.data)
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


  //////////////////////////////////////////////////  ADD BUYER'S DETAIL ON PRODUCT SECTION AND ALSO MARK THE PRODUCT

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
      {loading && <Text style={styles.loadingText}>LOADING.............</Text>}
      <View style={{marginLeft: 'auto',padding: 10}}>
        <TouchableOpacity onPress={LogOut}>
          <Image source={Logout} style={styles.logout}/>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <View style={styles.profile_box}>
          {!user.pfp_link && <Image source={Pic} style={styles.profile_pic}/>}
          {user.pfp_link && <Image source={{uri: user.pfp_link}} style={styles.profile_pic}/>}
        </View>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={SelectImage}>
        <Text>edit✏️</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text style={styles.nameText}>{user.name}</Text>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('myproducts', {profile: profile})}>
          <Text style={styles.buttonText}>My Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  box: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  profile_box: {
    alignItems: 'center',
  },
  profile_pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F05454',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  logout: {
    height: 50,
    width: 50
  }
})