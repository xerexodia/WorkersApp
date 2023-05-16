import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from '~/context/AuthContext';
import Login from '~/screens/Login';
import SignUp from '~/screens/SignUp';
import SignUpClient from '~/screens/client/register';
import SignUpWorker from '~/screens/worker/RegisterWorker';
import MyTabs from './worker/bottomTabNav';
import ClientBootomTabNav from './client/bottomTabNav';

const Tab = createNativeStackNavigator();
const AuthRoutes = () => {
  const { user } = useAuthContext();
  console.log(user);
  if (user) {
    if (user.role === 'worker') {
      return (
        <>
          <MyTabs />
        </>
      );
    }
    if (user.role === 'client') {
      return (
        <>
          <ClientBootomTabNav />
        </>
      );
    }
  } else {
    return (
      <Tab.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="login" component={Login} />
        <Tab.Screen name="signUp" component={SignUp} />
        <Tab.Screen name="signUpClient" component={SignUpClient} />
        <Tab.Screen name="signUpWorker" component={SignUpWorker} />
      </Tab.Navigator>
    );
  }
};

export default AuthRoutes;
