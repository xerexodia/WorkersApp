import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '~/screens/client/Profile';
import UpdateProfile from '~/screens/client/UpdateProfile';

const Tab = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <Tab.Navigator initialRouteName="profile" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="updateProfile" component={UpdateProfile} />
    </Tab.Navigator>
  );
};

export default ProfileNav;
