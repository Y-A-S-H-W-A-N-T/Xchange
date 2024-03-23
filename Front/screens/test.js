import { View, Image, StyleSheet, Text, TouchableOpacity, Button, Alert, TextInput} from 'react-native'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export default function Test(props){

    const [image,setImage] = useState(null)

    async function SelectImage(){
        const { permission } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true
        })
        setImage(response.assets[0].uri)
        const formData = new FormData()
        formData.append("image", {
          uri: response.assets[0].uri,
          type: 'image/jpeg/jpg/png',
          name: 'test'
        });
        await axios.post(`http://172.19.76.245:8000/uploadImage`,formData)
        .then((res)=>{
            console.log(res)
        })
      }   

      const URL = `http://172.19.76.245:8000/uploadImage`
      console.log(image)

      async function Add_Image(){
        
        
      }
  return (
    <View>
        <TouchableOpacity onPress={SelectImage}><Text>SELECT IMAGE</Text></TouchableOpacity>
        { image && <Image source={{uri: image}} style={{height: 250,width: 350}}/> }
        <Button
          onPress={Add_Image}
          title="UPLOAD IMAGE"
          color="#841584"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  
})