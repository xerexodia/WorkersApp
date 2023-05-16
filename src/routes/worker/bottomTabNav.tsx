import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/screens/worker/Home';
import Profile from '~/screens/worker/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors, fonts } from '~/utils/generalStyles';
import { Text } from 'react-native';
import TopTab from './topTabNav';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 10,
          marginHorizontal: 20,
          borderRadius: 60,
          padding: 7,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={26} color={focused ? colors.brand : colors.grey} />
          ),
          tabBarLabelStyle: {
            fontSize: fonts.xxs,
            fontWeight: '500',
            marginVertical: 2,
          },
          tabBarLabel: ({ ...props }) => (
            <Text
              style={{
                color: props.focused ? colors.brand : colors.grey,
                fontWeight: '600',
                marginBottom: 5,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TopTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="tasks" size={26} color={focused ? colors.brand : colors.grey} />
          ),
          tabBarLabelStyle: {
            fontSize: fonts.xxs,
            fontWeight: '500',
            marginVertical: 2,
            color: colors.grey,
          },
          tabBarLabel: ({ ...props }) => (
            <Text
              style={{
                color: props.focused ? colors.brand : colors.grey,
                fontWeight: '600',
                marginBottom: 5,
              }}
            >
              Tasks
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={26} color={focused ? colors.brand : colors.grey} />
          ),
          tabBarLabelStyle: {
            fontSize: fonts.xxs,
            fontWeight: '500',
            marginVertical: 2,
          },
          tabBarLabel: ({ ...props }) => (
            <Text
              style={{
                color: props.focused ? colors.brand : colors.grey,
                fontWeight: '600',
                marginBottom: 5,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
