import React, {FC, useRef, useState, useEffect} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

import styles from './styles';

type NumberFieldProps = {
  onOTPChange: (otp: string) => void;
  login?:boolean
};
const NumberField: FC<NumberFieldProps> = ({onOTPChange,login}) => {
  const [enteredOTP, setEnteredOTP] = useState<string>('');
  const [otpArray, setOTPArray] = useState<string[]>(
    Array.from({length: 6}, () => ''),
  );

  useEffect(() => {
    setEnteredOTP(otpArray.join(''));
  }, [otpArray]);

  useEffect(() => {
    onOTPChange(enteredOTP);
    enteredOTP.length === 4 && Keyboard.dismiss();
  }, [enteredOTP]);

  const pinInputRefs = Array.from({length: 4}, () => useRef<TextInput>(null));
  const handlePinInputChange = (text: string, index: number) => {
    setOTPArray(prevOtpArray => {
      const newOtpArray = [...prevOtpArray];
      newOtpArray[index] = text;
      return newOtpArray;
    });
    if (text && index < otpArray.length - 1) {
      const nextInput = pinInputRefs[index + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && otpArray[index] === '') {
      setOTPArray(prevOtpArray => {
        const newOtpArray = [...prevOtpArray];
        newOtpArray[index - 1] = '';
        return newOtpArray;
      });
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        const previousInput = pinInputRefs[previousIndex].current;
        if (previousInput) {
          previousInput.focus();
        }
      }
    }
  };

  const {container, InputBox} = styles;
  return (
    <View style={container}>
      {otpArray.map((value, index) => (
        <TextInput
          defaultValue={''}
          key={index}
          value={value}
          ref={pinInputRefs[index]}
          style={InputBox}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => handlePinInputChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          secureTextEntry={login}
        />
      ))}
    </View>
  );
};
export default NumberField;
