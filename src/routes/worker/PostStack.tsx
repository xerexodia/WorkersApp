import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostDetails from '~/screens/PostDetails';
import Profile from '~/screens/client/Profile';
import UpdateProfile from '~/screens/client/UpdateProfile';
import Home from '~/screens/worker/Home';
import MyTabs from './bottomTabNav';

const Tab = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator initialRouteName="Homes" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Homes" component={MyTabs} />
      <Tab.Screen name="Details" component={PostDetails} />
    </Tab.Navigator>
  );
};

export default MainNav;
