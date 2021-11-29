import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { db, auth } from '../firebase/firebase';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons"
const { width, height } = Dimensions.get('screen');

const StatusPage = ({route, navigation}) =>  {

    const [isDisabled, setIsDisabled] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const {key} =route.params;

    const Color = () => {
      return (
        <View style={{backgroundColor: '#000'}}>
           <Text></Text>
        </View>
      )
    }

    const updateCancel = () => {
        console.log(key);
          return db
            .collection("bookings")
            .doc(key)
            .update({
            status: "cancelled"
            })
            .then((snapShot) => {
              setDisabled(!disabled)
              alert("Booking has been cancelled");
            })
            .catch((error) => {
              const errorMessage = error.message;
              alert("Could not cancel booking")
            });
        }
      
        const updateApprove = () => {
            
            return db
              .collection("bookings")
              .doc(key)
              .update({
              status: "approved"
              })
              .then((snapShot) => {
                setIsDisabled(!isDisabled)
                alert("Booking has been approved");
              })
              .catch((error) => {
                const errorMessage = error.message;
                alert("Could not approve booking")
              });
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
                    <Ionicons name="arrow-back-circle-outline" size={30} color="#255E69" />
                </TouchableOpacity>
            </View>
        <View style={styles.myList}>
              <Text>
              <Text style={{fontWeight: 'bold'}}>
                 Restaurant:
              </Text> {route.params.name}
              </Text>
             <Text>
             <Text style={{fontWeight: 'bold'}}>
                Guests:
              </Text> {route.params.count}
              </Text>        
                <Text>
                  {/* {moment(item.date).format('MM DD YYYY, hh:mm a')} */}
                  {/* {new Date(item.date.toDate()).toDateString()} */}
                  <Text style={{fontWeight: 'bold'}}>
                  Date:
              </Text> {moment(route.params.date).format('DD-MM-YYYY')}
              </Text> 
                <Text>
                <Text style={{fontWeight: 'bold'}}>
                  Time:
              </Text> {moment(route.params.date).format('HH:mm A')}
              </Text> 
              <View style={{marginHorizontal: 215, marginTop: -68}}>
               <TouchableOpacity disabled={isDisabled} onPress={updateApprove} style={styles. myButton1} >
                   <Text style={styles.btnText1}>{!hidden && isDisabled? Color(): 'Approve'}</Text>
              </TouchableOpacity>
             
               <TouchableOpacity disabled={disabled} onPress={updateCancel} style={styles. myButton2} >
                   <Text style={styles.btnText2}>{disabled? Color : 'Cancel'}</Text>
              </TouchableOpacity>
               </View>
            </View>
            {/* <View style={styles.bottomBar}>
             <View style={styles.containerIcon}>
             <View>
                <FontAwesome5 style= {{
                    
              }} name='home' size={23} color={'#fff'}
              onPress={() => navigation.navigate('HomeScreen')}
               />
             </View>
             <View>
                <FontAwesome5 style= {{
             
              }} name='book' size={20} color={'#fff'} />
             </View>
             <View>
                <FontAwesome5 style= {{
              
              }} name='user-alt' size={23} color={'#fff'}
                onPress={() => navigation.navigate('ProfileScreen')}
              />

             </View>
             </View>
         </View> */}
    </View>
  );
}

export default StatusPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f1dc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  myList: {
    borderWidth: 1,
    borderColor: '#e4ac6f',
    borderRadius: 20,
    width: 340,
    height: 200,
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "lightgrey",
    padding: 12,
  },

  myButton1: {
    width: 80,
    height: 32,
    backgroundColor: 'green',
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
  backgroundColor: 'red',
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

bottomBar: {
    height: height * 0.08,
    width: '100%',
    backgroundColor: '#255E69',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 465
},

containerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    color: '#fff',
    marginHorizontal: 30
},
});
