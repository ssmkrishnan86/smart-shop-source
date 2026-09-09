import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware = (_api: MiddlewareAPI) => (next) => (action: any) => {
  if (isRejectedWithValue(action)) {
    console.warn('RTK Query Action Rejected:', action.error);
  }
  return next(action);
};
