import React, {ReactNode, Children} from 'react';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';

import Colors from 'config/Colors';
import StatusBar from 'components/StatusBar';
import LoadingScreen from 'components/Loading';
import Header from 'components/Header';
import LinearGradient from 'react-native-linear-gradient';
import useFontNormalise from 'hooks/useFontNormalise';

type WaveBackgroundType = {
  children: ReactNode;
  backgroundColor?: string;
  loading?: boolean[];
  paddingHorizontal?: number;
  paddingVertical?: number;
  title?: string;
  PureScreen?: boolean;
  timer?: number;
  isProcessingScreen?: boolean;
};
const {height} = Dimensions.get('screen');
const WaveBackground = ({
  children,
  backgroundColor = Colors.Secondary,
  loading = [false],
  paddingHorizontal = 20,
  paddingVertical = 25,
  title,
  PureScreen,
  timer,
  isProcessingScreen,
}: WaveBackgroundType) => {
  const isLoading = Object.values(loading).some(value => value);
  const modifiedChildren = Children.map(children, child => {
    if (
      typeof child === 'undefined' ||
      child === null ||
      Number.isNaN(child) ||
      child == 'undefined' ||
      child === 'null' ||
      child === 'NaN'
    ) {
      return '';
    }
    return child;
  });

  return (
    <View style={[styles.container, {backgroundColor: Colors.Primary}]}>
      <StatusBar
        backgroundColor={title ? Colors.Primary : backgroundColor}
        barStyle={'light-content'}
      />
      {title && title !== 'login' && (
        <Header
          title={title}
          loanSummary={title === 'Loan Summary'}
          leadManagement={title === 'Lead Management'}
          accountAggregator={title === 'Account Aggregator '}
        />
      )}

      {title == 'Account Aggregator '  ? (
        <ScrollView>
          <View style={[styles.loginScreen, {backgroundColor}]}>
            {modifiedChildren}
          </View>
        </ScrollView>
      ) : title || PureScreen ? (
        <ScrollView
        // scrollEnabled={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={'always'}
          style={[
            styles.content,
            {
              borderTopRightRadius: title ? 20 : 0,
              backgroundColor: Colors.Secondary,
              borderTopLeftRadius: title ? 20 : 0,
            },
          ]}
          scrollsToTop
          // contentContainerStyle={{   alignItems:'center',justifyContent:'center'}}
          showsVerticalScrollIndicator={false}>
          {title === 'login' ? (
            <View style={[styles.loginScreen, {backgroundColor}]}>
              {modifiedChildren}
            </View>
          ) : PureScreen ? (
            <>{modifiedChildren}</>
          ) : (
            <View
              style={[
                styles.padding,
                {
                  paddingHorizontal: paddingHorizontal,
                  paddingVertical: paddingVertical,
                },
              ]}>
              {modifiedChildren}
            </View>
          )}
        </ScrollView>
      ) : (
        <LinearGradient
          colors={[Colors.Secondary, Colors.Primary]}
          style={styles.linearGradient}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}>
          <StatusBar backgroundColor={Colors.White} barStyle={false} />
          {modifiedChildren}
        </LinearGradient>
      )}
      {isLoading && (
        <LoadingScreen
          isProcessingScreen={isProcessingScreen}
          size={isProcessingScreen ? useFontNormalise(115) : undefined}
          timer={timer}
          isLoading={isLoading}
        />
      )}
      {/* {modalState.isVisible && !isLoading && (
        <Modal
          message={modalState.message}
          status={modalState.status}
          onClose={() => {
            hideModal();
            navigation.navigate('VehicleDetails' as never);
          }}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  content: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height: height,
  },
  loginScreen: {
    // flex: 1,

    height: height,
  },
});

export default WaveBackground;
