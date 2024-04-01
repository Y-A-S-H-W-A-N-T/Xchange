import Login from './screens/login'
import Signup from './screens/signup'
import Logo from './assets/logo.png'
import Role from './screens/role'
import Home from './screens/home'
import Profile from './screens/profile'
import Sell from './screens/sell'
import Product from './screens/product'
import MyProducts from './screens/myProducts'
import Chat from './screens/chat'
import { Image, View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'


export default function App() {

  const stack =  createNativeStackNavigator()
  axios.defaults.baseURL="http://172.19.79.33:8000"

  const StackStyle = { 
    animation: 'slide_from_left',
    headerBackVisible: false,
    headerTitle: ()=>{
      return(
        <Image source={Logo} style={{width:220, height:60}}/>
    )},
    headerTitleAlign: 'center',
    navigationBarColor: '#F05454',
    headerStyle: {
      backgroundColor: '#121212',
    },
    statusBarColor: '#F05454'
  }

  return (
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen name='login' component={Login} options={StackStyle}/>
            <stack.Screen name='signup' component={Signup} options={StackStyle}/>
            <stack.Screen name='role' component={Role} options={StackStyle}/>
            <stack.Screen name='sell' component={Sell} options={StackStyle}/>
            <stack.Screen name='product' component={Product} options={StackStyle}/>
            <stack.Screen name='main' component={MainScreen} options={StackStyle}/>
            <stack.Screen name='myproducts' component={MyProducts} options={StackStyle}/>
            <stack.Screen name='chat' component={Chat} options={StackStyle}/>
        </stack.Navigator>
    </NavigationContainer>
  );
}


function MainScreen(){

  const Tab = createBottomTabNavigator();

  const TabStyle = {

  }

  return(
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
          bottom: 10,
          backgroundColor: '#F5F5F5',
          borderRadius: 100,
          width: '80%',
          left: 40,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true
      }}
      initialRouteName='home'
    >
      <Tab.Screen name="profile" component={Profile}options={{
        tabBarIcon: ({focused})=>{
          return(
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="user" size={30} style={{color: focused? "#F05454" : '#121212', marginTop: 20}}/><Text>Profile</Text>
            </View>
          )
        }
      }}/> 
      <Tab.Screen name="home" component={Home} options={{
        tabBarIcon: ({focused})=>{
          return(
            <View>
              <Entypo name="home" size={30} style={{color: focused? "#F05454" : '#121212', marginTop: 20}}/><Text>home</Text>
            </View>
          )
        }
      }}
      />
      <Tab.Screen name="role" component={Role}options={{
        tabBarIcon: ({focused})=>{
          return(
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Entypo name="login" size={30} style={{color: focused? "#F05454" : '#121212', marginTop: 20}}/><Text>features</Text>
            </View>
          )
        }
      }}/>
    </Tab.Navigator>
  )

}
