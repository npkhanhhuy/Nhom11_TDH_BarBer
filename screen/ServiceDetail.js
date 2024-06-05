import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, Icon, Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {useMyContextController} from '../store';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';

export default function ServiceDetail({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const dSERVICE = firestore().collection('SERVICES');
  const route = useRoute();
  const {id} = route.params;
  const [service, setService] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [datetime, setDatetime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const APPOIMENTS = firestore().collection('APPOIMENTS');
  const handleAddNewApppoiment = () => {
    APPOIMENTS.add({
      customerId: userLogin.fullname,
      serviceId: id,
      datetime,
      state: 'new',
      complete: false,
      email: userLogin.email,
    }).then(response => APPOIMENTS.doc(response.id).update({id: response.id}));
    navigation.goBack();
  };

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    } else {
      setIsAdmin(userLogin.role == 'admin');
    }

    const confirmDelete = () => {
      Alert.alert(
        'Xác nhận xóa',
        'Bạn có chắn chắn muốn xóa không!',
        [
          {
            text: 'Xóa',
            onPress: handleDelete,
          },
          {
            text: 'Hủy',
            onPress: () => console.log('Hủy xóa'),
            style: 'cancel',
          }
        ],
        {cancelable: false},
      );
    };

    const handleDelete = () => {
      dSERVICE
        .doc(id)
        .delete()
        .then(() => {
          Alert.alert('Delete susscess');
          navigation.goBack();
        })
        .catch(e => Alert.alert('Delete fail', e.message));
    };


    {
      isAdmin &&
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={confirmDelete}>
              <Icon
                source={require('../asset/dots.png')}
                size={30}                
                color={'white'}
              />              
            </TouchableOpacity>

          ),
        });
    }

    const getDetailService = dSERVICE.doc(id).onSnapshot(doc => {
      if (doc.exists) {
        setService(doc.data());
      } else setService(null);
    });
    return () => getDetailService();
  }, [id, userLogin, isAdmin]);

  const handleButtonPress = () => {
    if (isAdmin) {
      navigation.navigate('UpdateService', {id: service.id});
    } else {
      handleAddNewApppoiment();
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {service ? (
        <>
          <View style={{marginBottom: 10}}>
            {service.image && (
              <Image source={{uri: service.image}} style={{height: 300}} />
            )}
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={styles.txtName}>Tên: </Text>
            <Text style={styles.txtTitle}>{service.serviceName}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={styles.txtName}>Giá: </Text>
            <Text style={styles.txtTitle}>{service.price} VNĐ</Text>
          </View>
          {isAdmin && (
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={styles.txtName}>Tạo bởi: </Text>
              <Text style={styles.txtTitle}>{service.createBy}</Text>
            </View>
          )}
          {isAdmin === false && (
            <View style={{marginBottom: 10}}>
              <TouchableOpacity onPress={() => setOpen(true)} style={{flexDirection:'row'}}>
                <Text style={styles.txtName}>
                  Thời gian:{' '}</Text>
                  <Text style={styles.txtTitle}>
                  {datetime.toLocaleDateString() +
                    ' ' +
                    datetime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <DatePicker
            modal
            open={open}
            date={datetime}
            onConfirm={date => {
              setOpen(false);
              setDatetime(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Button
            mode="contained"
            onPress={handleButtonPress}
            style={{
              borderRadius: 5,
              backgroundColor: '#FF6666',
              marginTop: 10,
            }}>
            {isAdmin ? 'Cập nhật' : 'Đặt lịch'}
          </Button>
        </>
      ) : (
        <Text style={styles.txtTitle}>Không tìm thấy hoặc đã xóa dịch vụ</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  txtName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  txtTitle: {
    fontSize: 18,
  },
});
