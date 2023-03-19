import React from 'react';
// components imports
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@rneui/themed';

// design helpers imports
import { colors, fonts, height } from '~/utils/generalStyles';

// icons imports
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Profile = () => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle={'dark-content'} />
        {/* ---------------header--------------- */}
        <View style={styles.header}>
          <View style={styles.info}>
            <Avatar
              size={84}
              rounded
              title="AI"
              titleStyle={{ color: colors.grey }}
              containerStyle={{ backgroundColor: colors.lightGrey }}
            />
            <Text style={styles.name}>Islem Abdellaoui</Text>
            <Text style={styles.place}>Sidi bouzid</Text>
          </View>
          {/* -----------------------stats--------------------*/}
          <View style={styles.box}>
            <View style={styles.statsContainer}>
              <Text style={styles.title}>Taches accomplis</Text>
              <Text style={styles.subTitle}> 150</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.title}>Taches en cours</Text>
              <Text style={styles.subTitle}> 3</Text>
            </View>
          </View>
        </View>
        {/*-----------------body-------------------*/}
        <View style={styles.body}>
          {/* account badge link */}
          <TouchableOpacity style={styles.badge}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="user" size={30} color={colors.brand} />
              <Text style={styles.link}>Mon Compte</Text>
            </View>
            <Entypo name="chevron-right" size={25} color={colors.grey} />
          </TouchableOpacity>
          {/* help center badge link */}
          <TouchableOpacity style={styles.badge}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Entypo name="help-with-circle" size={28} color={colors.brand} />
              <Text style={styles.link}>Centre d'aide</Text>
            </View>
            <Entypo name="chevron-right" size={25} color={colors.grey} />
          </TouchableOpacity>
          {/* loogout badge link */}
          <TouchableOpacity style={styles.badge}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="power-off" size={25} color={colors.brand} />
              <Text style={styles.link}>Logout</Text>
            </View>
            <Entypo name="chevron-right" size={25} color={colors.grey} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: '100%',
  },
  header: {
    height: height / 2.3,
    backgroundColor: colors.brand,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  info: {
    backgroundColor: colors.primary,
    height: '75%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  name: {
    marginVertical: 7,
    fontSize: fonts.m,
    fontWeight: '600',
  },
  place: {
    fontWeight: '600',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fonts.xs,
  },
  subTitle: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fonts.xs,
  },
  body: {
    marginTop: 30,
    paddingHorizontal: 30,
    height: '45%',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  link: {
    marginLeft: 20,
    fontWeight: '700',
    fontSize: fonts.s,
  },
});
