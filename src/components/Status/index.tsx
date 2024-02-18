import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from 'config/Colors';
import useFontNormalise from 'hooks/useFontNormalise';
import {APP_FONTS} from 'config/Fonts';

type StatusValue = 'Loan_Approved' | 'In_progress' | 'Rejected';
type StatusType = {
  StatusLabel?: string;
  StatusValue: StatusValue | string;
  inverted?: boolean;
};

const Status: FC<StatusType> = ({
  StatusLabel = 'Status',
  StatusValue,
  inverted,
}) => {
  let finalStatus =
    StatusValue === 'Loan_Approved'
      ? 'Approved'
      : StatusValue === 'In_progress'
      ? 'In Progress'
      : StatusValue === 'rejected'
      ? 'Rejected'
      : StatusValue;
  function isStatusValue(value: any): value is StatusValue {
    return ['Approced', 'In_progress', 'Rejected'].includes(value);
  }
  const shouldCapitalize = !isStatusValue(StatusValue);
  return (
    <View style={{flexDirection: inverted ? 'column-reverse' : 'column'}}>
      <Text
        style={[
          styles.StatusValueText,
          {
            color:
              StatusValue === 'Approved'
                ? Colors.StatusValueGreen
                : StatusValue === 'In_progress'
                ? Colors.StatusValueOrange
                : StatusValue === 'rejected'
                ? Colors.StatusValueRed
                : Colors.Black,

            textTransform: shouldCapitalize ? 'capitalize' : 'none',
          },
        ]}>
        {finalStatus}
      </Text>
      <Text style={styles.StatusLabelText}>{StatusLabel}</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  StatusValueText: {
    fontSize: useFontNormalise(13),
    fontFamily: APP_FONTS.Medium,
    fontWeight: '600',
    minWidth: '28%',
  },
  StatusLabelText: {
    fontSize: useFontNormalise(11),
    color: Colors.StatusLabelColor,
    fontFamily: APP_FONTS.Regular,
    marginTop: 2,
  },
});
