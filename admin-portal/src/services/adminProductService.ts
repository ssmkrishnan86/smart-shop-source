import { apiClient } from './apiClient';
import { IApiResponse } from '../interfaces';

const API_BASE_URL = '/products';

export const getImageUrl = (url: string): string => {
  if (!url) return 'http://127.0.0.1:8000/images/products/brass_ganesha_idol.jpg';
  if (url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `http://127.0.0.1:8000${url.startsWith('/') ? '' : '/'}${url}`;
};

export const adminProductService = {
  getProducts: async (): Promise<IApiResponse<any[]>> => {
    const response = await apiClient.get(`${API_BASE_URL}/admin/approval-queue`);
    return response.data;
  },

  getChangeRequests: async (): Promise<IApiResponse<any[]>> => {
    const response = await apiClient.get(`${API_BASE_URL}/admin/change-requests`);
    return response.data;
  },

  approveChangeRequest: async (requestId: string, comments: string = 'Approved edit request'): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/admin/change-requests/${requestId}/approve`, {
      comments,
      admin_name: 'Super Admin',
    });
    return response.data;
  },

  rejectChangeRequest: async (requestId: string, reason: string): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/admin/change-requests/${requestId}/reject`, {
      reason,
      admin_name: 'Super Admin',
    });
    return response.data;
  },

  approveProduct: async (productId: string, comments: string = 'Approved by DivineAdmin'): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/admin/${productId}/approve`, {
      comments,
      admin_name: 'Super Admin',
    });
    return response.data;
  },

  rejectProduct: async (productId: string, reason: string): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/admin/${productId}/reject`, {
      reason,
      admin_name: 'Super Admin',
    });
    return response.data;
  },

  deleteProduct: async (productId: string): Promise<IApiResponse<any>> => {
    const response = await apiClient.delete(`${API_BASE_URL}/admin/${productId}`);
    return response.data;
  },

  getApprovalLogs: async (): Promise<IApiResponse<any[]>> => {
    const response = await apiClient.get(`${API_BASE_URL}/admin/approval-history`);
    return response.data;
  },

  getProductById: async (productId: string): Promise<IApiResponse<any>> => {
    const response = await apiClient.get(`${API_BASE_URL}/${productId}`);
    return response.data;
  },

  requestChanges: async (productId: string, comments: string): Promise<IApiResponse<any>> => {
    const response = await apiClient.post(`${API_BASE_URL}/admin/${productId}/request-changes`, {
      comments,
      admin_name: 'Super Admin',
    });
    return response.data;
  },
};
