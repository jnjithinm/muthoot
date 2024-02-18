import React, {ReactNode, Children} from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from 'config/Colors';

type CardType = {
  children: ReactNode;
  paddingVeritcal?: string | number;
  horizontalLine?: boolean;
  ChildMarginVertical?: string;
  marginVertical?: number;
  marginBottom?: number;
  borderLine?:boolean;
};

const Card = ({
  children,
  paddingVeritcal = 15,
  horizontalLine,
  ChildMarginVertical,
  marginVertical,
  marginBottom,
  borderLine
}: CardType) => {
  const childrenCount = Children.count(children);
  return (
    <View
      style={[
        styles.container,
        {
          // paddingVertical: horizontalLine ? 0 : paddingVeritcal,
          // borderColor:borderLine?Colors.Blue:'white',
          // borderWidth:borderLine?1:0,
          // marginVertical: marginVertical ? marginVertical : 10,
          // marginBottom: marginBottom ? marginBottom : 10,
        },
      ]}>
      {Children.map(children, (child, index) => (
        <View
          style={[
            styles.childContainer,
            {
              // paddingVertical: horizontalLine ? paddingVeritcal : 0,
              // marginVertical: ChildMarginVertical ? ChildMarginVertical : 0,
            },
          ]}>
          {horizontalLine && index < childrenCount - 1 && (
            <View style={styles.border} />
          )}

          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    paddingHorizontal: 15,
    backgroundColor: Colors.White,
    borderRadius: 8,
    paddingVertical: 15,
    marginVertical: 10,
  },
  childContainer: {
    position: 'relative',

  },
  border: {
    position: 'absolute',
    left: -15,
    right: -15,
    bottom: 0,
    height: 0.5,
    backgroundColor: Colors.Blue,
  },
});
export default Card;
