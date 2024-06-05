import {Alert, StyleSheet, View, Image, ImageBackground} from 'react-native';
import {Button, Icon, Text, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import '@react-native-firebase/app';
import {login, useMyContextController} from '../store';

function Signin({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const {userLogin} = controller;
  const [showPass, setShowPass] = React.useState(false);

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role == 'admin') {
        navigation.navigate('Admin');
      } else if (userLogin.role == 'customer') {
        navigation.navigate('Customer');
      }
    }
  }, [navigation, userLogin]);

  const handleLogin = () => {
    login(dispatch, email, pass);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../asset/background.jpg")} resizeMode="cover" style={styles.imagebg}>
      <Image
          source={require('../asset/aaaa.png')}
          style={{width:250,height:300, alignSelf: 'center'}}
      />
      <Text style={styles.headerName}>Đăng nhập</Text>
      <TextInput
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        textColor='white'
        theme={{colors:{primary:"#FF6666",onSurfaceVariant:"#FF6666"}}}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={!showPass}
        label={'Mật khẩu'}
        value={pass}
        onChangeText={setPass}
        theme={{colors:{primary:"#FF6666",onSurfaceVariant:"#FF6666"}}}
        textColor='white'
        right={
          <TextInput.Icon
            icon={showPass ? require('../asset/eye-hidden.png') : require('../asset/eye.png')}
            onPress={() => setShowPass(!showPass)}
          />
        }
        underlineColor="transparent"
        underlineStyle={0}
      />
      <Button style={styles.button} mode="contained" onPress={handleLogin}>
        Đăng nhập
      </Button>
      <View style={{flexDirection: 'row',justifyContent:'space-around'}}>
        <Button onPress={() => navigation.navigate('Signup')} >
          <Text style={{color:"#FF6666"}}>Đăng ký tài khoản</Text>
        </Button>
        <Button onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={{color:"#FF6666"}}>Quên mật khẩu</Text>
        </Button>
      </View>
      </ImageBackground>
    </View>
  );
}
export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebg:{
    flex:1
  },
  headerName: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6666',
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: 'none',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    padding: 5,
    backgroundColor: '#FF6666',
  },
});
