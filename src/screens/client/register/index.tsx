import { StyleSheet, StatusBar, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts, width } from '~/utils/generalStyles';
import Input from '~/components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Formik } from 'formik';
import Button from '~/components/Button';
import * as yup from 'yup';

// register first step
const FirstStep = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>S'inscrire </Text>
          <Text style={styles.subtitle}>entrez votre contact</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(8).max(18).required(),
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
                error={touched.email && errors.email ? errors.email : null}
                value={values.email}
              />
              <View style={styles.spacing} />
              <Input
                label="Prénom:"
                onBlur={() => setFieldTouched('prenom')}
                onChangeText={handleChange('prenom')}
                placeholder="abdellaoui"
                icon={<Ionicons name="person" color={colors.brand} size={28} />}
                error={touched.email && errors.email ? errors.email : null}
                value={values.email}
              />
              <View style={styles.spacing} />
              <Input
                label="Adresse:"
                onBlur={() => setFieldTouched('adresse')}
                onChangeText={handleChange('adresse')}
                placeholder="sidi bouid"
                icon={<Ionicons name="location" color={colors.brand} size={28} />}
                error={touched.email && errors.email ? errors.email : null}
                value={values.email}
              />
              <View style={styles.spacing} />

              <Button title="Submit" onPress={handleSubmit} />
            </View>
          )}
        </Formik>

        <View style={styles.extraInfo}>
          <Text style={styles.link}>j'ai déja un compte</Text>
        </View>
      </View>
    </>
  );
};

// second step client register
const SecondStep = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>S'inscrire </Text>
          <Text style={styles.subtitle}>entrez votre contact</Text>
        </View>
        <Formik
          initialValues={{ email: '', pwd: '', confirmpwd: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(8).max(18).required(),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.form}>
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
                onBlur={() => setFieldTouched('pwd')}
                onChangeText={handleChange('pwd')}
                placeholder="**********"
                icon={<Foundation name="key" color={colors.brand} size={28} />}
                error={touched.email && errors.email ? errors.email : null}
                value={values.email}
              />
              <View style={styles.spacing} />
              <Input
                label="confirmer mot de passe:"
                onBlur={() => setFieldTouched('confirmpwd')}
                onChangeText={handleChange('confirmpwd')}
                placeholder="*********"
                icon={<Foundation name="key" color={colors.brand} size={28} />}
                error={touched.email && errors.email ? errors.email : null}
                value={values.email}
              />
              <View style={styles.spacing} />

              <Button title="Submit" onPress={handleSubmit} />
            </View>
          )}
        </Formik>

        <View style={styles.extraInfo}>
          <Text style={styles.link}>j'ai déja un compte</Text>
        </View>
      </View>
    </>
  );
};

export { FirstStep, SecondStep };

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
