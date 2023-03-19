import { StatusBar, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import { colors, fonts, width } from '~/utils/generalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const PostDetails = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.blueElectrique} />
      <View>
        <View style={styles.header}>
          <Avatar
            size={64}
            rounded
            title="AI"
            titleStyle={{ color: colors.grey }}
            containerStyle={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Islem Abdellaoui</Text>
        <View style={styles.body}>
          <View style={styles.box}>
            <MaterialCommunityIcons name="clock-time-four" size={30} color={colors.brand} />
            <Text style={styles.text}>32 min ago</Text>
          </View>
          <View style={styles.box}>
            <MaterialIcons name="location-on" size={32} color={colors.brand} />
            <Text style={styles.text}>Sidi bouzid</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    position: 'relative',
    backgroundColor: colors.blueElectrique,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  avatar: {
    backgroundColor: colors.lightGrey,
    position: 'absolute',
    top: 65,
    left: width / 2 - 32,
  },
  name: {
    alignSelf: 'center',
    marginTop: 35,
    fontSize: fonts.l,
    color: colors.dark,
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: 12,
    marginTop: 30,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    marginLeft: 8,
    // fontSize: fonts.
    color: colors.dark,
  },
});
