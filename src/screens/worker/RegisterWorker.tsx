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

const SignUpWorker = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState<'first' | 'second'>('first');
  const [data, setData] = useState<any>({});
  const { setUser, setLoading } = useAuthContext();

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      {step === 'first' ? (
        <View style={styles.container}>
          <View>
            <Text style={styles.subtitle}>S'inscrire </Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '', nom: '', prenom: '', adresse: '' }}
            onSubmit={(value) => {
              setData(value);
              setStep('second');
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required(),
              password: yup.string().min(8).max(18).required(),
              nom: yup.string().min(3).max(18).required(),
              prenom: yup.string().min(3).max(18).required(),
            })}
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
              <View style={[styles.form, { marginTop: 10 }]}>
                <Input
                  label="Nom:"
                  onBlur={() => setFieldTouched('nom')}
                  onChangeText={handleChange('nom')}
                  placeholder="jack"
                  icon={<Ionicons name="person" color={colors.brand} size={28} />}
                  error={touched.nom && errors.nom ? errors.nom : null}
                  value={values.nom}
                />
                <View style={styles.spacing} />
                <Input
                  label="Prénom:"
                  onBlur={() => setFieldTouched('prenom')}
                  onChangeText={handleChange('prenom')}
                  placeholder="abdellaoui"
                  icon={<Ionicons name="person" color={colors.brand} size={28} />}
                  error={touched.prenom && errors.prenom ? errors.prenom : null}
                  value={values.prenom}
                />
                <View style={styles.spacing} />
                <Input
                  label="E-mail:"
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  placeholder="email@email.com"
                  icon={<MaterialCommunityIcons name="email" color={colors.brand} size={28} />}
                  error={touched.email && errors.email ? errors.email : null}
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
                  error={touched.adresse && errors.adresse ? errors.adresse : null}
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
                  error={touched.password && errors.password ? errors.password : null}
                />
                <View style={styles.spacing} />

                <Button title="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>

          <Pressable onPress={() => navigation.navigate('login')} style={styles.extraInfo}>
            <Text style={styles.link}>j'ai déja un compte</Text>
          </Pressable>
        </View>
      ) : step === 'second' ? (
        <>
          <Formik
            initialValues={{
              description: '',
              photo: '',
              experience: '',
              profession: '',
            }}
            onSubmit={async (values) => {
              let formData = new FormData();
              formData.append('photo', { uri: values.photo, type: 'image/jpeg', name: 'qsd' });
              formData.append('nom', data.nom);
              formData.append('prenom', data.prenom);
              formData.append('email', data.email);
              formData.append('password', data.password);
              formData.append('adresse', data.adresse);
              formData.append('profession', values.profession);
              formData.append('experience', values.experience);
              formData.append('description', values.description);
              setLoading(true);
              await axios
                .post(`${url}register/workers`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then((res) => {
                  AsyncStorage.setItem('user', JSON.stringify(res.data)), setUser(res.data);
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err), setLoading(false);
                });
            }}
            validationSchema={yup.object().shape({
              description: yup.string().min(100).required(),
              experience: yup.string().required(),
              profession: yup.string().required(),
              photo: yup.string().required(),
            })}
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
              <ScrollView
                style={styles.form}
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
              >
                <Ionicons
                  name="arrow-back-outline"
                  size={30}
                  style={{ position: 'absolute', top: 10, left: 0 }}
                  onPress={() => setStep('first')}
                />

                <Text style={styles.title}>Complete your prfile</Text>
                <ImagePickerComponent
                  onImageSelected={(imageUri) => handleChange('photo')(imageUri)}
                />
                {touched.photo && errors.photo ? (
                  <ErrorText style={{ alignSelf: 'center' }}>{errors.photo}</ErrorText>
                ) : null}
                <View style={styles.spacing} />
                <SelectComponent
                  label="Profession:"
                  options={['plumber', 'babySitter', 'qsqdqsd', 'qsdqsde']}
                  selectedValue={values.profession}
                  onSelect={(value) => handleChange('profession')(value)}
                />
                {touched.profession && errors.profession ? (
                  <ErrorText>{errors.profession}</ErrorText>
                ) : null}
                <View style={styles.spacing} />
                <SelectComponent
                  label="Experience:"
                  options={['2 ans', '3 ans', '4 ans', '5 ans']}
                  selectedValue={values.profession}
                  onSelect={(value) => handleChange('experience')(value)}
                />
                {touched.experience && errors.experience ? (
                  <ErrorText>{errors.experience}</ErrorText>
                ) : null}
                <View style={styles.spacing} />
                <Input
                  label="Description:"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  placeholder="Describe your self"
                  multiline
                  numberOfLines={5}
                />
                {touched.description && errors.description ? (
                  <ErrorText>{errors.description}</ErrorText>
                ) : null}
                <View style={styles.spacing} />
                <Button title="Submit" onPress={handleSubmit} />
              </ScrollView>
            )}
          </Formik>
        </>
      ) : null}
    </>
  );
};

export default SignUpWorker;
const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 30,
    width: '100%',
    position: 'relative',
  },
  spacing: {
    marginVertical: 10,
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
    marginTop: 40,
    marginBottom: 20,
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
