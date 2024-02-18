import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import Colors from 'config/Colors';
import { ErrorObject } from 'config/Types';
import useValidation from 'hooks/useValidation';
import styles from './styles';
import Icon from 'components/Icon';
import {
  ConvertToPrefixedAadharNumber,
  ConvertToPrefixedAmount,
  RemoveAadharPrefix,
  RemovePrefixes,
} from 'config/Functions/ConvertToPrefix';
import { useFocusEffect } from '@react-navigation/native';

export type validationTypes =
  | 'Mobile Number'
  | 'Customer Type'
  | 'Name'
  | 'Aadhaar Number'
  | 'Employer Name'
  | 'Alternate Contact'
  | "Father's Name"
  | "Spouse's Name"
  | 'Income (Monthly)'
  | 'Job Stability (In Month)'
  | 'PAN Number'
  | "Mother's Name"
  | 'Aadhaar Name'
  | 'Address line 1'
  | 'Address line 2'
  | 'Landmark'
  | 'Pincode'
  | 'City'
  | 'State'
  | 'Enter OTP'
  | 'District'
  | 'Epic Number'
  | 'Dl Number'
  | 'File Number'
  | 'Verified Status'
  | 'Year'
  | 'Year '
  | 'Company Name'
  | 'Constitution'
  | 'Address'
  | 'Pincode'
  | 'Passport Number'
  | 'Document Number'
  | 'Employee Code'
  | 'Ex-Showroom Price'
  | 'Ex-Showroom Price as Per Invoice'
  | 'Road Tax'
  | 'Insurance Amount'
  | 'Registration Charge'
  | 'Accessories'
  | 'On Road Price'
  | 'Margin'
  | 'Loan Amount Requested'
  | 'Tenure'
  | 'ROI'
  | 'Add On Charges'
  | 'LTV (%)'
  | 'LTV'
  | 'Final Loan Amount'
  | 'No of Advance EMI'
  | 'EMI Amount'
  | 'Charges'
  | 'Min and Max Tenure'
  | 'Remark'
  | 'Margin Based on Scheme'
  | 'Account Holder Name'
  | 'IFSC Code'
  | 'Account Number'
  | 'UPI ID'
  | 'Bank Name'
  | 'Phone Number'
  | 'E-mail ID'
  | 'Instrument No 1'
  | 'Instrument No 2'
  | 'Instrument No 3'
  | 'Engine Number'
  | 'Chassis Number'
  | 'Vehicle Registration Number'
  | 'Retail Invoice Number'
  | 'Performa Invoice Number'
  | 'Insurance Policy Number'
  | 'Sum Insured'
  | ' Premium Amount'
  | 'IP Paid at Dealer';


type LabeledTextInputProps = {
  label: validationTypes;
  placeholder?: string;
  halfSize?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  defaultValue: string;
  NumberPad?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  setErrorFlag: Dispatch<SetStateAction<ErrorObject[]>>;
  IsErrorArray: ErrorObject[];
  maxLength?: number;
  disabled?: boolean | null;
  isChange?: Dispatch<SetStateAction<boolean>>;
  type?: string;
  isSameAsKYCCurrent?: boolean;
  isSameAsKYCPermanent?: boolean;
  mandatory?: boolean;
  applicantType?: string;
};


