import React, { FC, useState, useCallback, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'components/Icon';
import WaveBackground from 'components/WaveBackground';
import { RootStackParamList } from 'navigation/HomeStack';
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from './DrawerContent';
import { styles } from './styles';
import { useAuthentication } from 'context/useAuthentication';
import { BackHandler, Alert } from 'react-native';
import { useEmployeeDetails } from 'context/useEmployeeDetails';
import {  useViewProspects } from 'api/ReactQuery/Lead';

type DashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;
type DashboardRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

interface DashboardScreenProps {
  navigation: DashboardNavigationProp;
  route: DashboardRouteProp;
}
const Dashboard: FC<DashboardScreenProps> = ({ navigation, route }) => {
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [userMobileNumber, setUserMobileNumber] = useState<string>('');
  const { ResetEmployeeDetails, employeeName, employeeId, roleDescription } = useEmployeeDetails();
  const { ActivateLoggingOut } = useAuthentication();

  const Logout = () => {
    ResetEmployeeDetails();
    ActivateLoggingOut();
  };

  type CircleDivTypes = {
    title: string;
    count: number | string;
  };

  const CircleDiv = ({ title, count }: CircleDivTypes) => {
    return (
      <TouchableOpacity
        onPress={() => {
          title !== 'EMI\nCalculator' && navigation.navigate('LeadManagement');
        }}
        style={styles.outerCircle}>
        <Text style={[styles.circleTitleStyle]}>{title}</Text>
        {title !== 'EMI\nCalculator' && (
          <Text style={styles.circleCountStyle}>{count}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const [
    ViewProspect,
    { data: ViewProspectData, isLoading: ViewProspectIsLoading },
  ] = useViewProspects(employeeId, '');


  useFocusEffect(
    React.useCallback(() => {
      ViewProspect.mutateAsync()

      const onBackPress = () => {
        // navigation.navigate('Dashboard')
        Alert.alert('Hold on!', 'Are you sure you want to quit application?', [
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerContent />;
      }}>
      <WaveBackground loading={[
        ViewProspectIsLoading
        ]}>
        <View
          style={{
            marginTop: '10%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => {
                setOpen(true);
              }}>
              <Icon name="profile" />
              <View style={{ backgroundColor: 'transparent', left: 15 }}>
                <Text style={styles.title}>{`Hello, ${employeeName}!`}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: '5%',
              // width: '90%',
              marginTop: '20%',
              height: '68%',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: 'row',
                marginVertical: '5%',
              }}>
              <CircleDiv title={'New\nTwo-Wheeler'} count={ViewProspectData?.length || 0} />
            </View>

          </View>
        </View>
      </WaveBackground>
    </Drawer>
  );
};

export default Dashboard;
