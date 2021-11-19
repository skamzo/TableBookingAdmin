import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, Alert, Dimensions } from "react-native";
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { auth, db } from "../firebase/firebase";
import { SimpleLineIcons } from '@expo/vector-icons';
//import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const {height, width} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

    const signOut = () => {
             auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('LoginScreen')
          }).catch((error) => {
            // An error happened.
          });
    }

    // const signOut = async () => {
    //     try {
    //         await firebase.auth().signOut();
    //         navigation.replace('LoginScreen')
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    React.useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const PickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    const AddHotel = () => {
            const uid = auth?.currentUser?.uid;  
            return db.collection('admin').doc(uid).update({
            uid: uid,
            email: email,
            image: image,
            description: description,
             }).then(() => { 
          Alert.alert('Hotel successfully added')
        })
      .catch((error) => {
       const errorMessage = error.message;
        alert(errorMessage)
      });
    }

    return (
      <View style={styles.container} >
               <View style={{marginTop: 35, alignSelf: 'flex-end', height:194}}>
               <TouchableOpacity style={{
                    marginRight: 35
                   }}
                   onPress={signOut}
                >
                    <SimpleLineIcons name="logout" size={24}
                     color="#000" />
                </TouchableOpacity>
               </View>
            <View style={styles.footer} >
            <TouchableOpacity style={{marginTop: -50}} onPress={PickImage}>
              <Image style={styles.image} source={{uri: image}} value={image}/>
              {/* {image && <Image source={{ uri: image }} />} */}
              </TouchableOpacity>

            <View style={styles.MainContainer}>
            <TextInput
              style={styles.TextInputStyleClass}
              onChangeText={name => setName(name)}
              value={name}
              underlineColorAndroid="transparent"
              placeholder={"Enter the hotel description here."}
              placeholderTextColor={"#9E9E9E"}
              numberOfLines={10}
              multiline={true}
            />
          </View>

          <View style={styles.myButton}>   
          <TouchableOpacity 
              onPress={AddHotel}
          >
             <Text style={styles.btnText}>Add Hotel</Text>
          </TouchableOpacity>
          </View>
         </View>
       </View>  
 
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: '100%',
    width: "100%",
    backgroundColor:'#67C8D5',
    alignSelf: 'center'
  },

  footer: {
    flex: 1, 
    backgroundColor: '#fff', 
    height: 700,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30, 
    alignItems: 'center'
  },

  inputContainer: {
        backgroundColor: 'lightgrey',
        width: 1.3,
        padding: 8,
        marginTop: 10,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.3,
  },

  containerIcon: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      color: '#fff'
  },

  myButton: {
      width: 220,
      height: 70,
      backgroundColor: '#255C69',
      borderRadius: 40,
      marginHorizontal: 50,
      marginTop: 37,
      alignSelf: 'center'
  },

  btnText: {
      color: 'white',
      fontSize: 20,
      justifyContent: "center",
      textAlign: "center",
      marginTop: 18,
  },

  image: {
    width: 170,
    height: 170,
    borderRadius: 200,
    borderWidth: 2,
    backgroundColor: "cadetblue",
    marginTop: -50   
  },

  MainContainer :{
    flex:0,
    paddingTop: (Platform.OS) === 'Android' ? 20 : 0,
    justifyContent: 'center',
    margin:20,
    
    },
   
    TextInputStyleClass:{
     textAlign: 'center',
      width: 300,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      borderRadius: 20 ,
      backgroundColor : "#FFFFFF",
      height: 150,
      marginTop: 40
      }

})