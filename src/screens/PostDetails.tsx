import { StatusBar, StyleSheet, Image, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import { colors, fonts, width } from '~/utils/generalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';
import axios from 'axios';
import { url } from '~/utils/contants';
import { useAuthContext } from '~/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
const PostDetails = (props: any) => {
  const item = props.route.params.item;
  const { user } = useAuthContext();
  const navigation = useNavigation<any>();
  return (
    <>
      <StatusBar backgroundColor={colors.blueElectrique} />
      <View>
        <View style={styles.header}>
          <Avatar
            size={64}
            rounded
            title={item.clientId.nom[0]}
            titleStyle={{ color: colors.grey }}
            containerStyle={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{item.clientId.nom}</Text>
        <View style={styles.body}>
          <View>
            {item.photo && (
              <Image
                style={{
                  width: '80%',
                  height: 200,
                  alignSelf: 'center',
                  marginBottom: 20,
                  borderRadius: 10,
                }}
                source={{ uri: item.photo.replace('127.0.0.1', '10.0.2.2') }}
              />
            )}
          </View>
          <View>
            <Text>
              Adresse: <Text style={{ marginLeft: 10, fontWeight: '500' }}>{item.adresse}</Text>{' '}
            </Text>
            <Text>
              Description:
              <Text style={{ marginLeft: 10, fontWeight: '500' }}>{item.description}</Text>{' '}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: 1000,
              top: 400,
              display: 'flex',
              width: '90%',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <Button
              title="réserver"
              onPress={async () => {
                await axios
                  .patch(`${url}posts?postId=${item._id}&workerId=${user._id}`)
                  .then((res) => navigation.navigate('Tasks', { screen: 'Reserved' }));
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    position: 'relative',
    backgroundColor: colors.blueElectrique,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  avatar: {
    backgroundColor: colors.lightGrey,
    position: 'absolute',
    top: 65,
    left: width / 2 - 32,
  },
  name: {
    alignSelf: 'center',
    marginTop: 35,
    fontSize: fonts.l,
    color: colors.dark,
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: 12,
    marginTop: 30,
    height: '100%',
    position: 'relative',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    marginLeft: 8,
    // fontSize: fonts.
    color: colors.dark,
  },
});
