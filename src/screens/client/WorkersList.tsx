import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '~/utils/generalStyles';
import WorkerSuggestionCard from '~/components/WorkerSuggestionCard';
import Input from '~/components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WorkersList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.suggest}>Suggestion</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: colors.lightGrey }}
      >
        <WorkerSuggestionCard />
        <WorkerSuggestionCard />
        <WorkerSuggestionCard />
      </ScrollView>
      <View style={styles.searchContainer}>
        <TextInput style={styles.search} placeholder="search for worker" />
        <Ionicons style={styles.icon} name="search" color={colors.brand} size={28} />
      </View>
      <ScrollView style={{ height: 280 }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 80, backgroundColor: 'red', margin: 8 }} />
        <View style={{ height: 80, backgroundColor: 'red', margin: 8 }} />
        <View style={{ height: 80, backgroundColor: 'red', margin: 8 }} />
        <View style={{ height: 80, backgroundColor: 'red', margin: 8 }} />
        <View style={{ height: 80, backgroundColor: 'red', margin: 8 }} />
        <View style={{ height: 80, backgroundColor: 'red', margin: 8 }} />
        <View style={{ height: 80, backgroundColor: 'red', margin: 8 }} />
      </ScrollView>
    </View>
  );
};

export default WorkersList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  suggest: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: fonts.l,
    fontWeight: '600',
    marginBottom: 5,
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
    position: 'absolute',
    top: 12,
    left: 15,
  },
});
