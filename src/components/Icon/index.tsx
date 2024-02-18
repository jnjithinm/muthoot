import React, {FC} from 'react';
import {Image} from 'react-native';

import Logo from 'assets/images/Logo.png';
import Backbutton from 'assets/images/BackButton.png';
import PointedStar from 'assets/images/PointedStar.png';
import Checkbox from 'assets/images/Checkbox.png';
import SearchIcon from 'assets/images/SearchIcon.png';
import Upload from 'assets/images/Upload.png';
import Capture from 'assets/images/Capture.png';
import Avatar from 'assets/images/Avatar.png';
import hide from 'assets/images/hide.png';
import view from 'assets/images/view.png';
import plus from 'assets/images/plus.png';
import Profile from 'assets/images/Profile.png';
import Edit from 'assets/images/pencil.png';
import EditIcon from 'assets/images/Edit.png';
import Close from 'assets/images/Close.png';
import User from 'assets/images/User.png';
import CloseBlack from 'assets/images/CloseBlack.png';
import StatusActive from 'assets/images/StatusActive.png';
import StatusInactive from 'assets/images/StatusInactive.png';
import ExpandCompress from 'assets/images/ExpandCompress.png';
import Update from 'assets/images/Update.png';
import Minus from 'assets/images/minus.png';
import SanctionLetterImage from 'assets/images/SanctionLetterImage.png';
import Add from 'assets/images/add.png';
import Reject from 'assets/images/rejected.png';
import download from 'assets/images/download.png';
import approved from 'assets/images/approved.png';
import manual from 'assets/images/manual.png';
import Correct from 'assets/images/correct.png';
import Congrats from 'assets/images/congrats.png';
import Empty from 'assets/images/empty.png';
import TickGreen from 'assets/images/TickGreen.png';
import PDF from 'assets/images/pdf.png';
import LoanAgreement from 'assets/images/LoanAgreement.png';
import file from 'assets/images/file.png';
import refresh from 'assets/images/refresh.png';

import styles from './styles';

type IconNames =
  | 'arrow-back'
  | 'logo'
  | 'pointed-star'
  | 'checkbox'
  | 'search-icon'
  | 'avatar'
  | 'profile'
  | 'hide'
  | 'view'
  | 'plus'
  | 'capture'
  | 'upload'
  | 'edit'
  | 'close'
  | 'profile-picture'
  | 'close-black'
  | 'edit-icon'
  | 'status-active'
  | 'status-inactive'
  | 'expand-or-compress'
  | 'update'
  | 'verify'
  | 'refresh'
  | 'minus'
  | 'add'
  | 'loan-rejected'
  | 'download-file'
  | 'file'
  | 'loan-approved'
  | 'manual-underwriting'
  | 'completed'
  | 'congrats'
  | 'sanction-letter-image'
  | 'tick-green'
  | 'no-data'
  | 'download-file-center'
  | 'pdf'
  |'loan-agreement';

type IconType = {
  name: IconNames;

  size?: string;
};

const ImageSwitch = (param: IconNames) => {
  switch (param) {
    case 'arrow-back':
      return {Src: Backbutton, StyleConst: styles.backbutton};
    case 'logo':
      return {Src: Logo, StyleConst: styles.Logo};
    case 'avatar':
      return {Src: Avatar, StyleConst: styles.backbutton};
    case 'profile':
      return {Src: Profile, StyleConst: styles.profile};
    case 'pointed-star':
      return {Src: PointedStar, StyleConst: styles.pointedstar};
    case 'checkbox':
      return {Src: Checkbox, StyleConst: styles.backbutton};
    case 'search-icon':
      return {Src: SearchIcon, StyleConst: styles.backbutton};
    case 'upload':
      return {Src: Upload, StyleConst: styles.upload};
    case 'capture':
      return {Src: Capture, StyleConst: styles.upload};
    case 'checkbox':
      return {Src: Checkbox, StyleConst: styles.backbutton};
    case 'search-icon':
      return {Src: SearchIcon, StyleConst: styles.backbutton};
    case 'hide':
      return {Src: hide, StyleConst: styles.backbutton};
      case 'refresh':
      return {Src: refresh, StyleConst: styles.backbutton};
    case 'view':
      return {Src: view, StyleConst: styles.backbutton};
    case 'plus':
      return {Src: plus, StyleConst: styles.plus};
    case 'edit':
      return {Src: Edit, StyleConst: styles.edit};
    case 'plus':
      return {Src: plus, StyleConst: styles.plus};
    case 'close':
      return {Src: Close, StyleConst: styles.close};
    case 'profile-picture':
      return {Src: User, StyleConst: styles.profilepicture};
    case 'close-black':
      return {Src: CloseBlack, StyleConst: styles.closeblack};
    case 'edit-icon':
      return {Src: EditIcon, StyleConst: styles.closeblack};
    case 'status-active':
      return {Src: StatusActive, StyleConst: styles.activeorinactive};
    case 'status-inactive':
      return {Src: StatusInactive, StyleConst: styles.activeorinactive};
    case 'expand-or-compress':
      return {Src: ExpandCompress, StyleConst: styles.expand};
    case 'update':
      return {Src: Update, StyleConst: styles.update};
    case 'minus':
      return {Src: Minus, StyleConst: styles.upload};
    case 'add':
      return {Src: Add, StyleConst: styles.upload};
    case 'loan-rejected':
      return {Src: Reject, StyleConst: styles.loanRejected};
    case 'download-file':
      return {Src: download, StyleConst: styles.downloadfile,};
      case 'file':
        return {Src: file, StyleConst: styles.file};
    case 'loan-approved':
      return {Src: approved, StyleConst: styles.loanRejected};
    case 'manual-underwriting':
      return {Src: manual, StyleConst: styles.loanRejected};
    case 'completed':
      return {Src: Correct, StyleConst: styles.completed};
    case 'verify':
      return {Src: Correct, StyleConst: styles.verify};
    case 'sanction-letter-image':
      return {Src: SanctionLetterImage, StyleConst: styles.sanctionletterimage};
    case 'congrats':
      return {Src: Congrats, StyleConst: styles.congrats};
    case 'no-data':
      return {Src: Empty, StyleConst: styles.noData};
    case 'tick-green':
      return {Src: TickGreen, StyleConst: styles.tick};
    case 'download-file-center':
      return {Src: download, StyleConst: styles.downloadfilewithoutmove};
    case 'pdf':
      return {Src: PDF, StyleConst: styles.update};
    case 'loan-agreement':
      return {Src: LoanAgreement, StyleConst: styles.LoanAgreement};
    default:
      return {Src: Backbutton, StyleConst: styles.close};
  }
};

const Icon: FC<IconType> = ({name}) => {
  const {Src, StyleConst} = ImageSwitch(name);

  return <Image source={Src} style={StyleConst} />;
};
export default Icon;
