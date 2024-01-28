import Home from './screens/home'
import Login from './screens/login'
import Signup from './screens/signup'
import { Image} from 'react-native'
import Logo from './assets/logo.png'
import { createStackNavigator } from '@react-navigation/stack'

export default function App() {

  const Stack = createStackNavigator();

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
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
}

