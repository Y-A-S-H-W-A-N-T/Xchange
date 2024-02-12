import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native'
import Search from '../assets/search.png'
import Controller from '../assets/controller.jpg'
import axios from 'axios'

export default function Home(props){

  const URL = `http://172.19.78.219:8000/getProducts`

  const [products,setProducts] = useState()
  const [search,setSearch] = useState()

  useEffect(()=>{
    axios.get(URL)
    .then((res)=>{
      setProducts(res.data)
    })
  },[])

  const Search_Product = async()=>{
    Alert.alert("seached for ",search)
  }

  return (
    <View>
      <View style={styles.search_bar}>
        <TextInput style={styles.search} placeholder='search an item' value={search} onChangeText={(text)=>setSearch(text)}/>
        <TouchableOpacity onPress={Search_Product}><Image source={Search} style={styles.search_button}/></TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatlist}
        numColumns={2}
        data={products}
        renderItem={({ item })=>( // using item keyword is necessary
          <TouchableOpacity onPress={()=>props.navigation.navigate('product',{
            product_name: item.product_name,
            product_image: item.product_link,
            product_message: item.product_message,
            product_price: item.product_price
          })}>
            <View style={styles.card}>
              <Image source={{uri: item.product_link}} style={styles.card_image}/>
              <Text>{item.product_name}</Text>
            </View>
          </TouchableOpacity>
        )}  
      />
    </View>
  )
}

const styles = StyleSheet.create({
  search_bar: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  search: {
    padding: 10,
    borderWidth: 5,
    borderColor: 'black',
    width: '60%',
    height: 40,
    marginTop: 5
  },
  search_button: {
    height: 50,
    width: 90
  },
  card: {
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'black',
    width: 180,
    marginHorizontal: 8,
    marginVertical: 10
  },
  card_image: {
    width: '100%',
    height: 200,
  },
  flatlist: {
    marginBottom: 100
  }
})