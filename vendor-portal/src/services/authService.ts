/**
 * authService.ts
 * ==============
 * Real API client for vendor authentication, talking to the same backend
 * auth endpoints as DivineKart (/api/v1/auth). The refresh token lives in
 * an HttpOnly cookie shared across every SmartShop localhost app — logging
 * in on DivineKart and opening DivineVendor with the *same* vendor-owner
 * account will silently authenticate here too (cross-app SSO). A session
 * belonging to a non-vendor role (e.g. a CUSTOMER account) is deliberately
 * rejected by this app rather than granted vendor access.
 */

import { apiClient } from './apiClient';
import { IVendorUser } from '../interfaces';

interface BackendUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone?: string | null;
  avatar?: string | null;
  email_verified: boolean;
  phone_verified: boolean;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: BackendUser;
}

const VENDOR_ROLES = ['VENDOR_OWNER', 'SUPER_ADMIN'];

function mapUser(u: BackendUser): IVendorUser {
  return {
    id: u.id,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    role: u.role as any,
    storeId: '', // resolved separately via vendorService.getMyStore()
    storeName: '',
    avatar: u.avatar ?? undefined,
  };
}

function extractErrorMessage(err: any, fallback: string): string {
  const detail = err?.response?.data?.detail;
  // FastAPI returns `detail` as a string for business-logic errors (400/401/404),
  // but as an ARRAY of Pydantic validation-error objects for 422s (e.g. a weak
  // password) — without this branch those render as "[object Object]".
  if (Array.isArray(detail)) {
    return detail
      .map((d: any) => String(d?.msg ?? d).replace(/^Value error,\s*/, ''))
      .join(' ');
  }
  return detail || err?.message || fallback;
}

function assertVendorRole(user: BackendUser) {
  if (!VENDOR_ROLES.includes(user.role)) {
    throw new Error('This account is not a vendor account. Please sign in with a merchant account.');
  }
}

function persistSession(res: TokenResponse): { user: IVendorUser; token: string } {
  assertVendorRole(res.user);
  localStorage.setItem('vendor_auth_token', res.access_token);
  return { user: mapUser(res.user), token: res.access_token };
}

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const res = await apiClient.post<TokenResponse>('/auth/login', credentials);
      return persistSession(res.data);
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'Invalid email or password'));
    }
  },

  register: async (data: { firstName: string; lastName: string; email: string; password: string; phone?: string }) => {
    try {
      const res = await apiClient.post<TokenResponse>('/auth/register', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: 'VENDOR_OWNER',
      });
      return persistSession(res.data);
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'Failed to register account'));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('vendor_auth_token');
    }
  },

  /** Silent SSO bootstrap. Returns null (rather than throwing) if the
   * shared session belongs to a non-vendor account, so this app simply
   * stays logged out instead of erroring. */
  refreshSession: async (): Promise<{ user: IVendorUser; token: string } | null> => {
    try {
      const res = await apiClient.post<TokenResponse>('/auth/refresh');
      if (!VENDOR_ROLES.includes(res.data.user.role)) {
        return null;
      }
      localStorage.setItem('vendor_auth_token', res.data.access_token);
      return { user: mapUser(res.data.user), token: res.data.access_token };
    } catch {
      localStorage.removeItem('vendor_auth_token');
      return null;
    }
  },
};
