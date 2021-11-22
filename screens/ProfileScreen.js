import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, Alert, Dimensions, FlatList } from "react-native";
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { auth, db } from "../firebase/firebase";
import { SimpleLineIcons } from '@expo/vector-icons';
//import { Avatar } from 'react-native-elements';
import UpdateModal from "./UpdateModal";
import * as ImagePicker from 'expo-image-picker';
import UpdateUserProfile from "./UpdateUserProfile";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

const {height, width} = Dimensions.get('window');

const ProfileScreen = ({navigation, item}) => {

  
  const [messages, setMessages] = useState([]);
  //const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

    const signOut = () => {
             auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('LoginScreen')
          }).catch((error) => {
            // An error happened.
          });
    }

    const [users, setUsers] = useState(null)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const getUsers = async () => {
        const uid = auth?.currentUser?.uid;
        const querySnap = await db.collection('admin').where('uid','==', uid).get();
        const allusers = querySnap.docs.map(docSnap=>docSnap.data())
        console.log(allusers)
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    },[])

    const RenderCard = ({item}) => {
      return (
          <View style={{marginTop: 85}}>

              <Image source={{uri:item.image}} style={styles.image} value={image}/>
              <View >
              <Text style={{fontSize: 18,  margin: 9,  color: '#000', marginTop: 50, marginHorizontal: 60}}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
           Email:
           
        </Text> {item.email}
                  </Text>
                  <Text style={{fontSize: 18, margin: 9, marginTop: 30, marginHorizontal: 54}}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>  
                Restaurant:
        </Text> {item.name} 
                  </Text>
                  <Text style={{fontSize: 18, margin: 9}}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {/* Image:  <Image style={styles.image} source={{uri: item.image}} value={image} style={{height: 50, width: 50}}/> */}
                
              </Text> 
                  </Text>
                  <FontAwesome style={{marginHorizontal: 13, marginTop: -137}} name="user-circle-o" size={26} color="#2e64e5" />
                  <View  style={{marginHorizontal: 13,  marginTop: 37}}>
                  <MaterialIcons name="restaurant" size={26} color="#2e64e5" /> 
                    </View>      
              </View>
       
          </View>
      )
}


    // const signOut = async () => {
    //     try {
    //         await firebase.auth().signOut();
    //         navigation.replace('LoginScreen')
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    return (
      <View style={styles.container} >
           <FlatList
                    style={styles.myFlatList}
                    data={users}
                    renderItem={({item})=> {return <RenderCard item={item} />}}
                    keyExtractor={(item) =>item.uid}
                />

               <View style={{alignSelf: 'flex-end'}}>
               <TouchableOpacity style={{
                    marginRight: 30
                   }}
                   style={styles.userBtn1}
                   onPress={signOut}
                >
             <Text style={styles.userBtnTxt1}>Log out</Text>
                </TouchableOpacity>
               </View>
               <View>
              {isModalVisible &&
                <UpdateUserProfile
                   isVisible={isModalVisible}
                   onClose={() => setModalVisible(false)}
                />
               } 
          < TouchableOpacity
                style={styles.userBtn}             
                  onPress={() => setModalVisible(true)}
                >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
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
    backgroundColor:'#f9f1dc',
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

  image: {
    width: 175,
    height: 150,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: "cadetblue",
    marginTop: 50,
    alignSelf: 'center'
  },

  MainContainer :{
    flex:0,
    // paddingTop: (Platform.OS) === 'Android' ? 20 : 0,
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
      },

      userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginHorizontal: 25,
        marginBottom: 150,
        width: 80
      },
      userBtnTxt: {
        color: '#2e64e5',
        textAlign: 'center'
      },

      userBtn1: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginHorizontal: 30,
        marginBottom: -39,
        width: 80
      },
      userBtnTxt1: {
        color: '#2e64e5',
      },

})