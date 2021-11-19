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
  // const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  // const [selectedMenuType, setSelectedMenuType] = useState(1);
  // const [menuList, setMenuList] = useState([]);
  // const [popular, setPopular] = useState([]);

  // useEffect(() => {
  //     handleChangeCategory(selectedCategoryId, selectedMenuType)
  // }, [])

  // const handleChangeCategory = (categoryId, menuTypeId) => {
  //     //  let selectedMenu = restaurants.name.find(a => a.id == menuTypeId);

  //     //  setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))

  //       // let selectedPopular = item.name.find(a => a.name == "Popular");
  // }

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


// const getUser = async () => {
//   const uid = auth?.currentUser?.uid;
//   const querySnap = await db.collection('users').where("uid", "==", uid).get()
//   const allusers = querySnap.docs.map(docSnap=>docSnap.data())
//   console.log(allusers)
//   setUsers(allusers)
// }

// useEffect(() => {
//   getUser()
// },[])

const RenderCard = ({item}) => {
  return (
  
          <View style={styles.myList}>
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
            </View>
          </View>
     
  )
}

// const HorizontalFoodCard = ({containerStyle, imageStyle, item}) => {
//   return (
//     <TouchableOpacity
//         activeOpacity={0.8}
//         style={{
//           flexDirection: 'row',
//           borderRadius: 15,
//            backgroundColor: 'lightgray',
//            ...containerStyle
//         }}
//     >
//       <Image
//          source={item.image}
//          style={imageStyle}
//       />
//       <View style={{flex: 1}}>
//           <Text style={{marginLeft: 10}}>{item.name}</Text>
//       </View>
//     </TouchableOpacity>
//   )
// }

// const renderMenuTypes = () => {
//     return (
//       <FlatList
//           horizontal
//           data={restaurants.name}
//           keyExtractor={item => `${item.id}`}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//               marginTop: 30,
//               marginBottom: 20
//           }}
//           renderItem={({item, index}) => {
//               <TouchableOpacity
//                    style={{
//                       marginLeft: 20,
//                       marginRight: index == restaurants.
//                       length - 1 ? padding: 0
//                    }}
//               >
//                 <Text
//                   style={{
//                     color: selectedMenuType == item.id 
//                     ? 'red' : 'black'
//                   }}
//                 >
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//           }}
//       />
//     )
// }

// const renderPopularSection = () => {
     
// }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F6' }}>
          <View style={styles.container}>   
              <View>
                 <Text style={{fontSize: 30, fontFamily: "serif" ,color: '#67C8D5' ,fontWeight: 'bold', textAlign: 'center', marginTop: 40}}>Customer Bookings</Text>
              </View>
              <View style={{ flex: 1, marginTop: 15, textAlign: 'center' }}>
              {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View>
              <Text style={{fontWeight: 'bold'}}>
                 Restaurant
              </Text>
              </View>
             <View>
             <Text style={{fontWeight: 'bold'}}>
                Guests
              </Text>
             </View>
            <View>
                <Text style={{fontWeight: 'bold'}}>
                  Date
              </Text> 
            </View>
            <View>
                <Text style={{fontWeight: 'bold'}}>
                  Time
              </Text> 
            </View>
          </View> */}
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
              <Text style={{marginBottom: 50, fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: '#17399f'}}>Food Menu Category</Text>
              {/* <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center', }}>
                <Text style={{flex:.8}}>Login</Text>
                <Image source={require('../assets/chicken.png')} resizeMode='contain' style={{flex:.2 }} />
          </TouchableOpacity> */}
             <View style={{marginTop: -35, flexDirection: 'row', marginHorizontal: 10}}>
             <TouchableOpacity
                onPress={() => navigation.navigate('beef')}
             >
             <View style={{width: 95, height: 95, backgroundColor: 'lightgray', alignSelf: 'center', marginVertical: 5, borderRadius: 16, marginHorizontal: 10}}>
             <Image source={require('../assets/steak.png')} resizeMode='contain' style={{ width: 95, height: 95 }} />
                 </View>
                
             </TouchableOpacity>

             <TouchableOpacity
               onPress={() => navigation.navigate('chicken', {
                
               })}
             >
             <View style={{width: 95, height: 95, backgroundColor: 'lightgray', alignSelf: 'center', marginVertical: 5, borderRadius: 16, marginHorizontal: 10}}>
             <Image source={require('../assets/chicken.png')} resizeMode='contain' style={{ width: 95, height: 95 }} />
                 </View>
                 
             </TouchableOpacity>

             <TouchableOpacity
               onPress={() => navigation.navigate('pork')}
             >
             <View style={{width: 95, height: 95, backgroundColor: 'lightgray', alignSelf: 'center', marginVertical: 5, borderRadius: 16, marginHorizontal: 10}}>
             <Image source={require('../assets/pork.png')} resizeMode='contain' style={{ width: 95, height: 95 }} />
                 </View>
             
             </TouchableOpacity>
             </View>
             
              <View style={styles.flatList}>
           <FlatList
                data={foodmenu}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                // ListHeadeComponent={
                //    <View>

                //       {renderPopularSection()}

                //       {renderMenuTypes()}
                //    </View>
                // }
                // renderItem={({item, index}) => {
                //     return (
                //       <HorizontalFoodCard
                //            containerStyle={{
                //               height: 80,
                //               width: 200,
                //               alignItems: 'center',
                //               marginHorizontal: 65,
                //               marginBottom: 10
                //            }}
                //            imageStyle={{
                //             alignItems: 'center',
                //               marginLeft: 10,
                //               height: 70,
                //               width: 70
                //            }}
                //            item={item}
                //       />                     
                //     )
                // }}
           >
           </FlatList>
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
        width: 115,
        height: 50,
        backgroundColor: '#255C69',
        borderRadius: 30,
        marginHorizontal: 50,
        marginLeft: 30,
        marginBottom: 20
      
    },

    btnText: {
        color: 'white',
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
    },

    flatList: {
      marginBottom: -100,
    }

  })

  