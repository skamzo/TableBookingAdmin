import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from "../firebase/firebase";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)  
        .then((userCredential) => {
            const user = userCredential.user;
                return db.collection("admin").doc(user.uid).set({
                    uid: user.uid,
                    name: name,
                    email: user.email,
                }).then(() => {
                    alert('Admin successfully added');
                }).catch(err =>{
                    alert(err);
                });
        })
    }

    return (
        <View style={styles.container}>
            <View style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     right: 0,
                     height: 90,
                     flexDirection: 'row',
                     alignItems: 'flex-end',
                     paddingHorizontal: 25,
                     paddingBottom: 20
                 }}>
                <TouchableOpacity
                 
                  onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
                </TouchableOpacity>
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
           <View>
           <TextInput 
               placeholder="Name"
               placeholderTextColor="#60594F"
               style={styles.textInput}    
               value={name}
               onChangeText={text => setName(text)}  
            ></TextInput>
           </View>
           <TouchableOpacity style={styles.myButton} onPress={register}>
                   <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
            {/* style={styles.myButton} onPress={() => navigation.navigate('RegisterScreen')}> */}

        <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text style={styles.text, {fontSize: 14, color: '#ABB4BD'}}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={{fontWeight: '600', color: '#255C69', marginHorizontal: 5}}>log In Now</Text>
            </TouchableOpacity>
        </View>
          
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({

    container: {
        flex:1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
       color: 'cadetblue',
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