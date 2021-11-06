import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {

  const LineDivider = ({ lineStyle }) => {
      return (
        <View
           style={{
              height: 2,
              width: '100%',
              backgroundColor: '#8A8F9E',
              ...lineStyle
           }}
        />
      )
  };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ECF0F6' }}>
            <View style={styles.container}>   
      
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
       justifyContent: 'center',
       alignItems: "center",
       marginTop: 55
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
        height: height * 0.06,
        width: '100%',
        backgroundColor: '#255E69',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
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
        width: 310,
        height: 50,
        backgroundColor: '#ff9f4d',
        borderRadius: 10,
        marginHorizontal: 50,
        marginLeft: 30,
        marginTop: 15,
    },

    btnText: {
        color: 'white',
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
    }

  })

  