import { StyleSheet, StatusBar, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Container, colors, fonts, height, width } from '~/utils/generalStyles';
import Input from '~/components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Formik } from 'formik';
import Button from '~/components/Button';
import * as yup from 'yup';

const RegisterWorker = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      <View style={styles.container}>
        <View>
          <Text style={styles.subtitle}>S'inscrire </Text>
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
              <Input
                label="Confirm Password:"
                placeholder="*********"
                onBlur={() => setFieldTouched('confirmpassword')}
                onChangeText={handleChange('confirmpassword')}
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

        <View style={styles.extraInfo}>
          <Text style={styles.link}>j'ai déja un compte</Text>
        </View>
      </View>
    </>
  );
};

export default RegisterWorker;

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 30,
    width: '100%',
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
