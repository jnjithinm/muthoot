import React, {Dispatch, SetStateAction, useState, FC, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Colors from 'config/Colors';

import styles from './styles';

type LabeledRadioButtonGroupProps = {
  heading: string;
  options: string[];
  onChange: Dispatch<SetStateAction<string>>;
  value?: string;
  disabled?: boolean;
  isChange: Dispatch<SetStateAction<boolean>>;
  inLine?: boolean;
};

const LabeledRadioButtonGroup: FC<LabeledRadioButtonGroupProps> = ({
  heading,
  options,
  onChange,
  value = '',
  disabled = false,
  isChange,
  inLine,
}) => {
  const defaultValue = options.findIndex(label => label === value);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
      setSelectedIndex(defaultValue);
  }, [defaultValue]);

  const handlePress = (index: number, label: string) => {
    setIsActive(true);
    onChange(label);
    isChange(true);
  };

  let modifiedOptions = [...options];
  const remainder = options.length % 3;
  if (remainder === 1 || remainder === 2) {
    const numToAdd = 3 - remainder;
    for (let i = 0; i < numToAdd; i++) {
      modifiedOptions.push('');
    }
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 200);
    }
  }, [isActive]);

  return (
    <View style={[styles.container, inLine && {flexDirection: 'row',width:'85%'}]}>
      <Text style={[styles.labeltext, isActive && {color: Colors.Black}]}>
        {heading}
      </Text>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          display: 'flex',
          marginTop: inLine ? 5 : 15,
          alignItems: 'center',
          alignSelf: 'center',
          marginLeft: inLine ? 30 : 0,
        }}>
        {modifiedOptions.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
            key={index}>
            {item !== '' && (
              <TouchableOpacity
                key={index}
                disabled={disabled}
                onPress={() => handlePress(index, item)}
                style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.RadioButton,
                    selectedIndex === index && {borderColor: Colors.Black},
                  ]}>
                  {selectedIndex === index && (
                    <View style={styles.RadioButtonSelected} />
                  )}
                </View>
                <Text
                  style={[
                    styles.label,
                    {
                      color:
                        selectedIndex === index
                          ? Colors.Black
                          : Colors.LabelGrey,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default LabeledRadioButtonGroup;
