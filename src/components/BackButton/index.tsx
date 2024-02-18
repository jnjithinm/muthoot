import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'components/Icon';

type BackButtonTypes = {
  isNavigation?: boolean;
  vehicleDetails?: boolean;
  LeadCreation?: boolean;
};

const BackButton: FC<BackButtonTypes> = ({
  isNavigation = false,
  vehicleDetails = false,
  LeadCreation = false,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    isNavigation || LeadCreation
      ? navigation.navigate('Dashboard' as never)
      : vehicleDetails
      ? navigation.navigate('LeadCreation' as never)
      : navigation.goBack();
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{marginVertical: 10, left: isNavigation ? 20 : 0}}>
      <Icon name="arrow-back" />
    </TouchableOpacity>
  );
};
export default BackButton;
