import { useMutation } from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import {  AARequest,AAResponse } from './types';
import { AA } from './api';

export const GetAccountAggregator = (payload: AARequest) => {
  const mutation = useMutation<AAResponse>(
    ['AA', payload],
    async () => {
      const response = await AA.GetAccountAggregator(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};



