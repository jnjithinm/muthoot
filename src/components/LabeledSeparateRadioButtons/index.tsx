import Card from 'components/Card';
import Title from 'components/Title';
import Colors from 'config/Colors';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type LabeledSeparateRadioButtonsTypes = {
  options: string[];
  setSelectedOption: Dispatch<SetStateAction<string>>;
  label: string;
  defaultValue: string;
  marginVertical?: number;
  disabled?:boolean;
};

const LabeledSeparateRadioButtons: FC<LabeledSeparateRadioButtonsTypes> = ({
  options,
  setSelectedOption,
  label,
  defaultValue,
  marginVertical = 0,
  disabled=false
}) => {
  const [selectedItem, setSelectedItem] = useState<string>('');

  useEffect(() => {
    if (defaultValue) {
      setSelectedItem(defaultValue);
    }
  }, [defaultValue]);
  const handleButtonPress = (item: string) => {
    setSelectedItem(item);
    setSelectedOption(item);
  };

  return (
    <View style={{marginVertical: marginVertical}}>
      <Title text={label} marginVertical={5} />
      {options.map((item, index) => (
        <View key={index}>
          <Card paddingVeritcal={17} borderLine={selectedItem === item}>
            <TouchableOpacity
              onPress={() => handleButtonPress(item)}
              style={{flexDirection: 'row', alignItems: 'center'}}
              disabled={disabled}>
              <View style={[styles.RadioButton,selectedItem===item && {borderColor:Colors.Blue}]}>
                {selectedItem === item && (
                  <View style={styles.RadioButtonSelected} />
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  {
                    color:
                      selectedItem === item
                        ? Colors.Black
                        : Colors.TextInputColor,
                  },
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      ))}
    </View>
  );
};

export default LabeledSeparateRadioButtons;

const styles = StyleSheet.create({
  RadioButton: {
    width: 16,
    height: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.TextInputBorderColor,
    backgroundColor:Colors.DropdownSelectedColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  RadioButtonSelected: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: Colors.RadioButtonColor,
  },
  label: {
    color: Colors.TextInputColor,
    fontFamily: APP_FONTS.Regular,
    fontSize: FONT_SIZE.s,
    fontWeight: '500',
  },
});
