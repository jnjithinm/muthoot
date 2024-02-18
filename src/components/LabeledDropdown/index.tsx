import React, { Dispatch, SetStateAction, FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from '../react-native-element-dropdown';

import Colors from 'config/Colors';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import Icon from 'components/Icon';

interface DropdownItem {
  label: string | number;
  value: string | number;
  // Add any other fields you need here
  schemeCode?: string;
  schemeName?: string;
  branchName?: string;
  branchCode?: string;
  branchId?: number,
  tenure?: string,
  roi?: number,
  dealerName?: string,
  dealerCode?: string;
  subDealerName?: string;
  subDealerCode?: string
  // ...
}

interface DropdownProps {
  label: string;
  options: DropdownItem[] | string[];
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  setSelectedItem?: Dispatch<SetStateAction<DropdownItem>>;
  halfSize?: boolean;
  disabled?: boolean;
  oneThird?: boolean;
  bottom?: boolean;
  defaultValue: string;
  isChange?: Dispatch<SetStateAction<boolean>>;
  leftLabeled?: boolean;
  upper?: boolean;
  mandatory?: boolean;
  number?: boolean;
  placeHolder?: string;

}

const CustomDropdown: FC<DropdownProps> = ({
  label,
  options,
  setSelectedOption,
  setSelectedItem,
  halfSize,
  disabled,
  oneThird,
  bottom,
  defaultValue,
  isChange,
  leftLabeled,
  upper = false,
  mandatory,
  number = false,
  placeHolder
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleDropdownChange = (item: any) => {
    
    setSelectedOption && setSelectedOption(item.value);
    setSelectedItem && setSelectedItem(item)
    isChange && isChange(true);
  };

  function isDropdownItem(item: any): item is DropdownItem {
    return typeof item === 'object' && item !== null;
  }
  let modifiedOptions: any;
  if (Array.isArray(options) && isDropdownItem(options[0])) {
    modifiedOptions = options;
  } else {
    modifiedOptions = options.map((item: any) => ({ label: item, value: item }));
  }



 
  return (
    <View
      style={[
        styles.container,
        {
          width: oneThird ? '30%' : halfSize ? '42%' : '90%',
          flexDirection: leftLabeled ? 'row' : 'column',
        },
      ]}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={[
            styles.label,
            leftLabeled && { alignSelf: 'center' },
            isFocused && { color: Colors.Black },
          ]}>
          {`${label}${leftLabeled ? '\b:\b' : ''}`}{' '}
        </Text>
        {mandatory && <Icon name="pointed-star" />}
      </View>
      <Dropdown
        data={modifiedOptions}
        value={defaultValue}
        onChange={handleDropdownChange}
        showsVerticalScrollIndicator={false}
        dropdownPosition={bottom || upper ? 'bottom' : 'top'}
        onFocus={() => {
          setIsFocused(true);
        }}
        searchPlaceholder='Search'
        activeColor={Colors.VeryLight}
        iconColor={Colors.Black}
        search
        onBlur={() => {
          setIsFocused(false);
        }}
        // onChangeText={(text) => (
        //   // console.log("ttttt",text),
        //   // console.log("iiirrr",modifiedOptions)

        // )}
        style={[
          styles.Container,
          { paddingHorizontal: oneThird ? 7 : 10, },
          { borderColor: isFocused ? Colors.Black : Colors.LightGrey },
          { borderBottomStartRadius: isFocused ? 0 : 15, borderBottomEndRadius: isFocused ? 0 : 15, }
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {
            fontSize: oneThird ? 13 : 15,
            // textTransform: label === 'Status' ? 'none' : 'capitalize',
          },
        ]}
        labelField={'label'}
        itemTextStyle={[
          styles.dropdownText,
          {
            fontSize: oneThird ? 9 : 13,
            // textTransform: label === 'Status' ? 'none' : 'capitalize',
          },
        ]}
        valueField={'label'}
        inputSearchStyle={{
          borderColor: 'gray',
          padding: 2,
          borderRadius: 9,
          height: 40
        }}
        containerStyle={[
          {
            // bottom: bottom ? '30%' : upper ? '100%' : 0,
            marginVertical: bottom ? -2 : 0,
            // elevation: 2,
            borderColor: 'gray',
            borderTopWidth: 0,
            borderBottomEndRadius: 9,
            borderBottomStartRadius: 9,
            borderWidth: .8,
            maxHeight: 250
          },
        ]}
        
        placeholderStyle={{ color: Colors.Secondary }}
        disable={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  label: {
    color: Colors.LabelGrey,
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
  },
  Container: {
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    height: 'auto',
    paddingVertical: 6,
    backgroundColor: 'transparent',

  },

  selectedTextStyle: {
    fontSize: useFontNormalise(15),
    justifyContent: 'center',
    paddingHorizontal: 5,
    color: 'black',
  },

  dropdownText: {
    fontSize: useFontNormalise(16),
    color: 'black',
  },
  dropdownTextHighlight: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomDropdown;
