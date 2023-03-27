import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '~/utils/generalStyles';
import { Avatar } from '@rneui/base';
import Avis from './Avis';

const SearchCard = () => {
  return (
    <TouchableOpacity style={styles.suggestionCard}>
      <View style={styles.info}>
        <Avatar title="islem" containerStyle={{ backgroundColor: 'red' }} rounded size={40} />
        <View style={styles.textContainer}>
          <Text>Islem Abdellaoui</Text>
          <Avis avis={3} />
        </View>
      </View>
      <Text style={{ fontWeight: '600' }}>Plumber</Text>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
});
