import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import WaveBackground from 'components/WaveBackground';
import * as Animatable from 'react-native-animatable';
import { useLogin } from 'api/ReactQuery/Auth';
import { useTheme } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation/HomeStack';
import Colors from 'config/Colors';
import { useAuthentication } from 'context/useAuthentication';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import { MODAL_CONST } from 'config/StringConstants';
import { useEmployeeDetails } from 'context/useEmployeeDetails';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
}

const Login: FC<LoginScreenProps> = ({ navigation, route }) => {
  const { colors } = useTheme();
  // const dispatch = useDispatch();
  // const themeColor = useSelector(state => state.userReducer)
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { SaveEmployeeId, SaveEmployeeName, SaveRoleDescription } = useEmployeeDetails();
  const { ActivateLoggingIn } = useAuthentication();
  const [textInputHolder, setTextInputHolder] = useState<string >('');
  const [captchaHolder, setCaptchaHolder] = useState<string >('');
  const [randomNumberOne, setRandomNumberOne] = useState<string >('');

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    loading: false,
  });

  const LoginData = {
    password: data.password,
    employeeId: data.username,
  };

  const [
    Authentication,
    { data: AuthenticationData, isLoading: AuthenticationIsLoading },
  ] = useLogin(LoginData);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captchaCode = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captchaCode += characters.charAt(randomIndex);
    }

    setRandomNumberOne(captchaCode);
    setTextInputHolder('');
  };


  const validateCaptchaCode = () => {
    // console.log("kijj",textInputHolder, randomNumberOne);
    
    if (String(textInputHolder) === String(randomNumberOne)) {
      // Captcha match
      // Alert.alert('Captcha Matched');
      loginHandle(data.username, data.password);

    } else {
      // Captcha not match
      useShowFlashMessage('warning', 'Invalid Captcha');

      // Alert.alert('Invalid Captcha');
    }
    // Calling captcha function, to generate captcha code
    generateCaptcha();
  };

  useEffect(() => {
    if (AuthenticationData?.employeeId) {
      SaveEmployeeId(AuthenticationData.employeeId);
      SaveEmployeeName(AuthenticationData.employeeName);
      SaveRoleDescription(AuthenticationData.roleDescription);
      ActivateLoggingIn();
    }
  }, [AuthenticationData]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const textInputChange = (val: string) => {
    setData({
      ...data,
      username: val,
      check_textInputChange: true,
      isValidUser: /^[a-zA-Z0-9]+$/.test(val),
    });
  };

  const handlePasswordChange = val => {
    // if (/^[ A-Za-z0-9_@./#&+-]*$/.test(val)) {
    //   setData({
    //     ...data,
    //     password: val,
    //     isValidPassword: true,
    //   });
    // } else {
    setData({
      ...data,
      password: val,
      isValidPassword: true,
    });
    // }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (userName, password) => {
    if (
      userName.length !== 0 &&
      password.length !== 0 &&
      data.isValidUser &&
      data.isValidPassword
    ) {
      Authentication.mutateAsync();
    } else {
      Alert.alert(
        'Wrong Input!',
        'Please enter a valid Employee Id or Password.',
        [{ text: 'Okay' }],
      );
    }
  };

  useEffect(() => {
    if (route.params?.VersionCheckResponse) {
      !route.params.VersionCheckResponse.appVersionflag &&
        setModalVisible(true);
    }
  }, [route.params?.VersionCheckResponse]);

  useEffect(() => {
    if (AuthenticationData) {
      ActivateLoggingIn();
    }
  }, [AuthenticationData]);

  const handleModalClose = () => {
    BackHandler.exitApp();
  };

  const { APK_VERSION_TITLE, APK_VERSION_MESSAGE } = MODAL_CONST;

  return (
    <WaveBackground
      title="login"
      loading={[AuthenticationIsLoading]}
      backgroundColor={Colors.Primary}>
      <View style={[styles.container]}>
        {/* <StatusBar backgroundColor={Colors.Primary} barStyle="light-content" /> */}
        <Modal
          visible={modalVisible}
          onClose={handleModalClose}
          title={APK_VERSION_TITLE}
          message={APK_VERSION_MESSAGE}
          status={'failure'}
          buttonTitle={'Quit'}
          appVersion
        />
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/muthoot.png')}
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'transparent',
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <View style={{ paddingBottom: 30 }}/>

          <Text
            style={[
              styles.text_footer,
              {
                color: 'black',
              },
            ]}>
            Employee Id
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Id"
              // keyboardType="number-pad"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: 'black',
                },
              ]}
              autoCapitalize="characters"
              onChangeText={val => textInputChange(val)}
            />
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Employee Id should only contain alphanumeric characters.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: 'black',
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: 'black',
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Icon name="hide" />
              ) : (
                <Icon name="view" />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 10 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: "#666666",
                marginVertical: 30,
                alignSelf: 'center',
                fontSize: 30,
                letterSpacing: 10,
                textDecorationLine: 'line-through',

              },
            ]}>
            {randomNumberOne}
          </Text>

          <View style={styles.action}>
            <TextInput
              placeholder="Enter Captcha"
              placeholderTextColor="#666666"
              value={textInputHolder}
              style={[
                styles.textInput,
                {
                  marginTop: -30,
                  color: 'black',
                },
              ]}
              autoCapitalize='characters'
              onChangeText={(data) => setTextInputHolder(data)}
            />
            <TouchableOpacity onPress={() => { generateCaptcha() }}>
              <Icon name="refresh" />
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                validateCaptchaCode()
                // ActivateLoggingIn();
                // console.log("ggggg",navigation.navigate);
                // navigation.navigate('Dashboard')
              }}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => { navigation.navigate('ResetPassword') }}
            style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ color: Colors.Primary, }}>Reset Password?</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </WaveBackground>
  );
};
export default Login;
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  header: {
    marginTop: '2%',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  imgHeader: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    // paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    // fontWeight: 'bold',
    fontSize: 28,
    // alignSelf:'center',
    top: 20,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1A97DD',
    // fontSize: 18,
    // fontWeight: 'bold'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
