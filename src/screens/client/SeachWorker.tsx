import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '~/utils/generalStyles';
import SearchCard from '~/components/SearchCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import Avis from '~/components/Avis';
const SeachWorker = (props: any) => {
  const item = props.route.params.item;
  const [field, setField] = useState('');
  const [filtredData, setFiltredData] = useState([]);
  const navigation = useNavigation<any>();
  console.log(filtredData.length);
  console.log(item[0].profession);
  useEffect(() => {
    const data = item.filter((x: any) => x.profession.includes(field));
    setFiltredData(data);
    return () => {};
  }, [field]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.brand} />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons style={styles.icon} name="search" color={colors.brand} size={28} />
          <TextInput style={styles.input} onChangeText={(text) => setField(text)} />
        </View>
      </View>
      <ScrollView style={{ flex: 0.9 }}>
        {filtredData?.map((y: any, idx: number) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('WorkerProfile', { item: item })}
            key={idx}
            style={styles.suggestionCard}
          >
            <View style={styles.infoCard}>
              <Avatar
                title={`${y.nom[0].toUpperCase() + y.prenom[0].toUpperCase()}`}
                containerStyle={{ backgroundColor: colors.brand }}
                rounded
                size={40}
                source={{ uri: y.photo?.replace('127.0.0.1', '10.0.2.2') }}
              />
              <View style={styles.textContainer}>
                <Text>
                  {y.nom} {y.prenom}
                </Text>
                <Avis avis={3} />
              </View>
            </View>
            <Text style={{ fontWeight: '600' }}>{y.profession}</Text>
          </TouchableOpacity>
        ))}
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
