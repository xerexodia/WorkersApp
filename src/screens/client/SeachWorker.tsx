import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '~/utils/generalStyles';
import SearchCard from '~/components/SearchCard';
const SeachWorker = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.brand} />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons style={styles.icon} name="search" color={colors.brand} size={28} />
          <TextInput style={styles.input} />
        </View>
      </View>
      <ScrollView style={{ flex: 0.9 }}>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </ScrollView>
    </View>
  );
};

export default SeachWorker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  header: {
    flex: 0.1,
    backgroundColor: colors.brand,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
    width: '100%',
    borderRadius: 30,
    paddingLeft: 8,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    fontSize: fonts.s,
    width: '100%',
  },
});
