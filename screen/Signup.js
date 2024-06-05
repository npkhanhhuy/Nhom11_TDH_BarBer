import {Alert, ImageBackground, StyleSheet, View} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import React from 'react';
import '@react-native-firebase/app';
import {signup} from '../store';

function Signup({navigation}) {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleCreateAccount = () => {
    const role = 'customer';
    signup(email, pass, fullname, phone, role);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../asset/background.jpg")} resizeMode="cover" style={styles.imagebg}>
      <Text style={styles.headerName}>Đăng ký</Text>
      <TextInput
        style={styles.textInput}
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        underlineColor="transparent"
        underlineStyle={0}
        textColor='white'
        theme={{colors:{primary:"#FF6666",onSurfaceVariant:"#FF6666"}}}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={!showPass}
        label={'Mật khẩu'}
        value={pass}
        onChangeText={setPass}
        underlineColor="transparent"
        underlineStyle={0}
        textColor='white'
        theme={{colors:{primary:"#FF6666",onSurfaceVariant:"#FF6666"}}}
        right={
          <TextInput.Icon
          icon={showPass ? require('../asset/eye-hidden.png') : require('../asset/eye.png')}
          onPress={() => setShowPass(!showPass)}/>
        }
      />
      <TextInput
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={(text) => { setConfirmPassword(text); }}
          style={styles.textInput}
          secureTextEntry={!showPass}
          underlineColor="transparent"
          underlineStyle={0}
          textColor='white'
          theme={{colors:{primary:"#FF6666",onSurfaceVariant:"#FF6666"}}}
          right={
            <TextInput.Icon
            icon={showPass ? require('../asset/eye-hidden.png') : require('../asset/eye.png')}
            onPress={() => setShowPass(!showPass)}/>
          }        
      />
      <TextInput
        style={styles.textInput}
        label={'Họ và Tên'}
        value={fullname}
        onChangeText={setFullname}
        underlineColor="transparent"
        underlineStyle={0}
        textColor='white'
        theme={{colors:{primary:"#FF6666",onSurfaceVariant:"#FF6666"}}}
      />
      <TextInput
        style={styles.textInput}
        label={'Số điện thoại'}
        value={phone}
        onChangeText={setPhone}
        underlineColor="transparent"
        underlineStyle={0}
        textColor='white'
        theme={{colors:{primary:"#FF6666",onSurfaceVariant:"#FF6666"}}}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleCreateAccount}>
        Đăng ký
      </Button>
      <View style={{flexDirection: 'row'}}>
        <Button onPress={() => navigation.navigate('Signin')}>
        <Text style={{color:"#FF6666"}}>Đăng nhập tài khoản!</Text>
        </Button>
      </View>
      </ImageBackground>
    </View>
  );
}
export default Signup;

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
