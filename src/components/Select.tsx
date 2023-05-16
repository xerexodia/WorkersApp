import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Label, colors } from '~/utils/generalStyles';

interface SelectComponentProps {
  options: string[];
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  containerStyle?: object;
  optionContainerStyle?: object;
  optionTextStyle?: object;
  label?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  selectedValue,
  onSelect,
  containerStyle = {},
  optionContainerStyle = {},
  optionTextStyle = {},
  label,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(selectedValue);
  const handleOptionPress = (value: string) => {
    setModalVisible(false);
    onSelect?.(value);
    setValue(value);
  };

  return (
    <>
      <Label>{label}</Label>
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.selectButtonText}>{value ? value : 'Select'}</Text>
          <Icon name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.optionContainer, optionContainerStyle]}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={[styles.optionText, optionTextStyle]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    overflow: 'hidden',
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectButtonText: {
    fontSize: 22,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    minWidth: 200,
  },
  optionText: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default SelectComponent;
