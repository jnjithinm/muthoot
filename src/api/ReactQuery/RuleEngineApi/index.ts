import {useMutation} from 'react-query';
import {RuleEngineApi} from './api';
import {
  GetBRE1StatusResponse,
  GetBRE2StatusResponse,
  GetBRE3StatusResponse,
  GetBRE3StatusRequest
} from './types';
import {applicantType} from '..';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

export const useGetBRE1Status = (
  applicantId: string,
  applicantType: applicantType,
) => {
  const mutation = useMutation<GetBRE1StatusResponse>(
    ['RuleEngineApi', applicantId, applicantType],
    async () => {
      const response = await RuleEngineApi.GetBRE1Status(
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

export const useGetBRE2Status = (
  applicantId: string,
  applicantType: applicantType,
) => {
  const mutation = useMutation<GetBRE2StatusResponse>(
    ['RuleEngineApi', applicantId, applicantType],
    async () => {
      const response = await RuleEngineApi.GetBRE2Status(
        applicantId,
        applicantType,
      );      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetBRE3Status = (  payload: GetBRE3StatusRequest,
  ) => {
  const mutation = useMutation<GetBRE3StatusResponse>(
    ['RuleEngineApi', payload],
    async () => {
      const response = await RuleEngineApi.GetBRE3Status(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
