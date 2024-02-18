import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {
  View,
  Text,
  TextInput as ReactNativeTextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import Colors from 'config/Colors';
import {ErrorObject} from 'config/Types';
import useValidation from 'hooks/useValidation';

import styles from './styles';

export type placeholderTypes =
  | 'Address line 1'
  | 'Address line 2'
  | 'City'
  | 'State'
  | 'Pincode'
  | 'Years'
  | 'Middle Name'
  | 'Last Name';

type TextInputProps = {
  placeholder: placeholderTypes;
  halfSize?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  defaultValue?: string | undefined;
  NumberPad?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  setErrorFlag: Dispatch<SetStateAction<ErrorObject[]>>;
  IsErrorArray: ErrorObject[];
  maxLength?: number;
  disabled?: boolean | null;
  isChange: Dispatch<SetStateAction<boolean>>;
};

const TextInput: FC<TextInputProps> = ({
  placeholder,
  halfSize,
  onChange,
  defaultValue,
  NumberPad,
  autoCapitalize,
  setErrorFlag,
  IsErrorArray,
  maxLength,
  disabled = false,
  isChange,
}) => {
  const {containerbox, inputbox} = styles;
  const {validateField} = useValidation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [onBlurDone, setOnBlurDone] = useState<boolean>(false);

  const handleOnChange = (value: string) => {
    console.log("textInput",value);
    
    setErrorMessage('');
    setValue(value);
    onChange(value);
    isChange(true);
    
    const {errorFlag, error} = validateField({
      FieldName: placeholder,
      value:  value,
    });
    setIsError(errorFlag);
    setErrorMessage(error);
    addOrUpdateError(placeholder, errorFlag);
  };

  const addOrUpdateError = (label: string, hasError: boolean) => {
    const index = IsErrorArray.findIndex(error => error.label === label);
    if (index !== -1) {
      const updatedError = {...IsErrorArray[index], hasError};
      const updatedErrors = [...IsErrorArray];
      updatedErrors.splice(index, 1, updatedError);
      setErrorFlag(updatedErrors);
    } else {
      const newErrorObject: ErrorObject = {label, hasError};
      setErrorFlag(prevState => [...prevState, newErrorObject]);
    }
  };

  const handleOnBlur = () => {
    // const {errorFlag, error} = validateField({
    //   FieldName: placeholder,
    //   value: defaultValue ?? value,
    // });
    // setIsError(errorFlag);
    // setErrorMessage(error);
    // addOrUpdateError(placeholder, errorFlag);
    handleOnChange(value);
    setOnBlurDone(true);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === '.') {
      event.preventDefault();
    }
  };

  return (
    <View style={[containerbox, {width: halfSize ? '47%' : '100%'}]}>
      <ReactNativeTextInput
        style={inputbox}
        placeholder={placeholder || ''}
        placeholderTextColor={Colors.PlaceHolderGrey}
        onChangeText={handleOnChange}
        onBlur={handleOnBlur}
        keyboardType={NumberPad ? 'decimal-pad' : 'default'}
        value={defaultValue}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        editable={!disabled}
        onKeyPress={e => handleKeyPress(e)}
      />
      {isError && onBlurDone && (
        <Text style={styles.errorMessagge}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default TextInput;
