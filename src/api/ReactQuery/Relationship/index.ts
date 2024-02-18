import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  GetFamilyNonFamilyDetailsRequest,
  GetFamilyNonFamilyDetailsResponse,
  GetRelationshipMasterRequest,
  GetRelationshipMasterResponse,
  SaveFamilyNonFamilyDetailsRequest,
  SaveFamilyNonFamilyDetailsResponse,
} from './types';
import {Relationship} from './api';

export const useGetRelationshipMaster = (
  payload: GetRelationshipMasterRequest,
) => {
  const mutation = useMutation<GetRelationshipMasterResponse>(
    ['Relatioship', payload],
    async () => {
      const response = await Relationship.GetRelationshipMaster(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useSaveFamilyNonFamilyDetails = (
  payload: SaveFamilyNonFamilyDetailsRequest,
) => {
  const mutation = useMutation<SaveFamilyNonFamilyDetailsResponse>(
    ['Relationship', payload],
    async () => {
      const response = await Relationship.SaveFamilyNonDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetFamilyNonFamilyDetails = (
  payload: GetFamilyNonFamilyDetailsRequest,
) => {
  const mutation = useMutation<GetFamilyNonFamilyDetailsResponse>(
    ['Relationship', payload],
    async () => {
      const response = await Relationship.GetFamilyNonFamilyDetails(payload);

      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;
  return [mutation, {isLoading, isError, data, error}] as const;
};
