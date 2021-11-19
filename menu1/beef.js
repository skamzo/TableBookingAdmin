import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { foodmenu } from '../screens/restaurants';

const beef = () => {

    const HorizontalFoodCard = ({containerStyle, imageStyle, item}) => {
        return (
          <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                borderRadius: 15,
                 backgroundColor: '#F2F2F2',
                 ...containerStyle
              }}
          >
            <Image
               source={item.image}
               style={imageStyle}
            />
            <View style={{flex: 1}}>
                <Text style={{marginLeft: 10}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )
  }


  return (
    <View style={styles.container}>
         <View style={styles.flatList}>
           <FlatList
                data={foodmenu}
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
                              marginLeft: 10,
                              height: 100,
                              width: 100
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatList: {
    marginTop: 100,
}
});
