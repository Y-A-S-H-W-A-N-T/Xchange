import Home from './screens/home'
import Login from './screens/login'
import Signup from './screens/signup'
import { Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Logo from './assets/logo.png'

export default function App() {
  const Stack = createNativeStackNavigator();
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
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name="Home" component={Home} options={StackStyle}/>
        <Stack.Screen name="login" component={Login} options={StackStyle}/>
        <Stack.Screen name="signup" component={Signup} options={StackStyle}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

