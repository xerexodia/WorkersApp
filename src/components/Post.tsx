import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import { colors, fonts } from '~/utils/generalStyles';
const Post = () => {
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <View style={styles.info}>
          <Avatar
            size={64}
            rounded
            title="AI"
            titleStyle={{ color: colors.grey }}
            containerStyle={{ backgroundColor: colors.lightGrey }}
          />
          <View style={styles.contactInfo}>
            <Text style={styles.title}>Islem Abdellaoui</Text>
            <Text style={styles.date}>1d ago</Text>
            <Text>in sidi bouzid</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Description:</Text>
          <Text style={styles.description}>
            qsdkljqhsdkljhqsldhqlsdhlshdlq sqsdqsdqsdqs sqsdqsdqsdqsdqsdqsdqsdqsqqdqsdqsdqsd
            qskhqdlqkhsdkjhqsdkjhqsd
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: colors.primary,
    elevation: 10,
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: fonts.s,
    fontWeight: '600',
    color: colors.dark,
  },
  date: {
    fontWeight: '500',
    fontSize: fonts.xxs,
    color: colors.grey,
  },
  subTitle: {
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 5,
    fontSize: fonts.xs,
  },
  description: {
    marginLeft: 10,
    lineHeight: 23,
  },
});
