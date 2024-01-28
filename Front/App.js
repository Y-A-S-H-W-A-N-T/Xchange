import Login from './screens/login'
import Signup from './screens/signup'
import Logo from './assets/logo.png'
import { Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


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
        </stack.Navigator>
    </NavigationContainer>
  );
}
