import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  avis?: number;
};

const Avis: React.FC<Props> = ({ avis }) => {
  avis ? avis : (avis = 0);
  let avisArray = Array(Math.round(avis)).fill(Math.ceil(avis));
  return (
    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
      {avisArray?.map((_, idx) => (
        <Ionicons name="star" size={13} color="yellow" style={{ marginRight: 2 }} />
      ))}
    </View>
  );
};

export default Avis;

const styles = StyleSheet.create({});
