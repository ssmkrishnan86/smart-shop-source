/**
 * authService.ts
 * ==============
 * Real API client for authentication and account/session management,
 * talking to the FastAPI backend at /api/v1/auth. The refresh token lives
 * in an HttpOnly cookie shared across every DivineKart/DivineAdmin/
 * DivineVendor localhost port — that's what powers cross-app SSO.
 */

import { apiClient } from './apiClient';
import { IUser, ISession } from '../interfaces';
import { UserRole } from '../enums';

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
  created_at?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: BackendUser;
}

function mapUser(u: BackendUser): IUser {
  return {
    id: u.id,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    role: u.role as UserRole,
    phone: u.phone ?? undefined,
    avatar: u.avatar ?? undefined,
    emailVerified: u.email_verified,
    phoneVerified: u.phone_verified,
    addresses: [],
    createdAt: u.created_at ?? new Date().toISOString(),
  };
}

function persistSession(res: TokenResponse): { user: IUser; token: string } {
  localStorage.setItem('auth_token', res.access_token);
  return { user: mapUser(res.user), token: res.access_token };
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

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const res = await apiClient.post<TokenResponse>('/auth/login', credentials);
      return { success: true, message: 'Login successful', data: persistSession(res.data) };
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
      });
      return { success: true, message: 'Account created successfully', data: persistSession(res.data) };
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'Failed to register account'));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
    }
  },

  logoutAllDevices: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout-all');
    } finally {
      localStorage.removeItem('auth_token');
    }
  },

  /** Silent SSO bootstrap — redeems the shared refresh cookie on app load. */
  refreshSession: async (): Promise<{ user: IUser; token: string } | null> => {
    try {
      const res = await apiClient.post<TokenResponse>('/auth/refresh');
      return persistSession(res.data);
    } catch {
      localStorage.removeItem('auth_token');
      return null;
    }
  },

  getMe: async (): Promise<IUser> => {
    const res = await apiClient.get<BackendUser>('/auth/me');
    return mapUser(res.data);
  },

  updateProfile: async (data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }): Promise<IUser> => {
    const res = await apiClient.put<BackendUser>('/auth/me', {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      avatar: data.avatar,
    });
    return mapUser(res.data);
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<string> => {
    try {
      const res = await apiClient.post<{ message: string }>('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      return res.data.message;
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'Failed to change password'));
    }
  },

  forgotPassword: async (email: string): Promise<{ message: string; devOnlyResetToken?: string }> => {
    const res = await apiClient.post('/auth/forgot-password', { email });
    return { message: res.data.message, devOnlyResetToken: res.data.dev_only_reset_token };
  },

  resetPassword: async (token: string, newPassword: string): Promise<string> => {
    try {
      const res = await apiClient.post<{ message: string }>('/auth/reset-password', { token, new_password: newPassword });
      return res.data.message;
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'This reset link is invalid or has expired'));
    }
  },

  sendEmailVerification: async (): Promise<{ message: string; devOnlyToken?: string }> => {
    const res = await apiClient.post('/auth/verify-email/send');
    return { message: res.data.message, devOnlyToken: res.data.dev_only_verification_token };
  },

  verifyEmail: async (token: string): Promise<string> => {
    try {
      const res = await apiClient.post<{ message: string }>('/auth/verify-email', { token });
      return res.data.message;
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'This verification link is invalid or has expired'));
    }
  },

  sendOtp: async (phone?: string): Promise<{ message: string; devOnlyOtp?: string }> => {
    try {
      const res = await apiClient.post('/auth/verify-otp/send', { phone });
      return { message: res.data.message, devOnlyOtp: res.data.dev_only_otp_code };
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'Failed to send OTP'));
    }
  },

  verifyOtp: async (code: string): Promise<string> => {
    try {
      const res = await apiClient.post<{ message: string }>('/auth/verify-otp', { code });
      return res.data.message;
    } catch (err: any) {
      throw new Error(extractErrorMessage(err, 'Incorrect OTP code'));
    }
  },

  getSessions: async (): Promise<ISession[]> => {
    const res = await apiClient.get<
      { id: string; user_agent?: string; ip_address?: string; created_at?: string; expires_at?: string; is_current: boolean }[]
    >('/auth/sessions');
    return res.data.map((s) => ({
      id: s.id,
      userAgent: s.user_agent,
      ipAddress: s.ip_address,
      createdAt: s.created_at,
      expiresAt: s.expires_at,
      isCurrent: s.is_current,
    }));
  },

  revokeSession: async (sessionId: string): Promise<void> => {
    await apiClient.delete(`/auth/sessions/${sessionId}`);
  },
};
