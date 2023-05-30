import {
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ErrorText, Label, colors, fonts } from '~/utils/generalStyles';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import Input from '~/components/Input';
import Button from '~/components/Button';
import ImagePickerComponent from '~/components/PickImageComponent';
import * as yup from 'yup';
import axios from 'axios';
import { url } from '~/utils/contants';
import { useAuthContext } from '~/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const { user } = useAuthContext();
  const id = user?._id;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any>([]);
  const [visibleComment, setVisibleComment] = useState(false);
  const [postId, setPostId] = useState('');
  const getData = async () => {
    return await axios.get(`${url}posts/client/${id}`);
  };

  useFocusEffect(
    useCallback(() => {
      getData()
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.brand} />
        <Text style={styles.title}>Your posts</Text>
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Add post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 0.9 }}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 80 }}
      >
        <View>
          {data
            ? data?.map((item: any, idx: number) => (
                <View style={styles.card} key={item?._id}>
                  <Text style={styles.badge}>{item.status}</Text>
                  <View>
                    <Image source={{ uri: item.photo }} style={styles.image} />
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
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
                </View>
              ))
            : null}
        </View>
      </ScrollView>

      <Modal isVisible={visible} onBackdropPress={() => setVisible(false)} swipeDirection={'down'}>
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
              formData.append('clientId', id);
              formData.append('title', values.title);
              formData.append('description', values.description);
              formData.append('adresse', values.adresse);

              await axios
                .post(`${url}posts`, formData, {
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
  );
};

export const ModalComment = ({ itemId }: any) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef: any = useRef();
  const [comments, setComments] = useState<any>([]);

  const getComments = async () => {
    return await axios.get(`${url}comment?postId=${itemId}`);
  };

  useEffect(() => {
    setLoading(true);
    getComments().then((res) => {
      setComments(res.data), setLoading(false);
    });
    return () => {
      setComments([]);
    };
  }, [itemId]);
  const { user } = useAuthContext();
  const id = user?._id;
  return (
    <View
      style={{
        flex: 0.6,
        backgroundColor: 'white',
        borderRadius: 13,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        style={{ flex: 1, paddingHorizontal: 10, marginBottom: 45 }}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <ActivityIndicator size={35} />
          </View>
        ) : (
          comments?.map((cmt: any, idx: any) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'flex-start',
                marginBottom: 17,
              }}
              key={cmt.comment?._id}
            >
              <Text style={{ marginLeft: 10, marginBottom: 3 }}>{cmt?.user?.nom}</Text>
              <Text
                style={{
                  backgroundColor: colors.lightGrey,
                  marginRight: 40,
                  color: colors.dark,
                  fontWeight: '500',
                  letterSpacing: 0.3,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 12,
                }}
              >
                {cmt.comment?.content}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          backgroundColor: colors.lightGrey,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          bottom: 0,
        }}
      >
        <TextInput
          value={comment}
          onChangeText={(text: string) => setComment(text)}
          style={{ flex: 1 }}
        />
        <MaterialCommunityIcons
          name="send-circle"
          size={30}
          onPress={async () => {
            await axios
              .post(`${url}comment`, {
                creatorId: id,
                postId: itemId,
                content: comment,
              })
              .then((res) => {
                setComment('');
                setComments((prev: any) => [...prev, { user: user, comment: res.data }]);
              });
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    flexGrow: 0.2,
    flexShrink: 0.2,
    backgroundColor: colors.brand,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.blueViolance,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '500',
  },

  card: {
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    position: 'relative',
    elevation: 10,
    margin: 5,
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#0f761b90',
    color: colors.green,
    fontWeight: '500',
  },
  image: {
    height: 60,
    width: 100,
    borderRadius: 13,
    marginBottom: 15,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    color: colors.dark,
    fontSize: fonts.xs,
    fontWeight: '500',
    marginBottom: 15,
  },
  commentPress: {
    marginTop: 16,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
});
