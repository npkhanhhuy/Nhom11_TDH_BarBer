import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Avatar, Button, Icon, Text} from 'react-native-paper';
import {logout, useMyContextController} from '../store';
import {useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function ProfileAllUser({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const route = useRoute();
  const {fullname, role, email, phone} = route.params;
  const {userLogin} = controller;
  const [imageAvatar, setImageAvatar] = React.useState('');
  const USERS = firestore().collection('USERS');
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    }
    const showInfo = USERS.doc(email).onSnapshot(doc => {
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
  }, [navigation, userLogin]);

  const onSubmit = () => {
    logout(dispatch);
  };

  return (
    <View style={styles.container}>
      <View style={[{flex: 1, backgroundColor: '#FF6666'}, styles.avatar]}>
        <Avatar.Image
          style={{
            height: 154,
            width: 154,
            borderColor: 'white',
            borderWidth: 2,
          }}
          size={150}
          source={imageAvatar ? {uri: imageAvatar} : require('../asset/firebase.png')}
        />
      </View>
      <View style={styles.containerInfo}>
        <View style={styles.viewTxt}>
          <Icon source={require('../asset/account.png')} size={30} color="#FF6666" />
          <Text style={styles.txt}>Tên: </Text>
          <Text style={styles.txtInfo}>{fullname}</Text>
        </View>
        <View style={styles.viewTxt}>
          <Icon source={require('../asset/email.png')} size={30} color="#FF6666" />
          <Text style={styles.txt}>Email: </Text>
          <Text style={styles.txtInfo}>{email}</Text>
        </View>
        <View style={styles.viewTxt}>
          <Icon source={require('../asset/phone.png')} size={30} color="#FF6666" />
          <Text style={styles.txt}>Số điện thoại: </Text>
          <Text style={styles.txtInfo}>{phone}</Text>
        </View>
        <View style={styles.viewTxt}>
          <Icon
            source={require('../asset/mdi--card-account-details-outline.png')}
            size={30}
            color="#FF6666"
          />
          <Text style={styles.txt}>Quyền: </Text>
          <Text style={styles.txtInfo}>{role}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    margin: 10,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTxt: {
    flexDirection: 'row',
    margin: 10,
  },
  txt: {
    marginLeft: 10,
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FF6666',
  },
  txtInfo: {
    fontSize: 20,
  },
});