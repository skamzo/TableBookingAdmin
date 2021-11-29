import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase/firebase';
import moment from 'moment';
import AdminModal from './AdminModal';
import { foodmenu, restaurants } from './restaurants';
import beef from '../menu1/beef';

const { width, height } = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {

  const [users, setUsers] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

 const [key, setKey] = useState('');
 const [status, setStatus] = useState('');
 const [date, setDate] = useState('');
 const [count, setCount] = useState('');
 const [name, setName] = useState('');

  const getUsers = async () => {
    const uid = auth?.currentUser?.uid;
    const querySnap = await db.collection('bookings').where("adminuid", "==", uid).get()
    const allusers = querySnap.docs.map(docSnap=>docSnap.data())
    console.log(allusers)
    setUsers(allusers)
}

useEffect(() => {
    getUsers()
},[])

const RenderCard = ({item}) => {
  return (
  
          <TouchableOpacity style={styles.myList}
            onPress={() => navigation.navigate('StatusPage', {
            key: item.key,
            name: item.name,
            count: item.count,
           })} >
                                      
             <View style={{margin: 10}}>
              <Text>
              <Text style={{fontWeight: 'bold'}}>
                 Restaurant:
              </Text> {item.name}
              </Text>
             <Text>
             <Text style={{fontWeight: 'bold'}}>
                Guests:
              </Text> {item.count}
              </Text>        
                <Text>
                  {/* {moment(item.date).format('MM DD YYYY, hh:mm a')} */}
                  {/* {new Date(item.date.toDate()).toDateString()} */}
                  <Text style={{fontWeight: 'bold'}}>
                  Date:
              </Text> {moment(item.date.toDate()).format('DD-MM-YYYY')}
              </Text> 
                <Text>
                <Text style={{fontWeight: 'bold'}}>
                  Time:
              </Text> {moment(item.date.toDate()).format('HH:mm A')}
              </Text> 
              {/* <View style={{marginHorizontal: 215, marginTop: -68}}>
               <TouchableOpacity style={styles. myButton1} >
                   <Text style={styles.btnText1}>Approve</Text>
              </TouchableOpacity>
             
               <TouchableOpacity style={styles. myButton2} >
                   <Text style={styles.btnText2}>Cancel</Text>
              </TouchableOpacity>
               </View> */}
            </View>
          </TouchableOpacity>
     
  )
}

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F6' }}>
          <View style={styles.container}>   
              <View>
                 <Text style={{fontSize: 30, fontFamily: "serif" ,color: '#67C8D5' ,fontWeight: 'bold', textAlign: 'center', marginTop: 40}}>Customer Bookings</Text>
              </View>
              <View style={{ flex: 1, marginTop: 15, textAlign: 'center' }}>
  
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
              <View style={{alignSelf: 'center'}}>
              <Text style={{marginBottom: 50, fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#17399f'}}>Food Menu Category</Text>
              {/* <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center', }}>
                <Text style={{flex:.8}}>Login</Text>
                <Image source={require('../assets/chicken.png')} resizeMode='contain' style={{flex:.2 }} />
          </TouchableOpacity> */}
             <View style={{marginTop: -35, flexDirection: 'row', marginHorizontal: 10}}>
             <TouchableOpacity
                onPress={() => navigation.navigate('beef')}
             >
             <View style={{width: 110, height: 110, backgroundColor: 'lightgray', alignSelf: 'center', marginVertical: 5, borderRadius: 16, marginHorizontal: 5}}>
             <Image source={require('../assets/cocktail.png')} resizeMode='contain' style={{ width: 110, height: 110 }} />
                 </View>
                
             </TouchableOpacity>

             <TouchableOpacity
               onPress={() => navigation.navigate('chicken', {
                
               })}
             >
             <View style={{width: 110, height: 110, backgroundColor: 'lightgray', alignSelf: 'center', marginVertical: 5, borderRadius: 16, marginHorizontal: 5}}>
             <Image source={require('../assets/chicken.png')} resizeMode='contain' style={{ width: 110, height: 110 }} />
                 </View>
                 
             </TouchableOpacity>

             <TouchableOpacity
               onPress={() => navigation.navigate('pork')}
             >
             <View style={{width: 110, height: 110, backgroundColor: 'lightgray', alignSelf: 'center', marginVertical: 5, borderRadius: 16, marginHorizontal: 5}}>
             <Image source={require('../assets/prawns.png')} resizeMode='contain' style={{ width: 110, height: 110 }} />
                 </View>
             
             </TouchableOpacity>
             </View>
             </View>
             
              <View style={styles.flatList}>
           <FlatList
                data={foodmenu}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                >
     
           </FlatList>
      </View>
            <View style={styles.bottomBar}>
             <View style={styles.containerIcon}>
             <View>
                <FontAwesome5 style= {{
                    
              }} name='home' size={23} color={'#fff'}
              onPress={() => navigation.navigate('HomeScreen')}
               />
             </View>
             {/* <View>
                <FontAwesome5 style= {{
             
              }} name='book' size={20} color={'#fff'} />
             </View> */}
             <View>
                <FontAwesome5 style= {{
              
              }} name='user-alt' size={23} color={'#fff'}
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
      borderWidth: 1,
      borderColor: '#e4ac6f',
      borderRadius: 20,
      margin: 5

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

    listItem: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
    },

    bottomBar: {
        height: height * 0.08,
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
        color: '#fff',
        marginHorizontal: 30
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
        width: 90,
        height: 40,
        backgroundColor: '#255C69',
        borderRadius: 30,
        marginHorizontal: 50,
        marginLeft: 30,
        marginBottom: 20
      
    },

    btnText: {
        color: 'white',
        fontSize: 18,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 7,
    },

    myButton1: {
      width: 80,
      height: 32,
      backgroundColor: 'orange',
      borderRadius: 30,   
  },

  btnText2: {
      color: 'white',
      fontSize: 15,
      justifyContent: "center",
      textAlign: "center",
      marginTop: 6,
  },

  myButton2: {
    width: 80,
    height: 32,
    backgroundColor: 'maroon',
    borderRadius: 30,
    margin: 5
},

btnText1: {
    color: 'white',
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
    marginTop: 6,
},


    flatList: {
      marginBottom: -100,
    }

  })

  