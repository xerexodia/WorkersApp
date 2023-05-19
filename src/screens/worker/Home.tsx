import { StyleSheet, Pressable, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useCallback } from 'react';
import axios from 'axios';
import { url } from '~/utils/contants';
import { colors, fonts } from '~/utils/generalStyles';
import { Avatar } from '@rneui/base';
import Modal from 'react-native-modal';

import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ModalComment } from '../client/Home';
import { images } from '~/assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const Home = () => {
  const [data, setData] = React.useState([]);
  const [visibleComment, setVisibleComment] = React.useState(false);
  const [postId, setPostId] = React.useState('');
  const navigation = useNavigation<any>();
  const getPosts = async () => {
    return await axios.get(`${url}posts`);
  };
  useFocusEffect(
    useCallback(() => {
      getPosts()
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, [])
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: fonts.xs, fontWeight: '500' }}>choose your next task</Text>
        <Text
          style={{ backgroundColor: colors.brand, color: 'white', padding: 10, borderRadius: 5 }}
        >
          Add Post
        </Text>
      </View>
      <ScrollView style={{ flex: 0.9 }} contentContainerStyle={{ paddingBottom: 80 }}>
        {data ? (
          data.map((item: any, idx: number) => (
            <TouchableOpacity
              style={styles.card}
              key={item._id}
              onPress={() => navigation.navigate('Details', { item: item })}
            >
              <View style={styles.userInfo}>
                <Avatar
                  rounded
                  size={40}
                  source={
                    item.clientId.photo
                      ? { uri: item.clientId.photo.replace('127.0.0.1', '10.0.2.2') }
                      : images.avatar
                  }
                />
                <Text style={{ marginLeft: 10, fontSize: fonts.xs, fontWeight: '500' }}>
                  {item.clientId.nom} {item.clientId.prenom}
                </Text>
              </View>
              <Text>Posted at: {item.createdAt}</Text>
              <Text>Located in: {item.adresse}</Text>
              <Text style={{ marginTop: 10, fontWeight: '500' }}>Description:</Text>
              <Text>{item.description}</Text>
              <Pressable
                style={styles.commentPress}
                onPress={() => {
                  setVisibleComment(true), setPostId(item._id);
                }}
              >
                <AntDesign style={{ marginRight: 10 }} name="heart" color={'red'} size={24} />
                <Fontisto name="comments" size={22} />
              </Pressable>
              <Modal
                isVisible={visibleComment}
                onBackdropPress={() => setVisibleComment(false)}
                backdropOpacity={0.1}
                swipeDirection={'down'}
                scrollHorizontal={true}
                avoidKeyboard={true}
                propagateSwipe={false}
              >
                <ModalComment itemId={postId} />
              </Modal>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No Tasks yet</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: fonts.s,
    flex: 0.1,
  },
  card: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 13,
    marginBottom: 10,
    elevation: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  commentPress: {
    marginTop: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
