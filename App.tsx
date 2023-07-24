/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button, Text, View } from 'react-native';
import Input from './src/components/Input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '~/utils/generalStyles';
import Login from '~/screens/Login';
import SignUp from '~/screens/SignUp';
import Post from '~/components/Post';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PostDetails from '~/screens/PostDetails';
import Profile from '~/screens/client/Profile';
import { NavigationContainer } from '@react-navigation/native';
import ClientBootomTabNav from '~/routes/client/bottomTabNav';
import SeachWorker from '~/screens/client/SeachWorker';
import WorkerProfile from '~/screens/client/WorkerProfile';
import MyTabs from '~/routes/worker/bottomTabNav';
import AuthRoutes from '~/routes/authRoutes';
import Test from '~/components/PickImageComponent';
import { Formik } from 'formik';
import ImagePickerComponent from '~/components/PickImageComponent';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import AuthContext, { useAuthContext } from '~/context/AuthContext';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Hide all warning notifications on front-end

function App(): JSX.Element {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <AuthContext>
        <NavigationContainer>
          <AuthRoutes />
        </NavigationContainer>
      </AuthContext>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
export default App;
