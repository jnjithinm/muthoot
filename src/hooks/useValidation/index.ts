import { validationTypes } from 'components/LabeledTextInput';
import { placeholderTypes } from 'components/TextInput';

interface ValidationProps {
  FieldName: validationTypes | placeholderTypes;
  value: string;
}

const useValidation = () => {
  const validateField = ({ FieldName, value }: ValidationProps) => {

    const onlyDigits = /^\d+$/;
    const nameincludeSpacesRegex =/^[a-zA-Z]{2,}(?:\s[a-zA-Z]+)*$/
    // /^[a-zA-Z]{2,}(?:\s[a-zA-Z]+)*$/
    const lastNameincludeSpacesRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
    // /^[a-zA-Z\s]{1,}$/;
    const addressLeadRegex = /^[a-zA-Z0-9\s,/.'"-]*$/;
    const VPA_REGEX = /^[\w.-]+@[\w.-]+$/;
    const countPDC = /^[0-9][0-9]*$/;
    const mobileNumberRegex = /^[6-9]\d{9}$/;
    const PASSPORT_REGEX = /^[A-Za-z0-9]{0,20}$/
    const DLNO_REGEX = /^[a-z0-9/\s-]{0,25}$/i;
    const EPICNO_REGEX = /^[a-z0-9/]{0,20}$/i;
    const RETAIL_INVOICE_REGEX = /^[a-z0-9/\s-]{4,20}$/i;
    const EX_SHOROOM_PRICE = /^\d{1,7}$/
    const yearNumberRegex = /^[0-9][0-9]?$/;



    let errorFlag = false;
    let error = '';

    switch (FieldName) {

      case "Spouse's Name":
      case "Father's Name":
      case "Mother's Name":
      case 'Verified Status':
      case 'Account Holder Name':
      case 'Employer Name':
      case 'Bank Name':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!nameincludeSpacesRegex.test(value)) {
          errorFlag = true;
          if (value.length < 2) {
            error = `${FieldName} should have at least 2 characters`;
          } else {
            error = `${FieldName} should only include alphabets`;
          }
        } else if (value.length > 40) {
          errorFlag = true;
          error = 'A name should be a maximum of 40 characters';
        }
        break;

      case 'Name':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!nameincludeSpacesRegex.test(value)) {
          // console.log("ffff", !nameincludeSpacesRegex.test(value));

          errorFlag = true;
          if (value.length < 2) {
            error = `${FieldName} should have at least 2 characters`;
          } else {
            error = `${FieldName} should only include alphabets`;
          }
        } else if (value.length > 26) {
          errorFlag = true;
          error = 'A name should be a maximum of 26 characters';
        }
        break;

      case 'Last Name':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!lastNameincludeSpacesRegex.test(value)) {
          errorFlag = true;
          if (value.length < 1) {
            error = `${FieldName} should have at least 1 characters`;
          }
          else {
            error = `${FieldName} should only include alphabets`;
          }
        } else if (value.length > 26) {
          errorFlag = true;
          error = 'A name should be a maximum of 26 characters';
        }
        console.log("validation", value, !lastNameincludeSpacesRegex.test(value));
        break;

      case 'Middle Name':
        if (value === '') {
          errorFlag = false;
          // error = `${FieldName} is required`;
        } else if (!nameincludeSpacesRegex.test(value)) {
          errorFlag = true;
          if (value.length < 2) {
            error = `${FieldName} should have at least 2 characters`;
          } else {
            error = `${FieldName} should only include alphabets`;
          }
        } else if (value.length > 26) {
          errorFlag = true;
          error = 'A name should be a maximum of 26 characters';
        }
        break;

      case 'Aadhaar Name':
        const NameRegex = /^[a-zA-Z][a-zA-Z ]*$/;
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!nameincludeSpacesRegex.test(value)) {
          errorFlag = true;
          if (!nameincludeSpacesRegex.test(value)) {
            error = `${FieldName} should only contain alphabets and spaces`;
          } else {
            error = `Please enter a valid Name`;
          }
        }
        break;

      case 'Aadhaar Number':
        const AadharNoRegex = /^[0-9]{12}$/;

        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!AadharNoRegex.test(value)) {
          errorFlag = true;
          if (value.length < 12) {
            error = `${FieldName} should have 12 digits`;
          } else if (value === '000000000000') {
            error = `${FieldName} should not consist of 12 zeros`;
          } else {
            error = `${FieldName} should only include numbers`;
          }
        }
        break;

      case 'Year':
        if (value === '') {
          errorFlag = true;
          error = 'Year is required';
        } else if (!yearNumberRegex.test(value)) {
          errorFlag = true;
          if (!onlyDigits.test(value)) {
            error = 'Only digit values are allowed for a Year., eg:10';
          } else {
            error = 'Invalid year., eg:10';
          }
        }

        break;

        case 'Year ':
          if (value === '') {
            errorFlag = false;
            error = 'Year is required';
          } else if (!yearNumberRegex.test(value)) {
            errorFlag = true;
            if (!onlyDigits.test(value)) {
              error = 'Only digit values are allowed for a Year., eg:10';
            } else {
              error = 'Invalid year., eg:10';
            }
          }
  
          break;
        
      case 'E-mail ID':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value === '') {
          errorFlag = false;
          error = '';
        } else if (!emailRegex.test(value)) {
          errorFlag = true;
          if (!value.includes('@')) {
            error = 'Email ID should contain the @ symbol';
          } else if (value.startsWith('@')) {
            error = 'Email ID should not start with the @ symbol';
          } else if (value.endsWith('@')) {
            error = 'Email ID should not end with the @ symbol';
          } else if (value.indexOf('@') !== value.lastIndexOf('@')) {
            error = 'Email ID should contain only one @ symbol';
          } else if (value.includes(' ')) {
            error = 'Email ID should not contain spaces';
          } else {
            error = 'Please enter a valid email ID';
          }
        }
        break;

      case 'Job Stability (In Month)':
        if (value === '') {
          errorFlag = false;
          // error = 'Job Stability is required';
        } else if (!onlyDigits.test(value)) {
          errorFlag = true;
          if (!onlyDigits.test(value)) {
            error = 'Only digit values are allowed ';
          } else {
            error = 'Invalid Job Stability';
          }
        } else if (value === '0') {
          errorFlag = true;
          error = 'Job Stability cannot be zero ';
        } else if (Number(value) > 500) {
          error = 'Job stability should not be greater than 500';
          errorFlag = true;
        }

        break;

      case 'Mobile Number':
      case 'Phone Number':
        if (value === '') {
          errorFlag = true;
          error = 'Mobile number is required';
        } else if (!mobileNumberRegex.test(value)) {
          errorFlag = true;
          if (!onlyDigits.test(value)) {
            error = 'Only digit values are allowed for a Mobile Number.';
          } else if (
            !value.startsWith('6') &&
            !value.startsWith('7') &&
            !value.startsWith('8') &&
            !value.startsWith('9')
          ) {
            error = `A Mobile Number(+91) should starts with a digit between 6 and 9.`;
          } else if (value.length !== 10) {
            error = 'A Mobile Number(+91) should contain 10 digits.';
          } else {
            error = 'Invalid Mobile Number';
          }
        }
        break;

      case 'Alternate Contact':
        if (value === '') {
          errorFlag = false;
          // error = 'Mobile number is required';
        } else if (!mobileNumberRegex.test(value)) {
          errorFlag = true;
          if (!onlyDigits.test(value)) {
            error = 'Only digit values are allowed for a Mobile Number.';
          } else if (
            !value.startsWith('6') &&
            !value.startsWith('7') &&
            !value.startsWith('8') &&
            !value.startsWith('9')
          ) {
            error = `A Mobile Number(+91) should starts with a digit between 6 and 9.`;
          } else if (value.length !== 10) {
            error = 'A Mobile Number(+91) should contain 10 digits.';
          } else {
            error = 'Invalid Mobile Number';
          }
        }
        break;


      case 'Address line 1':
      case 'Address line 2':
      case 'Address':

        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (value.length < 3) {
          errorFlag = true;
          error = 'Address should be a minumum of 3 characters long';
        } else if (value.length > 40) {
          errorFlag = true;
          error = 'Address should be a maximum of 40 characters long';
        } else if (!addressLeadRegex.test(value)) {
          errorFlag = true;
          error =
            'Address should only include letters, numbers, spaces, commas, periods, apostrophes, hyphens, quatation mark and slashes';
        }
        break;

      case 'Landmark':
        if (value === '') {
          errorFlag = true;
          error = 'Landmark is required';
        } else if (value.length < 3 || value.length > 40) {
          errorFlag = true;
          error =
            'Landmark should be at least 3 characters long and smaller than 40 character';
        } else if (!addressLeadRegex.test(value)) {
          errorFlag = true;
          error =
            'Landmark should only include letters, numbers, spaces, commas, periods, apostrophes, hyphens, quatation mark and slashes';
        }
        break;

      case 'PAN Number':
        const panRegex = /^[A-Z]{3}P[A-Z]{1}[0-9]{4}[A-Z]{1}$/;
        if (value === '') {
          errorFlag = true;
          error = 'PAN number is required';
        } else if (!panRegex.test(value)) {
          errorFlag = true;
          if (!/^[A-Z]{3}P[A-Z]{1}/.test(value)) {
            error =
              'First five characters should be alphabets, with the fourth character as "P" for an individual PAN number';
          } else if (!/[0-9]{4}/.test(value)) {
            error = 'Sixth to ninth characters should be digits';
          } else if (!/[A-Z]{1}$/.test(value)) {
            error = 'Last character should be an alphabet';
          } else {
            error =
              'Please enter a valid PAN number, it should be in format eg: ABCPD1234F';
          }
        }
        break;

      case 'Pincode':
        const pinCodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
        if (value === '') {
          errorFlag = true;
          error = 'Pin code is required';
        } else if (!pinCodeRegex.test(value)) {
          errorFlag = true;
          if (onlyDigits.test(value)) {
            if (value.length < 6) {
              error = 'Pincode should be 6 digits long';
            } else if (value.startsWith('0')) {
              error = 'Pincode should not start with 0';
            } else {
              error = 'Please enter a valid Indian pincode';
            }
          } else {
            error = 'Only digits are allowed in pincode';
          }
        }
        break;

      case 'Income (Monthly)':
        if (value === '') {
          errorFlag = false;
          // error = 'Monthly Income is required';
        } else 
        if (value === '0') {
          errorFlag = true;
          error = "Monthly Income can't be 0";
        } else if (isNaN(Number(value))) {
          errorFlag = true;
          error = 'Monthly Income must be a number';
        } else if (Number(value) < 10000) {
          errorFlag = true;
          error = 'Monthly Income should be atleast 10000';
        }
        break;

      case 'Employee Code':
        if (value === '') {
          errorFlag = true;
          error = 'Please enter the Employee Code';
        } else if (!/^[A-Za-z0-9]{4,20}$/.test(value)) {
          if (/[^A-Za-z0-9]/.test(value)) {
            errorFlag = true;
            error =
              'Employee Code should only contain alphanumeric characters. Special characters are not allowed.';
          } else if (value.length < 4) {
            errorFlag = true;
            error = 'Employee Code should be at least 4 characters long.';
          } else if (value.length > 20) {
            errorFlag = true;
            error = 'Employee Code should not exceed 20 characters in length.';
          } else {
            errorFlag = true;
            error =
              'Employee Code should only contain alphanumeric characters.';
          }
        }
        break;

      case 'Remark':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!nameincludeSpacesRegex.test(value)) {
          errorFlag = true;
          if (value.length < 2) {
            error = `${FieldName} should have at least 2 characters`;
          } else {
            error = `${FieldName} should only include alphabets`;
          }
        }
        break;

      case 'Account Number':
        if (value === '') {
          errorFlag = true;
          error = 'Account Number is required';
        } else if (/[^0-9]/.test(value)) {
          errorFlag = true;
          error = 'Account Number should only contain numbers';
        } else if (value.length < 9) {
          errorFlag = true;
          error = 'Account Number should be 9-16 digits';
        }
        break;

      case 'IFSC Code':
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (value === '') {
          errorFlag = true;
          error = 'IFSC Code is required';
        } else if (!ifscRegex.test(value)) {
          errorFlag = true;
          if (value.length < 11) {
            error = 'IFSC code should be exactly 11 characters long';
          } else if (/[^A-Za-z0-9]/.test(value)) {
            error = 'IFSC code should only contain letters and numbers';
          } else if (!/^[A-Z]{4}/.test(value)) {
            error = 'First four characters should be capital alphabets';
          } else if (value[4] !== '0') {
            error = 'Fifth character should be 0 for IFSC code';
          } else {
            error = 'The IFSC code you entered is not valid';
          }
        }
        break;
      case 'UPI ID':
        if (value === '') {
          errorFlag = true;
          error = 'UPI ID is required';
        } else if (!VPA_REGEX.test(value)) {
          errorFlag = true;
          error = 'The UPI ID you entered is not valid';
        }
        break;

      case 'Instrument No 1':
      case 'Instrument No 2':
      case 'Instrument No 3':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!countPDC.test(value)) {
          errorFlag = true;
          error = `${FieldName} should only include numbers`;
        }
        break;

      case 'Ex-Showroom Price':
      case 'Road Tax':
      case 'Insurance Amount':
      case 'Registration Charge':
      case 'Accessories':
      case 'On Road Price':
      case 'Margin':
      case 'Loan Amount Requested':
      case 'Tenure':
      case 'ROI':
      case 'Add On Charges':
      case 'LTV':
      case 'LTV (%)':
      case 'Charges':
      case 'No of Advance EMI':
      case 'EMI Amount':
      case 'Min and Max Tenure':
      case 'Margin Based on Scheme':
      case 'Sum Insured':
      case ' Premium Amount':
      case 'IP Paid at Dealer':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        }
        else if (value < '0') {
          errorFlag = true;
          error = `${FieldName} can't be negative`;
        }
        else if (isNaN(Number(value))) {
          errorFlag = true;
          error = `${FieldName} must be a number`;
        } else if (value.indexOf('.') > -1) {
          errorFlag = true;
          error = `${FieldName} cannot be a decimal value`;
        }
        break;

      // case 'Chassis Number':
      //   if (value === '') {
      //     errorFlag = true;
      //     error = 'Chassis Number is required';
      //   } else if (/[^A-Za-z0-9]/.test(value)) {
      //     errorFlag = true;
      //     error = 'Chassis Number should only contain letters and numbers.';
      //   } else if (value.length >25) {
      //     errorFlag = true;
      //     error = 'Chassis Number should be exactly 17 characters long.';
      //   }
      //   break;

      case 'Vehicle Registration Number':
        if (value === '') {
          errorFlag = true;
          error = 'Vehicle Registration Number is required';
        } else if (/[^A-Z0-9\s]/.test(value)) {
          errorFlag = true;
          error =
            'Vehicle Registration Number should only contain letters and numbers separated by spaces.';
        } else if (!/^([A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{4})$/.test(value)) {
          errorFlag = true;
          error =
            'Vehicle Registration Number should be in the format: two letters, two numbers, two letters, four numbers, separated by spaces, e.g. AB 12 CD 1234';
        }
        break;




      case 'Dl Number':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!DLNO_REGEX.test(value)) {
          errorFlag = true;
          error = `Invalid ${FieldName} `;
        }
        break;



      case 'Epic Number':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!EPICNO_REGEX.test(value)) {
          errorFlag = true;
          error = `Invalid ${FieldName} `;
        }
        break;

      case 'File Number':
        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!PASSPORT_REGEX.test(value)) {
          errorFlag = true;
          error = `Invalid ${FieldName} `;
        }
        break;

      case 'Retail Invoice Number':
      case 'Performa Invoice Number':
      case 'Insurance Policy Number':

        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!RETAIL_INVOICE_REGEX.test(value)) {
          // if (/[^A-Za-z0-9]/.test(value)) {
          //   errorFlag = true;
          //   error = `${FieldName} should only contain alphanumeric characters. Special characters are not allowed.`;
          // } else 
          if (value.length < 4) {
            errorFlag = true;
            error = `${FieldName} should be at least 4 characters long.`;
          } else if (value.length > 20) {
            errorFlag = true;
            error = `${FieldName} should not exceed 20 characters in length.`;
          } else {
            errorFlag = true;
            error =
              `${FieldName} should only contain alphanumeric characters.`;
          }
        }
        break;

      case 'Engine Number':
      case 'Chassis Number':

        if (value === '') {
          errorFlag = true;
          error = 'Please enter the Engine Number';
        }
        else if (!/^[A-Za-z0-9]{4,25}$/.test(value)) {
          if (/[^A-Za-z0-9]/.test(value)) {
            errorFlag = true;
            error =
              `${FieldName} should only contain alphanumeric characters. Special characters are not allowed.`;
          } else if (value.length < 4) {
            errorFlag = true;
            error = `${FieldName} should be at least 4 characters long.`;
          } else if (value.length > 25) {
            errorFlag = true;
            error = `${FieldName} should not exceed 25 characters in length.`;
          } else {
            errorFlag = true;
            error =
              `${FieldName} should only contain alphanumeric characters.`;
          }
        }
        break;

      case 'Ex-Showroom Price as Per Invoice':
        console.log("FIII");

        if (value === '') {
          errorFlag = true;
          error = `${FieldName} is required`;
        } else if (!EX_SHOROOM_PRICE.test(value)) {
          errorFlag = true;
          error = `Invalid ${FieldName} `;
        }
        break;

      case 'Document Number':
      case 'Passport Number':
        break;

      default:
        break;
    }
    return {
      errorFlag,
      error,
    };
  };

  return { validateField };
};

export default useValidation;
