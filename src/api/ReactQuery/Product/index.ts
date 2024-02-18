import { useMutation } from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import { getProductRequest, getProductResponse, getRelationMasterResponse, UploadProductRequest, UploadProductResponse, addProductRequest, addProductResponse, getIPMasterResponse, GetAssetresponse } from './types';
import { Product } from './api';


export const useGetIPMaster = () => {
  const mutation = useMutation<getIPMasterResponse>(
    ['Product'],
    async () => {
      const response = await Product.GetIPMaster();
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const useGetAssetMaster = () => {
  const mutation = useMutation<GetAssetresponse>(
    ['Product',],
    async () => {
      const response = await Product.GetAssetMaster();
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};
export const useGetRelationMaster = () => {
  const mutation = useMutation<getRelationMasterResponse>(
    ['Product',],
    async () => {
      const response = await Product.GetRelationMaster();
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const SaveProduct = (payload: addProductRequest) => {
  const mutation = useMutation<addProductResponse>(
    ['Product', payload],
    async () => {
      const response = await Product.SaveProduct(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const UploadProduct = (payload: UploadProductRequest) => {
  const mutation = useMutation<UploadProductResponse>(
    ['Product', payload],
    async () => {
      const response = await Product.UploadProduct(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};

export const GetProductDetails = (payload: getProductRequest) => {
  const mutation = useMutation<getProductResponse>(
    ['Product', payload],
    async () => {
      const response = await Product.GetProductDetails(payload);
      // console.log("rrrrrr",response.data);
      
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );
  const { isLoading, isError, data, error } = mutation;

  return [mutation, { isLoading, isError, data, error }] as const;
};



