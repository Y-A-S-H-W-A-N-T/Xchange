import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import Product from './product'

export default function Chat(props) {

    const userId = props.route.params.userId
    const ownerId = props.route.params.ownerId
    const productId = props.route.params.productId
    const socket = io('https://xchange-backend-nrkt.onrender.com') // Watch for the IP address

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
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          {messages.length > 0 && (
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <View>
                  <View>
                    {item.sender==userId? <View  style={styles.sender_message}><Text style={{marginLeft: 'auto', fontSize: 16,color: item.owner? 'orchid': 'black'}}>{item.owner?'⭐ : ': ''}{item.message}</Text></View> : <View  style={styles.reciever_message}><Text style={{marginRight: 'auto', fontSize: 16,color: item.owner? 'orchid': 'black'}}>{item.message}</Text></View>}
                  </View>
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
          <Text style={styles.send_btn} onPress={sendMessage}>SEND</Text>
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
    width: '80%',
  },
  messageContainer: {
    flex: 1,
    marginTop: 10,
  },
  sender_message: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 20,
    marginBottom: 5,
    paddingRight: 30,
    marginLeft: 'auto',
    borderTopRightRadius: 0
  },
  reciever_message: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    paddingRight: 30,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 'auto',
    borderTopLeftRadius: 0
  },
  send: {
    marginBottom: 50,
    flexDirection: 'row',
    marginTop: 20
  },
  send_btn: {
    padding: 10,
    backgroundColor: 'green',
    height: '80%',
    marginLeft: 10,
    borderRadius: 10,
    color: 'white'
  }
})