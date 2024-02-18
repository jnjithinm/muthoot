import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useFontNormalise from 'hooks/useFontNormalise';
import {APP_FONTS} from 'config/Fonts';

type DetailTileTypes = {
  label?: string;
  value?: string;
  inverted?: boolean;
};

const DetailTile: FC<DetailTileTypes> = ({
  label = 'Status',
  value,
  inverted,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 2,
        justifyContent: 'space-between',
        // width: '80%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        flex: 1,
      }}>
      <Text
        style={[
          styles.StatusLabelText,
          {
            color: '#888888',
            maxWidth:
              label === 'E-mail ID' || label === 'Name' || label === 'Branch'
                ? '30%'
                : label === 'Job Stability (In Month)'
                ? '70%'
                : '50%',
          },
        ]}>
        {label}
      </Text>
      <Text
        style={[
          styles.StatusValueText,
          {
            maxWidth:
              label === 'E-mail ID' || label === 'Name' || label === 'Branch'
                ? '75%'
                : label === 'Job Stability (In Month)'
                ? '30%'
                : '50%',
            textTransform:
              label === 'PAN' || label === 'E-mail ID' ? 'none' : 'capitalize',
          },
        ]}>
        {value}
      </Text>
    </View>
  );
};

export default DetailTile;

const styles = StyleSheet.create({
  StatusLabelText: {
    fontSize: useFontNormalise(14),
    fontFamily: APP_FONTS.Regular,
    fontWeight: '600',
    minWidth: '28%',
  },
  StatusValueText: {
    fontSize: useFontNormalise(14),
    color: '#333333',
    fontFamily: APP_FONTS.Roboto_Medium,
  },
});
