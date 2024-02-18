import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {    GetOVDDetailsRequest, GetOVDDetailsResponse, SaveOVDDetailsRequest, SaveOVDDetailsResponse,SaveManualOVDDetailsRequest, SaveManualOVDDetailsResponse,  } from './types';
import { OVD} from './api';

export const useSaveOVDDetails = (payload: SaveOVDDetailsRequest) => {
  const mutation = useMutation<SaveOVDDetailsResponse>(
    ['OVD', payload],
    async () => {
      const response = await OVD.SaveOVDDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};


export const useGetOVDDetails = (id: string) => {
  const mutation = useMutation<GetOVDDetailsResponse>(
    ['OVD', id],
    async () => {
      const response = await OVD.GetOVDDetails(id);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useSaveManualOVDDetails = (payload: SaveManualOVDDetailsRequest) => {
  const mutation = useMutation<SaveManualOVDDetailsResponse>(
    ['OVD', payload],
    async () => {
      const response = await OVD.SaveManualOVDDetails(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};


