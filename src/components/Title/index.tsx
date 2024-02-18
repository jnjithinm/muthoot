import React, {FC} from 'react';
import {Text} from 'react-native';

import Colors from 'config/Colors';
import useFontNormalise from 'hooks/useFontNormalise';
import {APP_FONTS} from 'config/Fonts';

type TitleType = {
  text: string | undefined;
  size?: number;
  capitalize?: boolean;
  marginVertical?: number;
  heading?: boolean;
  color?: string;
  
};

const Title: FC<TitleType> = ({
  text,
  size,
  capitalize,
  marginVertical,
  heading,
  color,
}) => {
  return (
    <Text
      style={{
        color: color || Colors.White,
        fontSize: useFontNormalise(heading ? useFontNormalise(17) : size || 15),
        fontFamily: APP_FONTS.SemiBold,
        textTransform: capitalize ? 'capitalize' : 'none',
        marginVertical: marginVertical,
        left: 15,
        textAlign:'center'
      }}>
      {text}
    </Text>
  );
};

export default Title;
