import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '~/utils/generalStyles';
import { Avatar } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avis from './Avis';

const WorkerSuggestionCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar title="islem" containerStyle={{ backgroundColor: 'red' }} rounded size={40} />
        <View style={styles.info}>
          <Text style={styles.name}>Islem Abdellaoui</Text>
          <Avis avis={4.3} />
        </View>
      </View>
      <Text style={styles.profession}>I am carpenter</Text>
      <Text style={styles.desc}>
        qskgdqlsdlqksldkqlskdhlqhsdlqsdqs dnlqnksdqsdlqshdlkqhsdhqlksd
      </Text>
    </View>
  );
};

export default WorkerSuggestionCard;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 240,
    backgroundColor: colors.grey,
    borderRadius: 13,
    marginVertical: 7,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    marginLeft: 5,
  },
  name: {
    color: colors.primary,
    fontSize: fonts.xs,
    fontWeight: '500',
  },
  profession: {
    color: colors.primary,
    fontSize: fonts.m,
    fontWeight: '600',
    marginBottom: 20,
  },
  desc: {
    color: colors.primary,
    lineHeight: 20,
  },
});
