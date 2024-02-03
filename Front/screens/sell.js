import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { StackActions } from '@react-navigation/native' // replace this screem after the user uploads the product
export default function Role(props){

    const [image,setImage] = useState('')

    const SelectImage = async () => {
        const { permission } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true
        })
        setImage(response.assets[0].uri)
      }


  return (
    <View>
        <Text>SELL YOUR PRODUCT HERE</Text>
        <TouchableOpacity onPress={SelectImage}><Text>SELECT IMAGE</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  
})