import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screen/Signup';
import Signin from '../screen/Signin';
import ForgotPass from '../screen/ForgotPass';
import Admin from '../screen/Admin';
import Customer from '../screen/Customer';
import UpdateService from '../screen/UpdateService';
import {useMyContextController} from '../store';
import CustomerAdmin from '../screen/CustomerAdmin';
import Profile from '../screen/Profile';
import ChangePassword from '../screen/ChangePass';
import ProfileAllUser from '../screen/ProfileAllUser';
import AppointmentDetail from '../screen/AppointmentDetail';
import EditProfile from '../screen/EditProfile';
import Mapp from '../screen/Mapp';

const Stack = createStackNavigator();
const MyStack = ({}) => {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;

  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{headerMode: 'none'}}>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerTitle: 'Đăng ký',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="CustomerAdmin" component={CustomerAdmin} />
      <Stack.Screen
        name="ChangePass"
        component={ChangePassword}
        options={{
          headerTitle: 'Đổi mật khẩu',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen name="Mapp" component={Mapp} />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
        options={{
          headerTitle: 'Appointment Detail',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Thông tin cá nhân',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Thay đổi thông tin',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen
        name="ProfileAllUser"
        component={ProfileAllUser}
        options={{
          headerTitle: 'Thông tin cá nhân',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen
        name="UpdateService"
        component={UpdateService}
        options={{
          headerTitle: 'Update Service',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#FF6666'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
    </Stack.Navigator>
  );
};
export default MyStack;
