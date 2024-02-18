import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import CombinedProvider from 'context';
import HomeStack from './HomeStack';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <CombinedProvider>
        <HomeStack />
      </CombinedProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default RootNavigator;
