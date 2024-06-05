import React, {useEffect, useState} from 'react';
import {FlatList,Image,StyleSheet,View,TouchableOpacity,Alert} from 'react-native';
import { Avatar, Text, TextInput} from 'react-native-paper';
import {useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';

export default function Services({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [serviceLst, setServiceLst] = useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [name, setName] = React.useState('');
  const [serviceData, setServiceData] = React.useState([]);
  const [imageAvatar, setImageAvatar] = React.useState('');
  const cSERVICES = firestore().collection('SERVICES');
  const USERS = firestore().collection('USERS');

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    } else setIsAdmin(userLogin.role == 'admin');

    cSERVICES.onSnapshot(respone => {
      var arr = [];
      respone.forEach(doc => arr.push(doc.data()));
      setServiceLst(arr);
      setServiceData(arr);
    });
  }, [navigation, userLogin]);

  useEffect(() => {
    setServiceData(serviceLst.filter(s => s.serviceName.includes(name)));
  }, [name]);

  useEffect(() => {    
  const showInfo = USERS.doc(userLogin.email).onSnapshot(doc => {
    if (doc.exists) {
      const userData = doc.data();
      setImageAvatar(userData.image);
    } else {
      Alert.alert('User not found');
    }
  });

  return () => {
    showInfo();
  };
}, [userLogin]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ServiceDetail', {id: item.id})}>
        <View style={styles.borderFlatlst}>
              <Image source={{uri: item.image}} style={{height: 250,width:"100%"}} />
              <View style={{flexDirection:"column",alignItems:"center"}}>
                <Text style={{fontWeight: 'bold', fontSize: 24}}>
                {item.serviceName}
              </Text>
              <Text style={{fontSize: 24}}>{item.price} VND</Text>
              </View>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          backgroundColor: '#FF6666',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          variant="displaySmall"
          style={{marginLeft: 10, color: '#fff', fontSize: 20}}>
          {userLogin !== null && userLogin.fullname.toUpperCase()}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image
            style={{
              height: 45,
              width: 45,
              borderColor:'white',
              borderWidth: 1,
            }}
            size={43}
            source={
              imageAvatar ? {uri: imageAvatar} : require('../asset/firebase.png')
            }
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={require('../asset/banner-logo.png')}
          style={{alignSelf: 'center', width:'100%', resizeMode:'stretch'}}
        />
        <TextInput
          label={'Tìm kiếm dịch vụ'}
          value={name}
          onChangeText={setName}
          underlineColor="transparent"
          underlineStyle={0}
          style={{
            margin: 10,
            backgroundColor: 'none',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 1,
            borderColor: 'grey',
          }}
        />
        <View
          style={{
            height: 50,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text
            variant="headlineSmall"
            style={{fontWeight: 'bold'}}>
            Danh sách dịch vụ
          </Text>
          {isAdmin && (
            <TouchableOpacity onPress={() => navigation.navigate('AddNewService')}>
              <Image
              source={require('../asset/add.png')}
              style={{height: 30, width: 30,marginTop:10}}
            />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={serviceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderFlatlst: {
    backgroundColor:"#FF6666",
    borderRadius: 10,
    justifyContent:"center",
    alignContent:"center",
    marginHorizontal:16,
    marginVertical:10,
  },
});