const LabeledTextInput: FC<LabeledTextInputProps> = ({
  label,
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
  mandatory,
  isSameAsKYCCurrent,
  isSameAsKYCPermanent,
  applicantType
}) => {
  const { containerbox, inputbox, labelStyle } = styles;
  const { validateField } = useValidation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);
  const [onBlurDone, setOnBlurDone] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<TextInput | null>(null);

  type PrefixedTypes =
    | 'Income (Monthly)'
    | 'Ex-Showroom Price'
    | 'Road Tax'
    | 'Insurance Amount'
    | 'Registration Charge'
    | 'Accessories'
    | 'On Road Price'
    | 'Margin'
    | 'Loan Amount Requested'
    | 'Tenure'
    | 'ROI'
    | 'Charges'
    | 'LTV'
    | 'Final Loan Amount'
    | 'No of Advance EMI'
    | 'EMI Amount'
    | 'Min and Max Tenure'
    | 'Margin Based on Scheme';

  const isPrefixedType = (label: validationTypes): label is PrefixedTypes =>
    [
      'Income (Monthly)',
      'Ex-Showroom Price',
      'Road Tax',
      'Insurance Amount',
      'Registration Charge',
      'Accessories',
      'On Road Price',
      'Margin',
      'Loan Amount Requested',
      'Tenure',
      'ROI',
      'Charges',
      'LTV',
      'Final Loan Amount',
      'No of Advance EMI',
      'EMI Amount',
      'Min and Max Tenure',
      'Margin Based on Scheme',
    ].includes(label);

  const handleOnChangeText = (value: string) => {

    setValue(value);
    onChange(value);
    isChange(true);
    handleOnChange(value)
    // setErrorMessage('');
  };

  const handleOnChange = (value: string) => {
    if (isPrefixedType(label) && value === '.') {
      return;
    }
    // console.log("addOrUpdateError",value);

    setOnBlurDone(false);
    setErrorMessage('');
    setValue(value);
    onChange(value);
    isChange(true);

    let formattedValue = isPrefixedType(label)
      ? RemovePrefixes(String(value))
      : value;

    const { errorFlag, error } = validateField({
      FieldName: label,
      value: formattedValue ? formattedValue : value,
    });
    // console.log("addOrUpdateError",error);

    setIsError(errorFlag);
    setErrorMessage(error);
    addOrUpdateError(label, errorFlag);
  };

  const addOrUpdateError = (label: validationTypes, hasError: boolean) => {

    const index = IsErrorArray.findIndex(error => error.label === label);
    if (index !== -1) {
      const updatedError = { ...IsErrorArray[index], hasError };
      const updatedErrors = [...IsErrorArray];
      updatedErrors.splice(index, 1, updatedError);
      setErrorFlag(updatedErrors);
    } else {
      const newErrorObject: ErrorObject = { label, hasError };
      setErrorFlag(prevState => [...prevState, newErrorObject]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (defaultValue) {
        setValue(defaultValue);
      }
    }, [defaultValue])
  );


  useEffect(() => {
    if (isSameAsKYCCurrent) {
      setErrorMessage('');
    }
  }, [isSameAsKYCCurrent]);

  useEffect(() => {
    if (isSameAsKYCPermanent) {
      setErrorMessage('');
    }
  }, [isSameAsKYCPermanent]);

  const handleOnBlur = () => {
    handleOnChange(value);
    setOnBlurDone(true);
    setIsFocused(false);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === '.') {
      event.preventDefault();
    }
  };
  // if (label === 'Last Name') {

  // console.log("isError", label, defaultValue, isError, errorMessage);
  // }
  return (
    <View style={[containerbox, { width: halfSize ? '45%' : '90%' }]}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={[
            labelStyle,
            { color: isFocused ? Colors.Black : Colors.LabelGrey },
          ]}>
          {label}{' '}
        </Text>
        {mandatory && <Icon name="pointed-star" />}
      </View>
      <TextInput
        style={[
          inputbox,
          { borderColor: isFocused ? Colors.Black : Colors.LightGrey },
        ]}
        placeholder={placeholder || ''}
        contextMenuHidden={true}
        disableFullscreenUI={true}
        placeholderTextColor={Colors.PlaceHolderGrey}
        multiline
        onChangeText={handleOnChangeText}
        onBlur={handleOnBlur}
        keyboardType={NumberPad ? 'decimal-pad' : 'name-phone-pad'}
        value={
          isPrefixedType(label) && defaultValue
            ? ConvertToPrefixedAmount(String(defaultValue))
            : defaultValue
        }
        onFocus={() => setIsFocused(true)}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        textContentType="none"
        autoCorrect={false}
        editable={!disabled}
        onKeyPress={e => handleKeyPress(e)}
      />
      {isError && <Text style={styles.errorMessagge}>{errorMessage}</Text>}
    </View>
  );
};

export default LabeledTextInput;