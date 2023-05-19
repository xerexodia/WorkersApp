import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostDetails from '~/screens/PostDetails';
import Profile from '~/screens/client/Profile';
import UpdateProfile from '~/screens/client/UpdateProfile';
import Home from '~/screens/worker/Home';

const Tab = createNativeStackNavigator();

const PostNav = () => {
  return (
    <Tab.Navigator initialRouteName="Homes" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Homes" component={Home} />
      <Tab.Screen name="Details" component={PostDetails} />
    </Tab.Navigator>
  );
};

export default PostNav;
