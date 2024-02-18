import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
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
  open: boolean;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setSelectedItem: Dispatch<SetStateAction<DropdownItem>>;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  isChange?: Dispatch<SetStateAction<boolean>>;
  defaultValue: ValueType;
  disabled?: boolean;
  mandatory?: boolean;
  halfSize?: boolean;
  oneThird?: boolean;
  placeHolder?: string;
  zIndex?: number;
  dropDownDirection?: 'DEFAULT' | 'TOP' | 'BOTTOM' | 'AUTO'
}

const LabelDropdown: FC<DropdownProps> = ({
  label,
  options,
  open,
  setSelectedOption,
  setDropdownOpen,
  setSelectedItem,
  defaultValue,
  isChange,
  disabled = false,
  halfSize,
  oneThird,
  mandatory,
  zIndex,
  dropDownDirection
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  function isDropdownItem(item: any): item is DropdownItem {
    return typeof item === 'object' && item !== null;
  }
  let modifiedOptions: any;
  if (Array.isArray(options) && isDropdownItem(options[0])) {
    modifiedOptions = options;
  } else {
    modifiedOptions = options.map((item: any) => ({ label: item, value: item }));
  }
  // console.log("cccccc", isFocused);


  return (
    <View
      style={[
        styles.container,
        {
          width: oneThird ? '30%' : halfSize ? '42%' : '90%',
          flexDirection: 'column',
        },
      ]}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.label, open && { color: Colors.Black }]}>
          {`${label}${''}`}{' '}
        </Text>
        {mandatory && <Icon name="pointed-star" />}
      </View>
      <DropDownPicker
        open={open}
        searchable
        value={defaultValue}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
          decelerationRate:'fast'
  }}
        items={modifiedOptions}
        placeholder=''
        setOpen={setDropdownOpen}
        setValue={setSelectedOption}
        onSelectItem={(item: any) => {
          setSelectedItem(item)
          isChange && isChange(true)
        }}
        searchPlaceholder='Search'
        searchContainerStyle={{
          borderColor: 'transparent',
          padding: 2
        }}
        searchTextInputStyle={{
          borderColor: 'gray',
          margin: 5
        }}
        showTickIcon={false}
        listItemContainerStyle={{
          height: 'auto',
          paddingVertical: 5,
        }}
        selectedItemContainerStyle={{
          backgroundColor: Colors.VeryLight,
        }}
        dropDownContainerStyle={{
          marginVertical: dropDownDirection == 'TOP' ? 0 : 11,
          // elevation: 2,
          borderColor: 'gray',
          borderTopWidth: 0,
        }}
        style={[
          styles.Container,
          { paddingHorizontal: oneThird ? 7 : 10 },
          { borderColor: open ? Colors.Black : Colors.LightGrey },
        ]}
        containerStyle={[
          // styles.dropdownContainerStyle,
          {
            zIndex: zIndex,
            justifyContent: 'center',
          },
        ]}
        dropDownDirection={dropDownDirection? dropDownDirection: 'BOTTOM'}
        textStyle={styles.dropdownText}
        labelStyle={styles.dropdownText}
        placeholderStyle={{ color: 'white' }}
        disabled={disabled}
        onOpen={() => open}
        onClose={() => open}
      // zIndex={1000}
      // zIndexInverse={3000}

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
    // minHeight: 20,
    marginTop: 10,
    height: 'auto',
    paddingVertical: 3.5,
    backgroundColor: 'transparent',
  },

  dropdownContainerStyle: {
    borderRadius: 5,
    justifyContent: 'center',
    height: 'auto',
   

  },
  selectedTextStyle: {
    fontSize: useFontNormalise(14),
    justifyContent: 'center',
    paddingHorizontal: 5,
    color: 'black',
    // textTransform: 'capitalize',
  },

  dropdownText: {
    fontSize: useFontNormalise(14),
    color: 'black',
    paddingVertical: 8,
    paddingHorizontal: 5
  },
  dropdownTextHighlight: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LabelDropdown;