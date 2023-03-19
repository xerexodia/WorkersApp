import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FinishedTasks from '~/screens/worker/FinishedTasks';
import Home from '~/screens/worker/Home';
import ReservedTasks from '~/screens/worker/ReservedTasks';
import { Text } from 'react-native';
import { colors, fonts } from '~/utils/generalStyles';
import { Animated, View, TouchableOpacity } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator initialRouteName="Reserved">
      <Tab.Screen
        name="Reserved"
        component={ReservedTasks}
        options={{
          tabBarLabel(props) {
            return (
              <Text
                style={{
                  color: props.focused ? colors.brand : colors.grey,
                  marginHorizontal: 15,
                  fontSize: 18,
                }}
              >
                Reserved
              </Text>
            );
          },
          tabBarAllowFontScaling: true,
          tabBarIndicatorStyle: {
            width: '30%',
            backgroundColor: colors.grey,
            height: 3,
            position: 'absolute',
            left: '10%',
            borderRadius: 10,
          },
          // tabBarActiveTintColor: 'white',
          // tabBarInactiveTintColor
          tabBarPressColor: 'white',
          tabBarPressOpacity: 0,
        }}
      />
      <Tab.Screen
        name="Finished"
        component={FinishedTasks}
        options={{
          tabBarLabel(props) {
            return (
              <Text
                style={{
                  color: props.focused ? colors.brand : colors.grey,
                  marginHorizontal: 15,
                  fontSize: 18,
                }}
              >
                Finished
              </Text>
            );
          },
          tabBarAllowFontScaling: true,
          tabBarIndicatorStyle: {
            width: '30%',
            backgroundColor: colors.grey,
            height: 3,
            position: 'absolute',
            left: '10%',
            borderRadius: 10,
          },
          // tabBarActiveTintColor: 'white',
          // tabBarInactiveTintColor
          tabBarPressColor: 'white',
          tabBarPressOpacity: 0,
        }}
      />
    </Tab.Navigator>
  );
}
