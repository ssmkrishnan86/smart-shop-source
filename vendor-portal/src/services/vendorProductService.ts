import { apiClient } from './apiClient';
import { IApiResponse } from '../interfaces';

const API_BASE_URL = '/products';

export const getImageUrl = (url: string): string => {
  if (!url) return '/images/products/brass_ganesha_idol.jpg';
  if (url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `http://127.0.0.1:8000${url.startsWith('/') ? '' : '/'}${url}`;
};

export const vendorProductService = {
  uploadImage: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post(`${API_BASE_URL}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.url) {
        return getImageUrl(response.data.url);
      }
    } catch (err) {
      console.warn('Backend image upload fallback to local ObjectURL:', err);
    }
    return URL.createObjectURL(file);
  },

  getProducts: async (): Promise<IApiResponse<any[]>> => {
    const response = await apiClient.get(`${API_BASE_URL}/vendor/my-products`);
    return response.data;
  },

  createProduct: async (productData: any): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/vendor/submit`, {
      name: productData.name,
      price: productData.price,
      category: productData.category,
      brand: productData.brand || 'DivineKart Artisan',
      stock: productData.stock || 10,
      thumbnail: productData.thumbnail || '/images/ganesha_idol.jpg',
      description: productData.description || productData.name,
      short_description: productData.short_description || productData.name,
    });
    return response.data;
  },

  submitEditRequest: async (productId: string, editData: any): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/vendor/${productId}/edit-request`, {
      name: editData.name,
      price: editData.price,
      category: editData.category,
      stock: editData.stock,
      thumbnail: editData.thumbnail,
    });
    return response.data;
  },

  deleteProduct: async (productId: string): Promise<IApiResponse<any>> => {
    const response = await apiClient.delete(`${API_BASE_URL}/vendor/${productId}`);
    return response.data;
  },

  updateStock: async (productId: string, newStock: number): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/vendor/${productId}/edit-request`, {
      stock: newStock,
    });
    return response.data;
  },
};
