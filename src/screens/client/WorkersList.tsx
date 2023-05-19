import { ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '~/utils/generalStyles';
import WorkerSuggestionCard from '~/components/WorkerSuggestionCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchCard from '~/components/SearchCard';
import { Avatar } from '@rneui/base';
import Avis from '~/components/Avis';

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
        {/* ------------------------------ */}
        <View style={styles.containerList}>
          <View style={styles.headerList}>
            <Avatar
              title="IA"
              containerStyle={{ backgroundColor: colors.brand }}
              rounded
              size={40}
            />
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
        {/* ------------------------------ */}
      </ScrollView>

      <ScrollView style={{ height: 680 }} showsVerticalScrollIndicator={false}>
        {/* --------------------------- */}
        <TouchableOpacity style={styles.suggestionCard}>
          <View style={styles.infoCard}>
            <Avatar
              title="AI"
              containerStyle={{ backgroundColor: colors.brand }}
              rounded
              size={40}
            />
            <View style={styles.textContainer}>
              <Text>Islem Abdellaoui</Text>
              <Avis avis={3} />
            </View>
          </View>
          <Text style={{ fontWeight: '600' }}>Plumber</Text>
        </TouchableOpacity>
        {/* --------------------------- */}
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
  containerList: {
    width: 200,
    height: 240,
    backgroundColor: colors.grey,
    borderRadius: 13,
    marginVertical: 7,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerList: {
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
});
