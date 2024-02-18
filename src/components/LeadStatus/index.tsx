import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from 'config/Colors';
import useFontNormalise from 'hooks/useFontNormalise';
import {APP_FONTS} from 'config/Fonts';
import Icon from 'components/Icon';

export type LeadSectionTypes =
  | 'Lead Creation'
  | 'Vehicle Selection'
  | 'Sanction Letter'
  | 'Address Proof'
  | 'Employment Details'
  | 'References'
  | 'E-Nach Registration'
  | 'Loan Agreement'
  | 'Document Upload'
  | 'Vehicle Collateral Info'
  | 'Business Details';

type SectionScreenNames =
  | 'LeadCreation'
  | 'VehicleDetails'
  | 'SanctionLetter'
  | 'AddressProof'
  | 'EmploymentDetails'
  | 'References'
  | 'RepaymentDetails'
  | 'LoanAgreement'
  | 'DocumentUpload'
  | 'VehicleCollateralInfo';

export type StatusTypes = {
  active?: boolean;
  LeadSection: LeadSectionTypes;
  navigation?: SectionScreenNames;
  ToDo?: boolean;
};

const Status: FC<StatusTypes> = ({active = false, LeadSection, ToDo}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {active ? (
        <Icon name="checkbox-green" />
      ) : (
        <View style={styles.Unselected} />
      )}
      <Text
        style={[
          styles.StatusLabelText,
          {
            color: active
              ? Colors.Black
              : ToDo
              ? Colors.Blue
              : Colors.LeadSection,
            fontFamily: active || ToDo ? APP_FONTS.Medium : APP_FONTS.Regular,
          },
        ]}>
        {LeadSection}
      </Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  StatusLabelText: {
    fontSize: useFontNormalise(14),
    color: Colors.StatusLabelColor,
    textTransform: 'capitalize',
    left: 10,
  },
  Unselected: {
    borderColor: Colors.Grey,
    borderWidth: 1,
    borderRadius: 15,
    width: useFontNormalise(16),
    height: useFontNormalise(16),
  },
});
