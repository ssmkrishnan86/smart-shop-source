/**
 * useAuthSync.ts
 * ==============
 * Cross-app SSO bootstrap — mounted once at the app root level.
 *
 * On first mount, silently attempts to redeem the shared HttpOnly refresh
 * cookie via POST /auth/refresh. If a valid *vendor* session exists, the
 * merchant is transparently signed in (and their store profile fetched)
 * without re-entering credentials.
 */

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loginSuccess, setSessionChecked } from '../store';
import { authService } from '../services/authService';
import { vendorService } from '../services/vendorService';

export function useAuthSync() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current || isAuthenticated) return;
    attempted.current = true;

    authService
      .refreshSession()
      .then(async (session) => {
        if (session) {
          const vendorStore = await vendorService.getMyStore();
          dispatch(
            loginSuccess({
              user: vendorStore
                ? { ...session.user, storeId: vendorStore.id, storeName: vendorStore.name }
                : session.user,
              store: vendorStore,
              token: session.token,
            })
          );
        }
      })
      .finally(() => {
        dispatch(setSessionChecked());
      });
  }, [dispatch, isAuthenticated]);
}
