import {Alert, ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React from 'react';
import auth from '@react-native-firebase/auth';

function ForgotPass({navigation}) {
  const [email, setEmail] = React.useState('');
  const handlResetPass = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Đã gửi xác nhận lấy lại mật khẩu về Email của bạn!'))
      .catch(e => Alert.alert(e.message));
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../asset/background.jpg")} resizeMode="cover" style={styles.imagebg}>
        <Text style={styles.headerName}>Quên mật khẩu</Text>
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
        <Button style={styles.button} mode="contained" onPress={handlResetPass}>
          Gửi mã xác nhận
        </Button>
        <View style={{flexDirection: 'column'}}>
          <Button onPress={() => navigation.navigate('Signin')}>
          <Text style={{color:"#FF6666"}}>Trở lại</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  headerName: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6666',
  },
  imagebg:{
    flex:1,
    justifyContent: 'center',
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
