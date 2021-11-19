import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase/firebase';
import moment from 'moment';
import AdminModal from './AdminModal';

const { width, height } = Dimensions.get('screen');



const HomeScreen = ({navigation}) => {

  const [users, setUsers] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);

  const getUsers = async () => {
    const querySnap = await db.collection('bookings').get()
    const allusers = querySnap.docs.map(docSnap=>docSnap.data())
    console.log(allusers)
    setUsers(allusers)
}

useEffect(() => {
    getUsers()
},[])


const RenderCard = ({item}) => {
  return (
      <View>
          <View style={styles.myList}>
              <Text>
                  {item.count}
              </Text>
              <Text>
                  {/* {moment(item.date).format('MM DD YYYY, hh:mm a')} */}
                  {/* {new Date(item.date.toDate()).toDateString()} */}
                  {moment(item.date.toDate()).format('MM-DD-YYYY, hh:mm a')}
              </Text> 
          </View>
      </View>
  )
}

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F6' }}>
          <View style={styles.container}>   
              <View>
                 <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 70}}>Customer Bookings</Text>
              </View>
              <View>
              <FlatList
                    data={users}
                    renderItem={({item})=> {return <RenderCard item={item} />}}
                    keyExtractor={(item) =>item.uid}                 
              />
              </View>
              <View style={styles.myButton}>
                {isModalVisible &&
                <AdminModal
                   isVisible={isModalVisible}
                   onClose={() => setModalVisible(false)}
                />
               }
              <TouchableOpacity onPress={() => setModalVisible(true)} >
                   <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
              </View>
            <View style={styles.bottomBar}>
             <View style={styles.containerIcon}>
             <View>
                <FontAwesome5 style= {{
                    
              }} name='home' size={20} color={'#fff'} />
             </View>
             <View>
                <FontAwesome5 style= {{
             
              }} name='book' size={20} color={'#fff'} />
             </View>
             <View>
                <FontAwesome5 style= {{
              
              }} name='user-alt' size={20} color={'#fff'}
                onPress={() => navigation.navigate('ProfileScreen')}
              />

             </View>
             </View>
         </View>
       </View>

      </SafeAreaView>
   ); 
   
}

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
      flex: 1,
       backgroundColor: '#ECF0F6',
    },

    myList: {
      flexDirection: 'row',
    },

    inputContainer: {
          backgroundColor: 'lightgrey',
          width: width / 1.3,
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

    input: {
        color: '#000',
        marginLeft: 40,
    },

    flatlist: {
      flex: 1,
      marginTop: 30
    },

    images: {
        width: width / 3.5,
        height: height / 10.9,
        borderRadius: 18,
        padding: 10,
        marginHorizontal: 10,
    },

    listItem: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
    },

    nameText: {
        
    },

    bottomBar: {
        height: height * 0.09,
        width: '100%',
        backgroundColor: '#255E69',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 112
    },

    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        color: '#fff'
    },

    title: {
       color: '#fff',
       fontSize: 20,
       fontWeight: 'bold',
       justifyContent: 'space-between',
       marginTop: 10,
       marginLeft: 35,
    },

    myButton: {
        width: 130,
        height: 50,
        backgroundColor: '#255C69',
        borderRadius: 30,
        marginHorizontal: 50,
        marginLeft: 30,
        marginTop: 200,
    },

    btnText: {
        color: 'white',
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
    },

  })

  