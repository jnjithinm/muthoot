import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {  GetAadharDetailsRequest, VerifyPanRequest, VerifyPanResponse, GetAadharDetailsRespose, GetAadharBackOCRRequest, GetPANDetailsRequest, GetPANDetailsResponse, GetPANOCRRequest, GetPANOCRResponse, SaveAadharDetailsRequest, SaveAadharDetailsResponse, SavePANDetailsRequest, SavePANDetailsResponse, GetAadharFrontOCRRequest, GetAadharFrontOCRResponse, GetAadharBackOCRResponse } from './types';
import { OCR} from './api';

export const useGetPANOCR = (payload: GetPANOCRRequest) => {
  const mutation = useMutation<GetPANOCRResponse>(
    ['OCR', payload],
    async () => {
      const response = await OCR.GetPANOCR(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};


export const useGetAadharFrontOCR = (payload: GetAadharFrontOCRRequest ) => {
  const mutation = useMutation<GetAadharFrontOCRResponse>(
    ['OCR', payload],
    async () => {
      const response = await OCR.GetAadharFrontOCR(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetAadharBackOCR = (payload: GetAadharBackOCRRequest) => {
  const mutation = useMutation<GetAadharBackOCRResponse>(
    ['OCR', payload],
    async () => {
      const response = await OCR.GetAadharBackOCR(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useSavePANDetails = (payload: SavePANDetailsRequest) => {
  const mutation = useMutation<SavePANDetailsResponse>(
    ['OCR', payload],
    async () => {
      const response = await OCR.SavePANDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};


export const useSaveAadharDetails = (payload: SaveAadharDetailsRequest) => {
  const mutation = useMutation<SaveAadharDetailsResponse>(
    ['OCR', payload],
    async () => {
      const response = await OCR.SaveAadharDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};


export const useGetAadharDetails = (payload: GetAadharDetailsRequest) => {
  const mutation = useMutation<GetAadharDetailsRespose>(
    ['OCR', payload],
    async () => {
      const response = await OCR.GetAadharDetails(payload);

      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetPANDetails = (payload: GetPANDetailsRequest) => {
  const mutation = useMutation<GetPANDetailsResponse>(
    ['OCR', payload],
    async () => {
      const response = await OCR.GetPANDetails(payload);
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useVerifyPan = (payload: VerifyPanRequest) => {
  const mutation = useMutation<VerifyPanResponse>(
    ['OCR', payload],
    async () => {
      const response = await OCR.VerifyPan(payload);
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};


