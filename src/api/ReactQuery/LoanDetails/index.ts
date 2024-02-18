import { useMutation } from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  branchResponse,
  delarResponse,
  franchiseResponse,
  manufactureResponse,
  modelResponse,
  subDelarResponse,
  vechileTypeResponse,
  getSchemeDetailsRequest,
  getSchemeDetailsResponse,
  getAllSchemeDetailsResponse,
  getRoadtaxResponse,
  getTenureResponse,
  emiRequest,
  emiResponse,
  getDearshipDetailsResponse,
  setDearshipDetailsRequest,
  setDearshipDetailsResponse,
  setLoanDetailsRequest,
  setLoanDetailsResponse,
  getLoanDetailsResponse,
  getAllSchemeDetailsRequest,
  getInsuranceCapResponse,
   pliRequest,
    pliResponse
} from './types';
import { Vehical } from './api';

export const useVehicalType = (payload) => {
  const mutation = useMutation<vechileTypeResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetVehicalType(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetFranchise = () => {
  const mutation = useMutation<franchiseResponse>(
    ['Vehical'],
    async () => {
      const response = await Vehical.GetFranchise();
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetManufacture = () => {
  const mutation = useMutation<manufactureResponse>(
    ['Vehical'],
    async () => {
      const response = await Vehical.GetManufacturer();
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetModal = (payload) => {
  const mutation = useMutation<modelResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetModel(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetDelar = (payload) => {
  const mutation = useMutation<delarResponse>(
    ['Vehical'],
    async () => {
      const response = await Vehical.GetDelar(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetSubDelar = (payload) => {
  const mutation = useMutation<subDelarResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetSubDelar(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetBranch = (payload) => {
  const mutation = useMutation<branchResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetBranch(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetSchemeDetails = (payload: getSchemeDetailsRequest) => {
  const mutation = useMutation<getSchemeDetailsResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetSchemeDetails(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetAllSchemeDetails = (payload: getAllSchemeDetailsRequest) => {
  const mutation = useMutation<getAllSchemeDetailsResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetAllSchemeDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetRoadTax = (payload) => {
  const mutation = useMutation<getRoadtaxResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetRoadTax(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetTenure = (payload) => {
  const mutation = useMutation<getTenureResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetTenure(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetEMIValue = (payload: emiRequest) => {
  const mutation = useMutation<emiResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetEMIValue(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetPLIValue = (payload: pliRequest) => {
  const mutation = useMutation<pliResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetPLIValue(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useSetDearshipDetails = (payload: setDearshipDetailsRequest) => {
  const mutation = useMutation<setDearshipDetailsResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.SetDearshipDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetDearshipDetails = (payload) => {
  const mutation = useMutation<getDearshipDetailsResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetDearshipDetails(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useSetLoanDetails = (payload: setLoanDetailsRequest) => {
  const mutation = useMutation<setLoanDetailsResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.SetLoanDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetLoanDetails = (payload) => {
  const mutation = useMutation<getLoanDetailsResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetLoanDetails(payload);
      
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useInsuranceCap = (payload) => {
  const mutation = useMutation<getInsuranceCapResponse>(
    ['Vehical', payload],
    async () => {
      const response = await Vehical.GetInsuranceCap(payload);
      // if (response.error) {
      //   useShowFlashMessage('warning', response.message);
      // }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};