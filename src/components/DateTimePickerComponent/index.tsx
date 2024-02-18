import React, { FC, useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateTimePickerProps {
  selectedDate: Date;
  onDateChange: (date: any) => void;
  showPicker: boolean
}

const DateTimePickerComponent: FC<DateTimePickerProps> = ({ selectedDate, onDateChange, showPicker, }) => {
  // console.log("showPicker", showPicker);
  const onChange = (event: any, selectedDate: Date | undefined) => {
    console.log("seeeeeee", selectedDate);

    // event.type == 'set' ?
     onDateChange(event.type == 'set' ? selectedDate : selectedDate) 
    //  : null 
  };

  return (
    <View>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate || new Date()}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateTimePickerComponent;
