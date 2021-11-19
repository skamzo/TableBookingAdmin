import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { auth, db } from "../firebase/firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
           .then(() => {
            console.log('User logged-in successfully!')
           })
           
           .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            })
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged
               (function (user) {
                if (user) {
                    navigation.replace('HomeScreen');
                  } else {
                    navigation.canGoBack() &&
                    navigation.popToTop();
                  }
               });

               return unsubscribe
    });
  
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>
                   Admin Login
                </Text>
            </View>
           <View>
           <TextInput 
               placeholder="E-mail"
               placeholderTextColor="#60594F"
               style={styles.textInput}    
               value={email}
               onChangeText={text => setEmail(text)}  
            ></TextInput>
           </View>
           <View>
           <TextInput 
               placeholder="Password"
               placeholderTextColor="#60594F"
               style={styles.textInput}    
               value={password}
               onChangeText={text => setPassword(text)} 
               secureTextEntry 
            ></TextInput>
           </View>
           <TouchableOpacity style={styles.myButton} onPress={signIn}  >
                   <Text style={styles.btnText}>Log In</Text>
            </TouchableOpacity>
            {/* style={styles.myButton} onPress={() => navigation.navigate('RegisterScreen')}> */}

        <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text style={styles.text, {fontSize: 14, color: '#ABB4BD'}}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={{fontWeight: '600', color: '#255C69', marginHorizontal: 5}}>Sign Up Now</Text>
            </TouchableOpacity>
        </View>
          
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({

    container: {
        flex:1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
       color: '#255C69',
       fontSize: 20,
       fontWeight: 'bold',
       justifyContent: 'space-between',
       marginLeft: 35,
       marginBottom: 20,
    },

    textInput: {
        paddingLeft: 5,
        marginBottom: 40,
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: 2,
        paddingBottom: 20,
        justifyContent: 'space-between',
        width: 290,
        color: '#000',
    },

    myButton: {
        backgroundColor: '#255C69',
        width: '85%',
        borderRadius: 30,
        fontSize: 16,
        paddingVertical: 12,
        marginTop: 32,
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: {width: 0, height: 9},
        shadowOpacity: 3,
        shadowRadius: 20,
        elevation: 5
    },

    btnText: {
        color: '#fff',
        fontSize: 16,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 4,
        fontWeight: '600'
    },

    text: {
       fontFamily: 'Georgia'    }

  })