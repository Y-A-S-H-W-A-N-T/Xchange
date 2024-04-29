import { View, Text, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import Product from './product'

export default function Chat(props) {

    const userId = props.route.params.userId
    const ownerId = props.route.params.ownerId
    const productId = props.route.params.productId
    const socket = io('http://192.168.29.130:8000') // Watch for the IP address

    const [messages,setMessages] = useState([{}])
    const [msg,setMsg] = useState(null)

    useEffect(()=>{
      socket.emit('connected',productId)
      socket.on('previous_messages',(previous_chats)=>{
        setMessages(previous_chats)
      })
    },[msg])

    const sendMessage = async() => {
      const isOwner = userId == ownerId ? true : false
        socket.emit('message',{
          sender: userId,
          message: msg,
          owner: isOwner,
          product: productId
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
                        <Text>{item.owner? 'Owner': 'user'} : {item.message}</Text>
                    </View>
                )}  
            />
        }
      </View>
    </View>
  )
}