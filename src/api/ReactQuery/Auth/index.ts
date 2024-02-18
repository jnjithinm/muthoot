import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  LoginRequest,
  LoginResponse,
  VersionCheckRequest,
  VersionCheckResponse,
} from './types';
import {Auth} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useVersionCheck = (payload: VersionCheckRequest) => {
  const mutation = useMutation<VersionCheckResponse>(
    ['Auth', payload],
    async () => {
      const response = await Auth.VersionCheck(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      console.log('response', response);

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useLogin = (payload: LoginRequest) => {
  const mutation = useMutation<LoginResponse>(['Auth', payload], async () => {
    const response = await Auth.Login(payload);

    if (!response.error) {
      if (response.data?.employeeId && response.afxToken) {
        // console.log("fffffffff",JSON.stringify(response.data, null,4));
        await AsyncStorage.setItem('employeeId', response.data.employeeId);
        await AsyncStorage.setItem('employeeName', response.data.employeeName);
        await AsyncStorage.setItem('roleDescription', response.data.roleDescription);
        await AsyncStorage.setItem('token', response.afxToken);
      }
      useShowFlashMessage('success', response.message);
    } else {
      useShowFlashMessage('warning', response.message);
    }
    return response.data;
  });

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
