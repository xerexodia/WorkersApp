import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Container, colors, fonts, height, width } from '~/utils/generalStyles';
import Input from '~/components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Formik } from 'formik';
import Button from '~/components/Button';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { url } from '~/utils/contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '~/context/AuthContext';

const Login = () => {
  const navigation = useNavigation<any>();
  const { setUser, setLoading } = useAuthContext();
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Workers App</Text>
        <Text style={styles.subtitle}>Se Connecter</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            setLoading(true);
            await axios
              .post(`${url}login`, values)
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
              <Pressable onPress={() => navigation.navigate('signUp')} style={styles.extraInfo}>
                <Text style={styles.link}>Je n'ai pas un compte</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 30,
    width: '100%',
  },
  spacing: {
    marginVertical: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    paddingTop: 90,
  },
  title: {
    fontSize: fonts.xl,
    fontWeight: '600',
    color: colors.blueLavande,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: fonts.xxl,
    fontWeight: '600',
    color: colors.grey,
    marginBottom: 50,
  },
  extraInfo: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  link: {
    textDecorationLine: 'underline',
    marginBottom: 5,
    fontWeight: '500',
  },
});
