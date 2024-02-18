import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  GenerateOTPRequest,
  GenerateOTPResponse,
  ValidateOTPRequest,
  ValidateOTPResponse,
} from './types';
import {MobileOTP} from './api';

export const useValidateOTP = (payload: ValidateOTPRequest) => {
  const mutation = useMutation<ValidateOTPResponse>(
    ['MobileOTP', payload],
    async () => {
      const response = await MobileOTP.ValidateOTP(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGenerateOTP = (payload: GenerateOTPRequest) => {
  const mutation = useMutation<GenerateOTPResponse>(
    ['MobileOTP', payload],
    async () => {
      const response = await MobileOTP.GenerateOTP(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      } else {
        useShowFlashMessage('success', response.message);
      }

      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;
  return [mutation, {isLoading, isError, data, error}] as const;
};


