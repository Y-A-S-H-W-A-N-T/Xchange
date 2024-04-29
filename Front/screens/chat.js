import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native'
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
        console.log(messages)
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
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          {messages.length > 0 && (
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <View style={styles.message}>
                  <Text style={styles.messageText}>{item.owner? 'Owner' : 'User'}: {item.message}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        <View style={styles.send}>
          <TextInput
            style={styles.input}
            placeholder='Send a message'
            value={msg}
            onChangeText={text => setMsg(text)}
          />
          <Button
            title='SEND'
            onPress={sendMessage}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageContainer: {
    flex: 1,
    marginTop: 10,
  },
  message: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  send: {
    marginBottom: 50
  }
});