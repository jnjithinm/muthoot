import useShowFlashMessage from 'hooks/useShowFlashMessage';
import { useMutation } from 'react-query';

import {  PennyDrop } from './api';
import { VerifyBankAccountRequest, VerifyBankAccountResponse, GetBankAccountDetailsRequest, GetBankAccountDetailsResponse } from './types';




export const useVerifyBankAccount = (payload: VerifyBankAccountRequest) => {
  const mutation = useMutation<VerifyBankAccountResponse>(
    ['PennyDrop', payload],
    async () => {
      const response = await PennyDrop.VerifyBankAccount(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      // else{
      //   useShowFlashMessage('success', response.message);
      // }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetBankAccountDetails = (payload: GetBankAccountDetailsRequest) => {

  
  const mutation = useMutation<GetBankAccountDetailsResponse>(
    ['PennyDrop', payload],
    async () => {
      const response = await PennyDrop.GetBankAccountDetails(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }else{
      //   useShowFlashMessage('success', response.message);
      // }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};