import { View, Image, StyleSheet, Text, TouchableOpacity, Button, Alert, TextInput, FlatList} from 'react-native'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import Add from '../assets/add.png'
import Delete from '../components/delete'

export default function MyProducts(props){

  const profile = props.route.params.profile
  const [showProd,setShowProd] = useState(false)
  const [longPress,setLongPress] = useState(false)
  const [products,setProducts] = useState(null)
  const [delete_Product,setDelete_Product] = useState('')

  const setPress = ()=>{
    setLongPress(!longPress)
  }

  const open_Modal = (name)=>{
    setDelete_Product(name)
    setLongPress(!longPress)
  }

  const showProducts = async()=>{
    const data = profile.products
    await axios.post(`/getProducts`,{ products: data })
    .then((res)=>{
      setProducts(res.data)
      setShowProd(true)
    })
  }
  return (
    <View>
        {
          !showProd &&
          <View>
            <TouchableOpacity onPress={()=>showProducts()}>
              <Text>SHOW PRODUCTS</Text>
            </TouchableOpacity>
          </View>
        }
        <TouchableOpacity onPress={()=>props.navigation.navigate('sell')}> 
          <Image
            style={styles.add}
            source={Add}
          /> 
        </TouchableOpacity>
        { showProd &&
          <FlatList
          style={styles.flatlist}
          numColumns={2}
          data={products}
          renderItem={({ item })=>(
            <TouchableOpacity onPress={()=>props.navigation.navigate('product',{
              product: item[0]
            })}
            onLongPress={()=>open_Modal(item[0].product_name)}
            >
              <View  style={styles.card}>
                <Image source={{uri: item[0].product_link}} style={styles.card_image}/>
                <Text>{item[0].product_name}</Text>
                {longPress && <Delete setPress={setPress} product_id={delete_Product}/>}
              </View>
            </TouchableOpacity>
          )}  
        />
        }
    </View>
  )
}

const styles = StyleSheet.create({
  add: {
    height: 100,
    width: 100,
    marginLeft: 20
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
    marginBottom: 150
  }
})