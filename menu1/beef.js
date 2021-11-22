import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { foodmenu } from '../screens/restaurants';
import { db, auth } from '../firebase/firebase';

const beef = () => {

  const [users, setUsers] = useState(null);

    const getMenu = async () => {
        const uid = auth?.currentUser?.uid;
        const querySnap = await db.collection('Menu2').where("uid", "==", uid).get()
        const allusers = querySnap.docs.map(docSnap=>docSnap.data())
        console.log(allusers)
        setUsers(allusers)
      }
      
      useEffect(() => {
        getMenu()
      },[])

    const HorizontalFoodCard = ({containerStyle, imageStyle, item}) => {
        return (
          <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                borderRadius: 15,
                 backgroundColor: 'lightgrey',
                 ...containerStyle
              }}
          >
            <Image
               source={{uri: item.image}}
               style={imageStyle}
            />
            <View style={{flex: 1}}>
                <Text style={{marginLeft: 10}}>{item.name}</Text>
                <Text style={{marginLeft: 10}}>Price: R{item.price}</Text>
            </View>
          </TouchableOpacity>
        )
  }


  return (
    <View style={styles.container}>
         <View style={styles.flatList}>
           <FlatList
                data={users}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                      <HorizontalFoodCard
                           containerStyle={{
                              height: 100,
                              width: 300,
                              alignItems: 'center',
                              marginBottom: 10
                           }}
                           imageStyle={{
                            alignItems: 'center',
                              height: 100,
                              width: 100,
                              borderRadius: 10
                           }}
                           item={item}
                      />                     
                    )
                }}
           >
           </FlatList>
      </View>
    </View>
  );
}

export default beef

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ac6f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatList: {
    marginTop: 100,
}
});
