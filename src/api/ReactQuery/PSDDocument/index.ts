import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import {applicantType} from '..';

import {
  DeleteDocumentRequest,
  UploadDocumentRequest,
  UploadDocumentResponse,
  GetPSDResponse,
  SavePSDRequest,
  getInvoiceDetailsWithIPBranchResponse,
  getInvoiceDetailsWithIPBranchRequest,
  SavePSDResponse,
  getInsuranceCompanyResponse,
  GetSubmitToDisbursmentRequest,
  submitToDisbursmentResponse
} from './types';
import {Document} from './api';

export const useUploadDocument = (payload: UploadDocumentRequest) => {
  const mutation = useMutation<UploadDocumentResponse>(
    ['Document', payload],
    async () => {
      const response = await Document.UploadDocument(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useDeletePSDDocument = (payload: DeleteDocumentRequest) => {
  const mutation = useMutation<UploadDocumentResponse>(
    ['Document', payload],
    async () => {
      const response = await Document.DeleteDocument(payload);
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
export const useGetPSD = (applicantId: string) => {
  const mutation = useMutation<GetPSDResponse>(
    ['Document', applicantId],
    async () => {
      const response = await Document.GetPSD(applicantId);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
export const useSavePSD = (
  payload: SavePSDRequest,
) => {
  const mutation = useMutation<SavePSDResponse>(
    ['Document', payload],
    async () => {
      const response = await Document.SavePSD(payload);

      if (response.error) {
        useShowFlashMessage('warning', response.message);
      } 
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetInvoiceDetailsWithIPBranch = (
  payload: getInvoiceDetailsWithIPBranchRequest,
) => {
  const mutation = useMutation<getInvoiceDetailsWithIPBranchResponse>(
    ['Document', payload],
    async () => {
      const response = await Document.getInvoiceDetailsWithIPBranch(payload);

      if (response.error) {
        useShowFlashMessage('warning', response.message);
      } 
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetInsuranceCompanyMaster = () => {
  const mutation = useMutation<getInsuranceCompanyResponse>(
    ['Document'],
    async () => {
      const response = await Document.GetInsuranceCompanyMaster();
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetSubmitToDisbursment = (payload: GetSubmitToDisbursmentRequest) => {

  
  const mutation = useMutation<submitToDisbursmentResponse>(
    ['Document', payload],
    async () => {
      const response = await Document.GetSubmitToDisbursment(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }else{
        useShowFlashMessage('success', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};