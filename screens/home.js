import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Signup from '../assets/sign-up.png'
import Login from '../assets/login.png'
import User from '../assets/user.png'

export default function Home(props) {
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
    marginTop: '50%'
  },
  auth_logo: {
    height: 100,
    width: 100,
    marginLeft: 20
  }
});
