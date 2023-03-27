import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '~/utils/generalStyles';
import WorkerSuggestionCard from '~/components/WorkerSuggestionCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchCard from '~/components/SearchCard';

const WorkersList = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.suggest}>Suggestion</Text>
        <Ionicons style={styles.icon} name="search" color={colors.brand} size={28} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: colors.lightGrey }}
      >
        <WorkerSuggestionCard />
        <WorkerSuggestionCard />
        <WorkerSuggestionCard />
      </ScrollView>

      <ScrollView style={{ height: 680 }} showsVerticalScrollIndicator={false}>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
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

export default WorkersList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 15,
    marginTop: 20,
  },
  suggest: {
    fontSize: fonts.l,
    fontWeight: '600',
  },
  searchContainer: {
    position: 'relative',
    backgroundColor: colors.secondary,
    paddingVertical: 3,
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
    margin: 20,
  },
  search: {
    color: colors.dark,
    fontSize: fonts.s,
    marginLeft: 50,
  },
  icon: {
    padding: 8,
    backgroundColor: colors.primary,
    elevation: 10,
    borderRadius: 30,
  },
});
