import React, { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from 'config/Colors';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import SelectImage from 'hooks/useSelectImage';
import Icon from 'components/Icon';
import { docTypes } from 'api/ReactQuery/Document/types';
import UploadDocument from 'config/Functions/UploadDocument';
import CaptureImage from 'config/Functions/CaptureImage';
import convertImageFileToBase64 from 'config/Functions/ConvertImageToBase64';

type LabeledUploadButtonType = {
  label: string;

  setUrl: Dispatch<SetStateAction<string>>;
  setBase64: Dispatch<SetStateAction<string>>;
  setDocType: Dispatch<SetStateAction<'pdf' | 'jpg' | null>>
  onPress: () => void;
  mandatory?: boolean;
  imageOnly?: boolean;
  disabled?: boolean;
  buttonDisable?: boolean;
};

const LabeledUploadButton: FC<LabeledUploadButtonType> = ({
  label,
  mandatory,
  setUrl,
  setBase64,
  setDocType,
  onPress,
  imageOnly,
  disabled,
  buttonDisable
}) => {
  return (
    <View style={{ marginVertical: 3,  }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 , marginVertical: 5}}>
        <Text
          style={{
            color: Colors.LabelGrey,
            fontFamily: APP_FONTS.Medium,
            fontSize: FONT_SIZE.l,
          }}>
          {label}{' '}
        </Text>
        {mandatory && <Icon name="pointed-star" />}
      </View>

      {!buttonDisable &&
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Upload,
              paddingVertical: 10,
              paddingHorizontal: 50,
              borderRadius: 10,
            }}
            disabled={disabled}
            onPress={() => {
              onPress(), UploadDocument({ setUrl, setBase64, imageOnly, setDocType });
            }}>
            <Icon name="upload" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Capture,
              paddingVertical: 10,
              paddingHorizontal: 50,
              borderRadius: 10,
              left: 20,
            }}
            disabled={disabled}
            onPress={() => {
              onPress();
              CaptureImage()
                .then(url => {
                  if (url) {
                    setUrl(url);
                    setDocType('jpg');
                    convertImageFileToBase64(url)
                      .then(base64 => base64 && setBase64(base64))
                      .catch(err => console.log(err));
                  }
                })
                .catch(err => console.log(err));
            }}>
            <Icon name="capture" />
          </TouchableOpacity>
        </View>}
    </View>
  );
};
export default LabeledUploadButton;
