import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  DeleteDeferralDocumentRequest,
  DeleteDocumentRequest,
  GetDeferalDocumentResponse,
  UploadDeferralDocumentRequest,
  UploadDocumentRequest,
  UploadDocumentResponse,
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

export const useDeleteDocument = (payload: DeleteDocumentRequest) => {
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

export const useUploadDeferralDocument = (payload: UploadDeferralDocumentRequest) => {
  const mutation = useMutation<UploadDocumentResponse>(
    ['Document', payload],
    async () => {
      const response = await Document.UploadDeferralDocument(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetDeferralDocuments = (appId: string) => {
  const mutation = useMutation<GetDeferalDocumentResponse>(
    ['Document', appId],
    async () => {
      const response = await Document.GetDeferralDocuments(appId);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useDeleteDeferralDocument = (payload: DeleteDeferralDocumentRequest) => {
  const mutation = useMutation<UploadDocumentResponse>(
    ['Document', payload],
    async () => {
      const response = await Document.DeleteDeferralDocument(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
