import { StyleSheet, StatusBar, Text, View, Pressable } from 'react-native';
import React from 'react';
import { colors, fonts, width } from '~/utils/generalStyles';
import Input from '~/components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Formik } from 'formik';
import Button from '~/components/Button';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { url } from '~/utils/contants';
import { useAuthContext } from '~/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// register first step
const SignUpClient = () => {
  const navigation = useNavigation<any>();
  const { setLoading, setUser } = useAuthContext();
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>S'inscrire </Text>
          <Text style={styles.subtitle}>entrez votre contact</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '', nom: '', prenom: '', adresse: '' }}
          onSubmit={async (values) => {
            setLoading(true);
            await axios
              .post(`${url}register/clients`, values)
              .then((res) => {
                AsyncStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err), setLoading(false);
              });
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            nom: yup.string().required(),
            prenom: yup.string().required(),
            password: yup.string().min(8).max(18).required(),
            adresse: yup.string().required(),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.form}>
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
              />
              <View style={styles.spacing} />
              <Input
                label="Mot de passe:"
                onBlur={() => setFieldTouched('password')}
                onChangeText={handleChange('password')}
                placeholder="**********"
                icon={<Foundation name="key" color={colors.brand} size={28} />}
                error={touched.password && errors.password ? errors.password : null}
                value={values.password}
              />
              <View style={styles.spacing} />
              <Input
                label="Adresse:"
                onBlur={() => setFieldTouched('adresse')}
                onChangeText={handleChange('adresse')}
                placeholder="sidi bouid"
                icon={<Ionicons name="location" color={colors.brand} size={28} />}
                error={touched.adresse && errors.adresse ? errors.adresse : null}
                value={values.adresse}
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
    </>
  );
};

export default SignUpClient;

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 30,
    width: '100%',
  },
  spacing: {
    marginVertical: 8,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    paddingTop: 20,
  },

  title: {
    fontSize: fonts.xxl,
    fontWeight: '600',
    color: colors.grey,
    textAlign: 'center',
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: fonts.s,
    marginVertical: 10,
  },
  extraInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  link: {
    textDecorationLine: 'underline',
    marginBottom: 5,
    fontWeight: '500',
  },
});
