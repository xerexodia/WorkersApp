import {
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { Container, ErrorText, colors, fonts, height, width } from '~/utils/generalStyles';
import Input from '~/components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Formik } from 'formik';
import Button from '~/components/Button';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';
import SelectComponent from '~/components/Select';
import ImagePickerComponent from '~/components/PickImageComponent';
import { url } from '~/utils/contants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '~/context/AuthContext';

const UpdateProfile = () => {
  const navigation = useNavigation<any>();
  const { setUser, setLoading, user } = useAuthContext();

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />

      <>
        <Formik
          initialValues={{
            photo: user.photo.replace('127.0.0.1', '10.0.2.2'),
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            adresse: user.adresse,
            password: user.password,
          }}
          onSubmit={async (values) => {
            let formData = new FormData();
            formData.append('photo', { uri: values.photo, type: 'image/jpeg', name: 'qsd' });
            formData.append('nom', values.nom);
            formData.append('prenom', values.prenom);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('adresse', values.adresse);
            await axios
              .patch(`${url}clients/update/${user._id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((res) => {
                AsyncStorage.removeItem('user'), setUser(null);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err), setLoading(false);
              });
          }}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <ScrollView
              style={styles.form}
              contentContainerStyle={{ paddingBottom: 50 }}
              showsVerticalScrollIndicator={false}
            >
              <ImagePickerComponent
                onImageSelected={(imageUri) => handleChange('photo')(imageUri)}
              />

              <Input
                label="Nom:"
                onBlur={() => setFieldTouched('nom')}
                onChangeText={handleChange('nom')}
                placeholder="jack"
                icon={<Ionicons name="person" color={colors.brand} size={28} />}
                value={values.nom}
              />
              <View style={styles.spacing} />
              <Input
                label="Prénom:"
                onBlur={() => setFieldTouched('prenom')}
                onChangeText={handleChange('prenom')}
                placeholder="abdellaoui"
                icon={<Ionicons name="person" color={colors.brand} size={28} />}
                value={values.prenom}
              />
              <View style={styles.spacing} />
              <Input
                label="E-mail:"
                onBlur={() => setFieldTouched('email')}
                onChangeText={handleChange('email')}
                placeholder="email@email.com"
                icon={<MaterialCommunityIcons name="email" color={colors.brand} size={28} />}
                value={values.email}
                keyboardType="email-address"
              />
              <View style={styles.spacing} />
              <Input
                label="Adresse:"
                onBlur={() => setFieldTouched('adresse')}
                onChangeText={handleChange('adresse')}
                placeholder="rue Ibn Khalddoun"
                icon={<Ionicons name="md-location-sharp" color={colors.brand} size={28} />}
                value={values.adresse}
              />
              <View style={styles.spacing} />
              <Input
                label="Password:"
                placeholder="*********"
                onBlur={() => setFieldTouched('password')}
                onChangeText={handleChange('password')}
                icon={<Foundation name="key" color={colors.brand} size={28} />}
                secureTextEntry={true}
                value={values.password}
              />
              <View style={styles.spacing} />

              <View style={styles.spacing} />
              <Button title="Submit" onPress={handleSubmit} />
            </ScrollView>
          )}
        </Formik>
      </>
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 30,
    width: '100%',
    position: 'relative',
  },
  spacing: {
    marginVertical: 5,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    paddingTop: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 28,
    marginTop: 10,
    marginBottom: 10,
    color: colors.blueViolance,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: fonts.xxl,
    fontWeight: '600',
    color: colors.grey,
    textAlign: 'center',
    paddingTop: 13,
    marginBottom: 12,
  },
  extraInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    textDecorationLine: 'underline',
    marginBottom: 5,
    fontWeight: '500',
  },
});
