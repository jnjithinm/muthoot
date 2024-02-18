import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import {applicantType} from '..';

import {
  DeleteDocumentRequest,
  UploadDocumentRequest,
  UploadDocumentResponse,
  GetPostDocumentsDetailResponse,
  SaveVehicleCollateralInfoRequest,
  SaveVehicleCollateralInfoResponse,
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
export const useGetPreDocumentsDetail = (
  applicantId: string,
  applicantType: applicantType,
) => {
  const mutation = useMutation<GetPostDocumentsDetailResponse>(
    ['Document', applicantId, applicantType],
    async () => {
      const response = await Document.GetPostDocumentsDetail(
        applicantId,
        applicantType,
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
export const useSaveVehicleCollateralInfo = (
  payload: SaveVehicleCollateralInfoRequest,
) => {
  const mutation = useMutation<SaveVehicleCollateralInfoResponse>(
    ['VehicleCollateralInfo', payload],
    async () => {
      const response = await Document.SaveVehicleCollateralInfo(payload);

      if (response.error) {
        useShowFlashMessage('warning', response.message);
      } 
      return response.data;
    },
  );

  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};