import React, { FC } from 'react';
import {View, StatusBar, SafeAreaView, Platform} from 'react-native';

type MyStatusBarType = {
  backgroundColor: any;
  barStyle?: any;
};

const MyStatusBar:FC<MyStatusBarType> = ({backgroundColor, barStyle}) => {
  if (Platform.OS === 'ios') {
    return (
      <View style={[backgroundColor]}>
        <SafeAreaView>
          <StatusBar translucent backgroundColor={backgroundColor} />
        </SafeAreaView>
      </View>
    );
  } else
    return (
      <StatusBar
        backgroundColor={backgroundColor}
        animated
        barStyle={barStyle? 'light-content' : 'dark-content'}
        // translucent
      />
    );
};

export default MyStatusBar;
