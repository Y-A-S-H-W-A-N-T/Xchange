import Login from './screens/login'
import Signup from './screens/signup'
import Logo from './assets/logo.png'
import Role from './screens/role'
import Home from './screens/home'
import Profile from './screens/profile'
import { Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


export default function App() {

  const stack =  createNativeStackNavigator()

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
            <stack.Screen name='main' component={MainScreen} options={StackStyle}/>
        </stack.Navigator>
    </NavigationContainer>
  );
}


function MainScreen(){

  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="profile" component={Profile} options={{headerShown: false}}/> 
      <Tab.Screen name="role" component={Role} options={{headerShown: false}}/>
    </Tab.Navigator>
  )

}
