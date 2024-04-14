import { View, Image, StyleSheet, Text, TouchableOpacity, Button, Alert, TextInput, FlatList} from 'react-native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Add from '../assets/add.png'
import AwesomeAlert from 'react-native-awesome-alerts'

export default function MyProducts(props){

  const [alert,setAlert] = useState(false)

  const showAlert = (id) => {
    setProduct_id(id)
    setAlert(!alert)
  }

  const hideAlert = () => {
    setAlert(!alert)
  }

  const profile = props.route.params.profile
  const [showProd,setShowProd] = useState(false)
  const [products,setProducts] = useState(null)
  const [product_id,setProduct_id] = useState('')

  const showProducts = async()=>{
    const data = profile.products
    await axios.post(`/getProducts`,{ products: data })
    .then((res)=>{
      setProducts(res.data)
      setShowProd(true)
    })
  }

  const DeleteProduct = ()=>{
    axios.post('/delete_my_product',{id : product_id , user_id: profile._id})
    .then(()=>{
      alert('Product Deleted')
    })
    .catch(err=>{
      console.log(err)
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
            onLongPress={()=>showAlert(item[0]._id)}
            >
              <View  style={styles.card}>
                <Image source={{uri: item[0].product_link}} style={styles.card_image}/>
                <Text>{item[0].product_name}</Text>
              </View>
            </TouchableOpacity>
          )}  
        />
        }
        <AwesomeAlert
          show={alert}
          showProgress={false}
          title={product_id}
          message="Are you sure you want to delete this ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            DeleteProduct();
          }}
        />
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