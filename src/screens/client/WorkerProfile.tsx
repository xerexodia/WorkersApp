import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/base';
import { colors, fonts } from '~/utils/generalStyles';
import Avis from '~/components/Avis';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';

const WorkerProfile = (props: any) => {
  const item = props.route.params.item;
  console.log(item);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle={'dark-content'} />
      {/* -----------------------personal Info----------------------- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>
            Mme.{item.nom} {item.prenom}
          </Text>
          <Text style={styles.profession}>{item.profession}</Text>
        </View>
        <Avatar
          size={60}
          rounded
          title="IA"
          containerStyle={{ backgroundColor: '#6c5dd3', marginRight: 20 }}
          source={{ uri: item?.photo?.replace('127.0.0.1', '10.0.0.2') }}
        />
        {/* ------------------------review section--------------------- */}
      </View>
      <View style={styles.ratingContainer}>
        <Avis avis={3.8} size={18} />
        <Text style={styles.ratingText}>3.8 out of 5</Text>
        <Text>524 client review</Text>
      </View>
      {/* ---------------------contact buttons--------------------- */}
      <View style={styles.iconsContainer}>
        <Pressable style={[styles.iconPressable, { backgroundColor: '#e6edfa' }]}>
          <MaterialCommunityIcons name="email" size={32} color={'#3f8cff'} />
        </Pressable>
        <Pressable style={[styles.iconPressable, { backgroundColor: '#e2f2eb' }]}>
          <MaterialCommunityIcons name="phone" size={32} color={'#27ad61'} />
        </Pressable>
        <Pressable style={[styles.iconPressable, { backgroundColor: '#eaeaf7' }]}>
          <MaterialCommunityIcons name="android-messages" size={32} color={'#6c5dd3'} />
        </Pressable>
      </View>
      {/* ---------------------descripton cards------------------ */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <FontAwesome5 name="microscope" size={40} color="#6c5dd3" />
          <Text style={styles.expText}>{item.experience}</Text>
          <Text>experience</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome5 name="tasks" size={40} color="#27ad61" />
          <Text style={styles.expText}>62+</Text>
          <Text>accomplished tasks</Text>
        </View>
      </View>
      {/* ----------------------- personal Description---------------------- */}
      <Text style={styles.about}>About {item.nom}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
    </View>
  );
};

export default WorkerProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  name: {
    fontSize: fonts.m,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 2,
  },
  profession: {
    fontSize: fonts.xs,
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  ratingContainer: {
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fonts.s,
    color: colors.dark,
    fontWeight: '600',
    marginVertical: 3,
  },
  iconsContainer: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconPressable: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 35,
  },
  cardsContainer: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    width: 160,
  },
  expText: {
    fontSize: fonts.s,
    marginVertical: 5,
    fontWeight: '600',
    color: colors.dark,
  },
  about: {
    marginTop: 20,
    fontSize: fonts.m,
    color: colors.dark,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    paddingLeft: 10,
  },
});
