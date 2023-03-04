import { StyleSheet, Text, Pressable, View, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts, height } from '~/utils/generalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const items = [
  {
    icon: <Ionicons name="person" size={40} color={colors.brand} />,
    text: 'i am client, looking for workers',
  },
  {
    icon: <MaterialCommunityIcons name="bag-personal" size={40} color={colors.brand} />,
    text: 'i am worker, looking for job',
  },
];

const SignUp = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Join Us as a client or a worker</Text>
          {items.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.box}>
              {item.icon}
              <Text style={styles.text}>{item.text}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.link}>
            <Text style={styles.textLink}>You have already an account?</Text>

            <Pressable>
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '90%',
    height: 160,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.lightGrey,
    borderRadius: 13,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  title: {
    fontSize: fonts.xl,
    textAlign: 'center',
    marginBottom: 50,
    color: colors.blueLavande,
    fontWeight: '600',
  },
  text: {
    fontSize: fonts.m,
    marginTop: 15,
  },
  link: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLink: {
    fontSize: fonts.xs,
    color: colors.grey,
  },
  loginLink: {
    fontSize: fonts.s,
    color: colors.brand,
    fontWeight: '600',
    marginLeft: 2,
    textDecorationLine: 'underline',
  },
});
