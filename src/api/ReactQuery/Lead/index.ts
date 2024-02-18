import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import {
  GetApplicantDetailsByAadharRequest,
  GetApplicantDetailsByAadharResponse,
  GetBranchesResponse,
  GetCustomerProfileResponse,
  GetLeadResponse,
  GetPincodeResponse,
  GetSanctionLetterDetailsResponse,
  SaveImageRequest,
  SaveImageResponse,
  SaveorUpdateLeadRequest,
  SaveorUpdateLeadResponse,
  ViewLeadsResponse,
  ViewProspectResponse,
  ViewStatusResponse,
  GetCustomerTypeResponse
} from './types';
import {Lead} from './api';

export const useSaveImage = (payload: SaveImageRequest) => {
  const mutation = useMutation<SaveImageResponse>(
    ['Lead', payload],
    async () => {
      const response = await Lead.SaveImage(payload);
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

export const useSaveorUpdateLead = (payload: SaveorUpdateLeadRequest) => {
  const mutation = useMutation<SaveorUpdateLeadResponse>(
    ['Lead', payload],
    async () => {
      const response = await Lead.SaveorUpdateLead(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      } else {
        useShowFlashMessage('success', 'Lead details saved successfully');
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetLead = (id: string) => {
  const mutation = useMutation<GetLeadResponse>(['Lead', id], async () => {
    const response = await Lead.GetLead(id);

    return response.data;
  });

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useViewLeads = (employeeId: string,search:string) => {
  const mutation = useMutation<ViewLeadsResponse>(['Lead', employeeId,search], async () => {
    const response = await Lead.ViewLeads(employeeId,search);
    if (response.error) {
      useShowFlashMessage('warning', response.message);
    }
    return response.data;
  });

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useViewProspects = (employeeId: string,search:string) => {
  const mutation = useMutation<ViewProspectResponse>(
    ['Lead', employeeId,search],
    async () => {
      const response = await Lead.ViewProspects(employeeId,search);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetCustomerProfile = (id: string) => {
  const mutation = useMutation<GetCustomerProfileResponse>(
    ['Lead'],
    async () => {
      const response = await Lead.GetCustomerProfile(id);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetPincode = (pincode: string) => {
  const mutation = useMutation<GetPincodeResponse>(
    ['Lead', pincode],
    async () => {
      const response = await Lead.GetPincode(pincode);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useDelete = (deleteString: string) => {
  const mutation = useMutation<GetPincodeResponse>(
    ['Lead', deleteString],
    async () => {
      const response = await Lead.Delete(deleteString);
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

export const useGetSanctionLetterDetails = (id: string) => {
  const mutation = useMutation<GetSanctionLetterDetailsResponse>(
    ['Lead', id],
    async () => {
      const response = await Lead.GetSanctionLetterDetails(id);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;
  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useViewStatus = (id: string) => {
  const mutation = useMutation<ViewStatusResponse>(['Lead'], async () => {
    const response = await Lead.ViewStatus(id);
    if (response.error) {
      useShowFlashMessage('warning', response.message);
    }
    return response.data;
  });

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetApplicantDetailsByAadhar = (
  payload: GetApplicantDetailsByAadharRequest,
) => {
  const mutation = useMutation<GetApplicantDetailsByAadharResponse>(
    ['Lead'],
    async () => {
      const response = await Lead.GetApplicantDetailsByAadhar(payload);
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetBranches = (
  employeeId:string
) => {
  const mutation = useMutation<GetBranchesResponse>(
    ['Lead'],
    async () => {
      const response = await Lead.GetBranches(employeeId);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
export const useGetCustomerType = () => {
  const mutation = useMutation<GetCustomerTypeResponse>(
    ['Lead'],
    async () => {
      const response = await Lead.GetCustomerType();
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
}