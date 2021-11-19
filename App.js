import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase/firebase';

const Stack = createNativeStackNavigator();

const App = () => {

  const [user, setuser] = useState('')
    useEffect(() => {
      const unregister = auth.onAuthStateChanged(userExist=>{
            if(userExist) setuser(userExist)
            else setuser("")
      })

      return () => {
        unregister()
      }

  }, [])
  
  return (
    // <NavigationContainer>
    //     <Stack.Navigator>

             
             


    //         <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
    //         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="DetailsScreen" component={DetailsScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="BookingScreen" component={BookingScreen} />
    //         <Stack.Screen options={{headerShown: false}} name="ViewBooking" component={ViewBooking} />
    //     </Stack.Navigator>
    // </NavigationContainer>


    <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
          headerTintColor: 'cadetblue'
        }}
    >
      {user?
      <>
      <Stack.Screen name="HomeScreen"  >
        {props => <HomeScreen {...props } user={user} />}
      </Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
      </>
      :
      <>
      <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
      </>
      }

    {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
   </Stack.Navigator>
</NavigationContainer>

  ); 
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
