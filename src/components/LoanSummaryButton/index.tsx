import React, {FC} from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';

import Colors from 'config/Colors';
import {APP_FONTS} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';

type LoanSummaryButtonTypes={
  onPress: () => void;
}

const LoanSummaryButton: FC<LoanSummaryButtonTypes> = ({onPress}) => {
  const {height} = Dimensions.get('screen');

  return (
    <TouchableOpacity
      style={{
        height: (height * 5.5) / 100,
        width: '90%',
        borderRadius: 7,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 8,
        justifyContent: 'center',
        backgroundColor: Colors.White,
        borderColor: Colors.Button,
        borderWidth: 1,
      }}
      onPress={()=>onPress()}>
      <Text
        style={{
          color: Colors.Button,
          fontFamily: APP_FONTS.Roboto_Medium,
          textAlign: 'center',
          fontSize: useFontNormalise(16),
          alignItems: 'center',
        }}>
        Loan Summary
      </Text>
    </TouchableOpacity>
  );
};
export default LoanSummaryButton;
