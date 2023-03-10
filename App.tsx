/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import Input from './src/components/Input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '~/utils/generalStyles';
import Login from '~/screens/Login';
import SignUp from '~/screens/SignUp';
import { FirstStep, SecondStep } from '~/screens/client/register/index';
import Post from '~/components/Post';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Post />
    </SafeAreaProvider>
  );
}

export default App;
