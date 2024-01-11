import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import { useState } from 'react'
import Signup from '../assets/sign-up.png'
import Login from '../assets/login.png'
import User from '../assets/user.png'
import Submit_log from '../assets/log.png'

export default function LoginPage(props) {
  const [details,setDetails] = useState({
    username: "",
    phone: "",
    password: "",
    email: "",
  })
  const HandleLogin = ()=>{
    console.log(details)
    Alert.alert('Success!!!','Logged In')
  }
  return (
    <View style={styles.container}>
      <View style={styles.auth}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('signup')}> 
          <Image
            style={styles.auth_logo}
            source={Signup}
          /> 
        </TouchableOpacity>
        <Image
          style={styles.auth_logo}
          source={User}
        />
        <TouchableOpacity onPress={()=>props.navigation.navigate('login')}> 
          <Image
            style={styles.auth_logo}
            source={Login}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          value={details.username}
          onChangeText={(res)=>setDetails((prev)=>({...prev,username: res}))}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={details.password}
          onChangeText={(res)=>setDetails((prev)=>({...prev,password: res}))}
        />
        <TouchableOpacity onPress={HandleLogin}> 
          <Image
            style={styles.submit}
            source={Submit_log}
          /> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 30,
    },
    auth: {
      marginTop: 50,
      flexDirection: 'row',
      alignItems: "center",
    },
    auth_logo: {
      height: 100,
      width: 100,
      marginLeft: 20
    },
    form: {
      alignItems: 'center',
    },
    input: {
      fontSize: 30,
      borderWidth: 5,
      borderColor: '#121212',
      minWidth: '50%',
      maxWidth: '75%',
      padding: 10,
      textAlign: 'center',
      marginTop: 30,
      backgroundColor: '#F05454',
      color: '#F5F5F5'
    },
    submit: {
      height: 120,
      width: 120,
      marginTop: 20 
    }
  });
