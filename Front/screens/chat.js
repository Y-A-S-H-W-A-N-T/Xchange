import { View, Text, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import Product from './product'

export default function Chat(props) {

    const userId = props.route.params.userId
    const ownerId = props.route.params.ownerId
    const productId = props.route.params.productId
    const socket = io('http://172.19.78.194:8000') // Watch for the IP address
    console.log("Product ID : ",productId)

    const [messages,setMessages] = useState([{}])
    const [msg,setMsg] = useState(null)

    useEffect(() => {
        socket.emit('connected')

        socket.on('chat message', (data) => {
          setMessages([...messages,data])
        })
    }, [messages])

    const sendMessage = async() => {
      const isOwner = userId == ownerId ? true : false

      await axios.post('/chats',{sender: userId, message: msg, owner: isOwner, product: productId})
      .then((res)=>{
        if(res.data.message==='success')
          console.log("Chat stored")
      })
      .catch((err)=>{
        console.log("Error in strong chats")
      })

        socket.emit('chat message',{
          message: msg,
          sender: userId,
          ownerId: ownerId
        })
        setMsg('')
    };

  return (
    <View>
      <Text>Chat</Text>
      <TextInput
        placeholder='Send a message'
        value={msg}
        onChangeText={text=>setMsg(text)}
      />
      <Button
        title='SEND'
        onPress={sendMessage}
      />
      <View>
        {
            messages.length>0 &&
            <FlatList
                data={messages}
                renderItem={({ item })=>(
                    <View>
                        <Text>{item.ownerId==userId?'Owner : ' : 'User : '}{item.message}</Text>
                    </View>
                )}  
            />
        }
      </View>
      {/* <View>
        {
          messages.length>0 && 
          messages.map((val,ind)=>{
            <View key={ind}>
              <Text>USER : </Text>
              <Text>{ind}</Text>
            </View>
          })
        }
      </View> */}
    </View>
  )
}