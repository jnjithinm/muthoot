import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Title, Caption, Divider, Text } from 'react-native-paper';
import Colors from 'config/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthentication } from 'context/useAuthentication';
import { useEmployeeDetails } from 'context/useEmployeeDetails';
import DeviceInfo from 'react-native-device-info';
const { height } = Dimensions.get('screen');

const DrawerContent = () => {

  const { ActivateLoggingOut } = useAuthentication();
  const { ResetEmployeeDetails, employeeName, employeeId, roleDescription } = useEmployeeDetails();

  const Logout = () => {
    ResetEmployeeDetails();
    ActivateLoggingOut();
  };
  const appVersion = DeviceInfo.getVersion();
  console.log("appVersion", appVersion);
  return (
    <LinearGradient
      colors={[Colors.Secondary, Colors.Primary]}
      style={styles.linearGradient}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <View style={{ height: '92%' }}>
        <View style={styles.userInfoSection}>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Image
              source={require('../../assets/images/Profile.png')}
              style={{ height: 70, width: 70 }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Title style={styles.title}>{employeeName}</Title>
              <Caption style={styles.caption}>
                {employeeId}
              </Caption>
            </View>
            {/* <View
              style={{
                // flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}> */}
              <Text style={[{alignSelf: 'flex-end', marginHorizontal: 5, color: Colors.LabelGrey}]}>
                {`V${appVersion}`}
              </Text>
            {/* </View> */}
          </View>
        </View>
        <Divider
          style={{ height: 0.5, backgroundColor: 'white' }}
        />
      </View>

      <Divider style={{ height: 0.5, backgroundColor: 'white' }} />
      <TouchableOpacity
        onPress={Logout}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View style={styles.signOut}>
          <Image
            source={require('../../assets/images/Logout.png')}
            style={{ height: 20, width: 20, tintColor: Colors.White }}
          />
        </View>
        <Text style={[styles.title, { color: Colors.White }]}>Sign Out</Text>
      </TouchableOpacity>
    </LinearGradient >
  );
};
export default DrawerContent;
const styles = StyleSheet.create({
  drawerContent: {
    // flex: 2,
  },
  userInfoSection: {
    // paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    // marginTop: 3,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    // marginBottom: 10,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  linearGradient: {
    flex: 1,
    height: height,
  },
  avatarContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: Colors.LightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOut: {
    height: 35,
    // width: 35,
    // borderRadius: 17,
    // backgroundColor: Colors.LightGrey,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
