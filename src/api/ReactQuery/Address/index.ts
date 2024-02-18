import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  AddCurrentAddressRequest,
  AddCurrentAddressResponse,
  AddPermanentAddressRequest,
  AddPermanentAddressResponse,
  GetAddressDetailsRequest,
  GetAddressDetailsResponse,
  GetDedupeDetailsRequest,
  GetDedupeDetailsResponse
} from './types';
import {Address} from './api';

export const useAddPermanentAddress = (payload: AddPermanentAddressRequest) => {
  const mutation = useMutation<AddPermanentAddressResponse>(
    ['Address', payload],
    async () => {
      const response = await Address.AddPermanentAddress(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useAddCurrentAddress = (payload: AddCurrentAddressRequest) => {
  const mutation = useMutation<AddCurrentAddressResponse>(
    ['Address', payload],
    async () => {
      const response = await Address.AddCurrentAddress(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetAddressDetails = (payload: GetAddressDetailsRequest) => {
  const mutation = useMutation<GetAddressDetailsResponse>(
    ['Address', payload],
    async () => {
      const response = await Address.GetAddressDetails(payload);
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetDedupeDetails = (payload: GetDedupeDetailsRequest) => {
  const mutation = useMutation<GetDedupeDetailsResponse>(
    ['Address', payload],
    async () => {
      const response = await Address.GetDedupeDetails(payload);
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
