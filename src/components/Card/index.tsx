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

        },
      ]}>
      {Children.map(children, (child, index) => (
        <View
          style={[
            styles.childContainer,
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
    paddingVertical: 5,
    marginVertical: 10,
    elevation:3
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
    backgroundColor: Colors.LabelGrey,
  },
});
export default Card;
