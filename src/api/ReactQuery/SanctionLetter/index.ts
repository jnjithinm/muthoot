import {useMutation} from 'react-query';
import {SanctionLetter} from './api';
import {
  GenerateSanctionLetterResponse,
  GetSanctionLetterResponse,
  SendOTPForSanctionLetterResponse,
  VerifyOTPSanctionLetterRequest,
  VerifyOTPSanctionLetterResponse,
} from './types';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

export const useGenerateSanctionLetter = (appId: string) => {
  const mutation = useMutation<GenerateSanctionLetterResponse>(
    ['SanctionLetter', appId],
    async () => {
      const response = await SanctionLetter.GenerateSanctionLetter(appId);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useSendOTPSanctionLetter = (
  applicantId: string,
  employeeId: string,
  otpmode: 'F' | 'R',
) => {
  const mutation = useMutation<SendOTPForSanctionLetterResponse>(
    ['SanctionLetter', applicantId, employeeId, otpmode],
    async () => {
      const response = await SanctionLetter.SendOTPForSanctionLetter(
        applicantId,
        employeeId,
        otpmode,
      );
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useVerifyOTPSanctionLetter = (
  payload: VerifyOTPSanctionLetterRequest,
) => {
  const mutation = useMutation<VerifyOTPSanctionLetterResponse>(
    ['SanctionLetter', payload],
    async () => {
      const response = await SanctionLetter.VerifyOTPSanctionLetter(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetSanctionLetter = (appId: string) => {
  const mutation = useMutation<GetSanctionLetterResponse>(
    ['SanctionLetter', appId],
    async () => {
      const response = await SanctionLetter.GetSanctionLetter(appId);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
