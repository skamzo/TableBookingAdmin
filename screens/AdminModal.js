import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Picker, TouchableOpacity, Button, TextInput, Modal, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../firebase/firebase';

const AdminModal = ({isVisible, onClose}) => {

    const [isModalVisible, setModalVisible] = React.useState(isVisible);
    const [image, setImage] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState("Beverage");
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    
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
   
    React.useEffect(() => {
        if(!isModalVisible) {
            onClose()
        }
    }, [isModalVisible])

    const booking = () => {
      const admin = auth.currentUser;  
            return db.collection('Menu').add({
            uid: admin.uid,
            image: image,
            category: selectedValue,
            name: name,
            price: price,
        }).then(() => { 
              setModalVisible(!isVisible);
        })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
    }

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
      >
       <View
         style={{
           margin: 20,
           padding: 35,
           backgroundColor: '#fff',
           height: 600,
           width: '90%',
           alignItems: 'center',
           borderTopRightRadius: 30,
           borderTopLeftRadius: 30,
           shadowColor: "#000",
           shadowOffset: {width: 3, height: 9},
           shadowOpacity: 4,
           shadowRadius: 20,
           elevation: 5
         }}
       >
        
        <View>
        <MaterialIcons style={{
            marginLeft: 220
        }} name="cancel" size={30} color="#255C69"
            onPress={() => setModalVisible(!isModalVisible)}
         />
        </View>
        <View>
              <TouchableOpacity  onPress={PickImage}>
              <Image style={styles.image} source={{uri: image}} value={image}/>
              {/* {image && <Image source={{ uri: image }} />} */}
              </TouchableOpacity>
          </View>
        <View style={styles.myPicker}>
      <Picker style={{
          height: 50,
          width: 100,
          backgroundColor: 'red'
      }}
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Beverage" value="Beverage" />
        <Picker.Item label="Salad" value="Salad" />
        <Picker.Item label="Desert" value="Desert" />
        <Picker.Item label="Meat" value="Meat" />
      </Picker>

      <TextInput
        style={styles.input}
        onChangeText={name => setName(name)}
        value={name}
        placeholder="Item Name"
        keyboardType="text"
      />
       <TextInput
        style={styles.input}
        onChangeText={price => setPrice(price)}
        value={price}
        placeholder="Enter Price"
        keyboardType="numeric"
      />
     </View>

      <View>
      <TouchableOpacity style={styles.myButton} 
         onPress={booking}
      >
                   <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
      </View>
 
       </View>
      </Modal>
    )
}

export default AdminModal;

const styles = StyleSheet.create({
    /* Other styles hidden to keep the example brief... */
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    },
    
    myImage: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },

    myPicker: {
        flex: 1,
        paddingTop: 30,
    },

    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderColor: '#255C69',
        padding: 10,
        marginTop: 30
      },

      myButton: {
        width: 130,
        height: 50,
        backgroundColor: '#255C69',
        borderRadius: 30,
        marginHorizontal: 50,
        marginLeft: 30,
        marginTop: 250,
    },

    btnText: {
        color: 'white',
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
    },

    image: {
        width: 120,
        height: 120,
        borderRadius: 200,
        borderWidth: 2,
        backgroundColor: "cadetblue",
      },

  });