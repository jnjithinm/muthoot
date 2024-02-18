import { useMutation } from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  SaveRepaymentDetailsRequest,
  SaveRepaymentDetailsResponse,
  GetApplicationDetailsRequest,
  GetApplicationDetailsResponse,
  GetRepaymentDetailsResponse,
  GetCamspayEnachResponse,
  GetCamspayEnachRequest,
  getCashResponse,
  saveCashRequest,
  saveCashResponse,
  GetPhysicalNachRequest,
  GetPhysicalNachResponse,
  UploadNachRequest,
  UploadNachResponse,
  deleteNachRequest,
  deleteNachResponse
} from './types';
import { Repayment } from './api';


export const useSaveRepaymentDetails = (
  payload: SaveRepaymentDetailsRequest,
) => {
  const mutation = useMutation<SaveRepaymentDetailsResponse>(
    ['Repayment', payload],
    async () => {
      const response = await Repayment.SaveRepaymentDetails(payload);

      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};
export const useSaveCashDetails = (
  payload: saveCashRequest,
) => {
  const mutation = useMutation<saveCashResponse>(
    ['Repayment', payload],
    async () => {
      const response = await Repayment.SaveCashDetails(payload);

      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetCashDetails = (
  id: string,
) => {
  const mutation = useMutation<getCashResponse>(
    ['Repayment', id],
    async () => {
      const response = await Repayment.GetCashDetails(id);

      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};


export const useGetRepaymentDetails = (
  id: string,
) => {
  const mutation = useMutation<GetRepaymentDetailsResponse>(
    ['Repayment', id],
    async () => {
      const response = await Repayment.GetRepaymentDetails(id);

      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};





export const useGetApplicationDetails = (
  payload: GetApplicationDetailsRequest,
) => {
  const mutation = useMutation<GetApplicationDetailsResponse>(
    ['Repayment', payload],
    async () => {
      const response = await Repayment.GetApplicationDetails(payload);

      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetCamspayResponse = (
  payload: GetCamspayEnachRequest,
) => {
  const mutation = useMutation<GetCamspayEnachResponse>(
    ['Repayment', payload],
    async () => {
      const response = await Repayment.GetCamspayEnachResponse(payload);

      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};
export const useGetPhysicalNach = (
  payload: GetPhysicalNachRequest,
) => {
  const mutation = useMutation<GetPhysicalNachResponse>(
    ['Repayment', payload],
    async () => {
      const response = await Repayment.GetPhysicalNach(payload);

      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const UploadProduct = (payload: UploadNachRequest) => {
  const mutation = useMutation<UploadNachResponse>(
    ['Repayment', payload],
    async () => {
      const response = await Repayment.UploadNach(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const UseDeleteEnach = (payload: deleteNachRequest) => {
  const mutation = useMutation<deleteNachResponse>(
    ['Repayment', payload],
    async () => {
      const response = await Repayment.DeleteNach(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }else {
        useShowFlashMessage('success', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};