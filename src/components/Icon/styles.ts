import {StyleSheet} from 'react-native';
import useFontNormalise from 'hooks/useFontNormalise';
import Colors from 'config/Colors';

const styles = StyleSheet.create({
  Logo: {
    height: useFontNormalise(200),
    width: useFontNormalise(200),
  },
  Reject: {
    height: useFontNormalise(30),
    width: useFontNormalise(30),
  },
  backbutton: {
    height: useFontNormalise(20),
    width: useFontNormalise(20),
  },
  plus: {
    height: useFontNormalise(20),
    width: useFontNormalise(20),
    tintColor: 'white',
  },
  edit: {
    height: useFontNormalise(18),
    width: useFontNormalise(18),
    tintColor: Colors.Black,
  },
  avtar: {
    height: useFontNormalise(30),
    width: useFontNormalise(30),
  },
  profile: {
    height: useFontNormalise(38),
    width: useFontNormalise(38),
  },
  pointedstar: {
    height: useFontNormalise(9),
    width: useFontNormalise(9),
    top: 4,
  },
  upload: {
    height: useFontNormalise(23),
    width: useFontNormalise(23),
  },
  close: {
    height: useFontNormalise(22),
    width: useFontNormalise(22),
    // tintColor: Colors.Primary
  },
  tick: {
    width: useFontNormalise(18),
    height: useFontNormalise(18),
  },
  profilepicture: {
    height: useFontNormalise(185),
    width: useFontNormalise(185),
  },
  closeblack: {
    height: useFontNormalise(20),
    width: useFontNormalise(20),
  },
  activeorinactive: {
    height: useFontNormalise(25),
    width: useFontNormalise(25),
    marginTop: 3,
  },
  expand: {
    height: useFontNormalise(23),
    width: useFontNormalise(23),
    alignSelf: 'flex-end',
  },
  update: {
    height: useFontNormalise(25),
    width: useFontNormalise(25),
  },
  downloadfile: {
    height: useFontNormalise(25),
    width: useFontNormalise(25),
    left: 10,
  },
  file: {
    height: useFontNormalise(22),
    width: useFontNormalise(22),
    left: 15,
    tintColor: 'white'
  },
  loanRejected: {
    height: useFontNormalise(80),
    width: useFontNormalise(80),
  },
  completed: {
    height: useFontNormalise(19),
    width: useFontNormalise(19),
    top: 5,
  },
  verify: {
    height: useFontNormalise(19),
    width: useFontNormalise(19),
    marginTop: 8,
  },
  congrats: {
    height: useFontNormalise(80),
    width: useFontNormalise(80),
  },
  noData: {
    height: useFontNormalise(60),
    width: useFontNormalise(60),
  },
  sanctionletterimage: {
    height: useFontNormalise(153.6),
    width: useFontNormalise(263.4),
    alignSelf: 'center',
  },
  downloadfilewithoutmove: {
    height: useFontNormalise(25),
    width: useFontNormalise(25),
  },
  LoanAgreement: {
    height: useFontNormalise(160),
    width: useFontNormalise(290.065),
    alignSelf: 'center',
    borderColor: Colors.Blue,
    borderWidth: 1,
    marginVertical: '3%',
    borderRadius: 20,
  },
});

export default styles;
