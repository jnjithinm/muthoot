import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Title from 'components/Title';
import Icon from 'components/Icon';
import {useNavigation} from '@react-navigation/native';

type HeaderType = {
  title: string;
  loanSummary: boolean;
  leadManagement: boolean;
  accountAggregator: boolean;
};

const Header: FC<HeaderType> = ({
  title,
  loanSummary,
  leadManagement,
  accountAggregator,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingVertical: 20,
        marginTop: 12,
        marginLeft: 12,
      }}>
      <TouchableOpacity
        onPress={() => {
          loanSummary
            ? navigation.navigate('LeadManagement' as never)
            : leadManagement
            ? navigation.navigate('Dashboard' as never)
            : accountAggregator
            ? navigation.navigate('ProductDetails' as never)
            : navigation.goBack();
        }}>
        <Icon name="arrow-back" />
      </TouchableOpacity>
      <Title text={title} heading />
    </View>
  );
};

export default Header;
