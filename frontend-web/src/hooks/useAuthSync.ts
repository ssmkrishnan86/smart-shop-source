/**
 * useAuthSync.ts
 * ==============
 * Cross-app SSO bootstrap — mounted once at the app root level.
 *
 * On first mount, silently attempts to redeem the shared HttpOnly refresh
 * cookie (set by any DivineKart/DivineAdmin/DivineVendor login) via
 * POST /auth/refresh. If a valid session exists, the user is transparently
 * signed in without re-entering credentials — this is what makes SSO work
 * across the three localhost apps.
 */

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setCredentials, setSessionChecked } from '../store/slices/authSlice';
import { authService } from '../services/authService';

export function useAuthSync() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current || isAuthenticated) return;
    attempted.current = true;

    authService
      .refreshSession()
      .then((session) => {
        if (session) {
          dispatch(setCredentials(session));
        }
      })
      .finally(() => {
        dispatch(setSessionChecked());
      });
  }, [dispatch, isAuthenticated]);
}
