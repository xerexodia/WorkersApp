import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useAuthContext } from '~/context/AuthContext';
import axios from 'axios';
import { url } from '~/utils/contants';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fonts } from '~/utils/generalStyles';
import { Avatar } from '@rneui/base';
import { images } from '~/assets';

const ReservedTasks = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  const getData = async () => {
    return await axios.get(`${url}posts/reserved/post/${user._id}`);
  };
  useFocusEffect(
    useCallback(() => {
      getData()
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, [])
  );
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60, paddingTop: 10 }}>
      {data ? (
        data.map((item: any, idx: number) => (
          <TouchableOpacity style={styles.card} key={item._id}>
            <View style={styles.userInfo}>
              <Avatar
                rounded
                size={40}
                source={
                  item.workerId.photo
                    ? { uri: item.workerId.photo.replace('127.0.0.1', '10.0.2.2') }
                    : images.avatar
                }
              />
              <Text style={{ marginLeft: 10, fontSize: fonts.xs, fontWeight: '500' }}>
                {item.workerId.nom} {item.workerId.prenom}
              </Text>
            </View>
            <Text>reserved at: {item.reservedAt}</Text>
            <Text>Located in: {item.postId.adresse}</Text>
            <Text style={{ marginTop: 10, fontWeight: '500' }}>Description:</Text>
            <Text>{item.postId.description}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No Tasks yet</Text>
      )}
    </ScrollView>
  );
};

export default ReservedTasks;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 13,
    marginBottom: 10,
    elevation: 10,
    height: 200,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
});
