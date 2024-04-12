import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from "react-native-modal"

export default function Delete(props) {

  const Delete_Product = ()=>{
    console.log('delete : ',props.product_id)
  }

  return (
    <View onPress={()=>props.setPress()}>
      <Modal isVisible={true} onPress={()=>props.setPress()}>
        <View>
          <Text style={styles.back}>EDIT</Text>
          <TouchableOpacity onPress={Delete_Product}>
            <Text style={styles.back}>DELETE</Text>
          </TouchableOpacity>
          <Button onPress={()=>props.setPress()} title='❌'/>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'brown',
    color: 'white',
    fontSize: 50,
    textAlign: 'center'
  }
})