import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '~/utils/generalStyles';
import { Text } from 'react-native';
import Home from '~/screens/client/Home';
import WorkersList from '~/screens/client/WorkersList';
import Profile from '~/screens/client/Profile';
import ProfileNav from './profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeachWorker from '~/screens/client/SeachWorker';
import WorkerProfile from '~/screens/client/WorkerProfile';
// import TopTab from './topTabNav';

const Tab = createBottomTabNavigator();

const Rap = createNativeStackNavigator();

const WOrkerNav = () => {
  return (
    <Rap.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Rap.Screen name="List" component={WorkersList} />
      <Rap.Screen name="Search" component={SeachWorker} />
      <Rap.Screen name="WorkerProfile" component={WorkerProfile} />
    </Rap.Navigator>
  );
};

export default function ClientBootomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
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
        name="WorkersList"
        component={WOrkerNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="person-search"
              size={30}
              color={focused ? colors.brand : colors.grey}
            />
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
              Find worker
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileNav}
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
