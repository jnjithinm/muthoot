import { useMutation } from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import { Wrapper } from './api';
import {
    RegisterRepaymentDetailsRequest,
    RegisterRepaymentDetailsResponse,
    ValidateVpaRequest,
    ValidateVpaResponse,
    CreateMandateVpaRequest,
    CreateMandateVpaResponse,
  } from './types';

  
export const useRegisterRepaymentDetails = (
    payload: RegisterRepaymentDetailsRequest,
  ) => {
    const mutation = useMutation<RegisterRepaymentDetailsResponse>(
      ['Wrapper', payload],
      async () => {
        const response = await Wrapper.RegisterRepaymentDetails(payload);
  
        if (response.error) {
          useShowFlashMessage('warning', response?.message ? response?.message : "Internal Servar Error");
        }
        return response.data;
      },
    );
  
    const { isLoading, isError, data, error } = mutation;
  
    return [mutation, { isLoading, isError, data, error }] as const;
  };

  
export const useValidateVpa = (
    payload: ValidateVpaRequest,
  ) => {
    const mutation = useMutation<ValidateVpaResponse>(
      ['Wrapper', payload],
      async () => {
        const response = await Wrapper.ValidateVpa(payload);        
        if (response.error) {      
          useShowFlashMessage('warning', response.message);
        }
        return response.data;
      },
    );
  
    const { isLoading, isError, data, error } = mutation;
  
    return [mutation, { isLoading, isError, data, error }] as const;
  };
  
  
  export const useCreateMandateVpa = (
    payload: CreateMandateVpaRequest,
  ) => {
    const mutation = useMutation<CreateMandateVpaResponse>(
      ['Wrapper', payload],
      async () => {
        const response = await Wrapper.CreateMandateVpa(payload);
  
        if (response.error) {
          useShowFlashMessage('warning', response.message);
        }
        return response.data;
      },
    );
  
    const { isLoading, isError, data, error } = mutation;
  
    return [mutation, { isLoading, isError, data, error }] as const;
  };
  