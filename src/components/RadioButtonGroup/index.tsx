import React, {Dispatch, SetStateAction, useState, FC, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Colors from 'config/Colors';
import Icon from 'components/Icon';
import styles from './styles';

type LabeledRadioButtonGroupProps = {
  heading: string;
  options: string[];
  onChange: Dispatch<SetStateAction<string>>;
  value?: string;
  disabled?: boolean;
  isChange: Dispatch<SetStateAction<boolean>>;
  inLine?: boolean;
  mandatory?: boolean;
};

const LabeledRadioButtonGroup: FC<LabeledRadioButtonGroupProps> = ({
  heading,
  options,
  onChange,
  value,
  disabled = false,
  isChange,
  inLine,
  mandatory,
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
    <View style={[styles.container, {paddingHorizontal: 15}]}>
      <Text style={[styles.labeltext, isActive && {color: Colors.Black}]}>
        {heading} <Icon name="pointed-star" />
      </Text>

      <View
        style={{
          flexDirection: inLine ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          display: 'flex',
          marginTop: inLine ? 15 : 15,
          // marginLeft: inLine ? 0 : 0,
        }}>
        {modifiedOptions.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 10,
              justifyContent: 'space-around',
              marginRight: 30,
              // flex: inLine?0: 0,
              // backgroundColor: 'red'
            }}
            key={index}>
            {item !== '' && (
              <TouchableOpacity
                key={index}
                disabled={disabled}
                onPress={() =>
                  item == 'CKYC' ? null : handlePress(index, item)
                }
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
