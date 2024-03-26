import { View, Text, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';

export default function Chat(props) {

    const socket = io('http://172.19.79.183:8000');

    const [messages,setMessages] = useState([])
    const [msg,setMsg] = useState(null)

    useEffect(() => {
        socket.on('chat message', msg => {
            setMessages([...messages, msg]);
            console.log("HERE",messages)
        });
    }, [messages]);

    const sendMessage = () => {
        socket.emit('chat message', msg);
        setMsg('');
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
                        <Text>{item}</Text>
                    </View>
                )}  
            />
        }
      </View>
    </View>
  )
}