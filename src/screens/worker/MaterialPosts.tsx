import { StyleSheet, Pressable, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useCallback } from 'react';
import axios from 'axios';
import { url } from '~/utils/contants';
import { ErrorText, Label, colors, fonts } from '~/utils/generalStyles';
import { Avatar } from '@rneui/base';
import Modal from 'react-native-modal';

import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ModalComment } from '../client/Home';
import { images } from '~/assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Button from '~/components/Button';
import Input from '~/components/Input';
import ImagePickerComponent from '~/components/PickImageComponent';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuthContext } from '~/context/AuthContext';
const MaterialPosts = () => {
  const { user } = useAuthContext();
  const [data, setData] = React.useState<any>([]);
  const [visible, setVisible] = React.useState(false);
  const [visibleComment, setVisibleComment] = React.useState(false);
  const [postId, setPostId] = React.useState('');
  const navigation = useNavigation<any>();
  const getPosts = async () => {
    return await axios.get(`${url}materialpost`);
  };
  useFocusEffect(
    useCallback(() => {
      getPosts()
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      console.log(data);
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
          flex: 0.1,
        }}
      >
        <Text style={{ fontWeight: '500' }}>Material posts</Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.brand,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 4,
          }}
          onPress={() => setVisible(true)}
        >
          <Text style={{ color: 'white' }}>Add post</Text>
        </TouchableOpacity>
        <Modal
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          swipeDirection={'down'}
        >
          <View style={{ flex: 0.9, backgroundColor: 'white', borderRadius: 13, padding: 10 }}>
            <Formik
              initialValues={{
                title: '',
                description: '',
                adresse: '',
                photo: '',
              }}
              validationSchema={yup.object().shape({
                description: yup.string().min(10).required(),
                title: yup.string().required(),
                adresse: yup.string().required(),
                photo: yup.string().required(),
              })}
              onSubmit={async (values) => {
                let formData = new FormData();
                formData.append('photo', { uri: values.photo, type: 'image/jpeg', name: 'photo' });
                formData.append('workerId', user._id);
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('adresse', values.adresse);

                await axios
                  .post(`${url}materialpost`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  })
                  .then((res) => {
                    setData((prev: any) => [...prev, res.data]);
                    setVisible(false);
                  });
              }}
            >
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <>
                  <Label>Photo:</Label>
                  <ImagePickerComponent
                    gallery
                    onImageSelected={(imageUri) => handleChange('photo')(imageUri)}
                  />
                  {touched.photo && errors.photo ? (
                    <ErrorText style={{ alignSelf: 'center' }}>{errors.photo}</ErrorText>
                  ) : null}
                  <View style={{ marginVertical: 15 }} />
                  <Input
                    label="Tache:"
                    placeholder="tache"
                    onChangeText={handleChange('title')}
                    error={touched.title && errors.title ? errors.title : null}
                  />
                  <View style={{ marginVertical: 8 }} />
                  <Input
                    label="Adresse:"
                    placeholder="adresse"
                    onChangeText={handleChange('adresse')}
                    error={touched.adresse && errors.adresse ? errors.adresse : null}
                  />
                  <View style={{ marginVertical: 8 }} />
                  <Input
                    label="Description:"
                    placeholder="description"
                    onChangeText={handleChange('description')}
                    multiline
                    numberOfLines={4}
                    error={touched.description && errors.description ? errors.description : null}
                  />
                  <View style={{ marginVertical: 8 }} />
                  <Text style={{ marginVertical: 15, fontSize: fonts.xs, fontWeight: '600' }}>
                    ajouter Tache +
                  </Text>
                  <Button title="Submit" onPress={handleSubmit} />
                </>
              )}
            </Formik>
          </View>
        </Modal>
      </View>
      <ScrollView
        style={{ flex: 0.9, width: '80%' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {data ? (
          data?.map((item: any, idx: number) => (
            <TouchableOpacity style={styles.card} key={item._id}>
              <View style={styles.userInfo}>
                <Avatar
                  rounded
                  size={40}
                  source={
                    item?.workerId?.photo
                      ? { uri: item?.workerId?.photo.replace('127.0.0.1', '10.0.2.2') }
                      : images.avatar
                  }
                />
                <Text style={{ marginLeft: 10, fontSize: fonts.xs, fontWeight: '500' }}>
                  {item?.workerId.nom} {item?.workerId.prenom}
                </Text>
              </View>
              <Text>Posted at: {item?.createdAt}</Text>
              <Text>Located in: {item?.adresse}</Text>
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

export default MaterialPosts;

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
