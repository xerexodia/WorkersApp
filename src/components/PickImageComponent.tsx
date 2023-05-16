import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import { Text, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native';

import { images } from '../assets';
import { Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '~/utils/generalStyles';

export function ImagePickerModal({ isVisible, onClose, onImageLibraryPress, onCameraPress }: any) {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <SafeAreaView style={styles.buttons}>
        <Pressable style={styles.button} onPress={onImageLibraryPress}>
          <Image style={styles.buttonIcon} source={images.image} />
          <Text style={styles.buttonText}>Library</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onCameraPress}>
          <Image style={styles.buttonIcon} source={images.camera} />
          <Text style={styles.buttonText}>Camera</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

export function ImagePickerAvatar({ uri, onPress, gallery }: any) {
  return (
    <>
      {gallery ? (
        <>
          <View
            style={{
              width: '100%',
              height: 90,
              backgroundColor: colors.tertiary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              borderColor: colors.grey,
              borderWidth: 1,
            }}
          >
            <Image
              style={{
                width: '80%',
                height: '95%',
              }}
              source={uri && { uri }}
            />
            <TouchableOpacity
              style={{
                width: 80,
                height: 30,
                position: 'absolute',
                backgroundColor: colors.lightGrey,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                opacity: 0.8,
              }}
              onPress={onPress}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
                source={images.camera}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.avatar}>
          <Image
            resizeMode="contain"
            style={styles.avatarImage}
            source={uri ? { uri } : images.avatar}
          />
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Image style={styles.addButtonIcon} source={images.addButton} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

interface ImagePickerComponentProps {
  onImageSelected?: (imageUri: string) => void;
  gallery?: boolean;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  gallery,
  onImageSelected,
}: any) => {
  const [imageUri, setImageUri] = useState<string | null | undefined>();
  const [visible, setVisible] = useState(false);
  const handleSelectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      handleImagePickerResponse
    );
  };

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      handleImagePickerResponse
    );
  }, []);
  const handleImagePickerResponse = (response: ImagePicker.ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image selection');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
    } else {
      const source = response.assets;
      setImageUri(source![0].uri);
      onImageSelected(source![0].uri);
      setVisible(false);
    }
  };

  return (
    <View>
      <ImagePickerAvatar uri={imageUri} onPress={() => setVisible(true)} gallery={gallery} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={handleSelectImage}
        onCameraPress={onCameraPress}
      />
    </View>
  );
};
export default ImagePickerComponent;
const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    position: 'relative',
  },
  avatarImage: {
    height: 120,
    width: 120,
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderWidth: 4,
    borderRadius: 120 / 2,
  },

  addButton: {
    height: 34,
    width: 34,
    backgroundColor: '#f2f2fC',
    borderRadius: 50,
    position: 'absolute',
    right: 105,
    bottom: 5,
  },
  addButtonIcon: {
    height: 34,
    width: 34,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  buttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
