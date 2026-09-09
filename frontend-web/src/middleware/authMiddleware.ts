import { RootState } from '../store';

export function checkIsAuthenticated(state: RootState): boolean {
  return state.auth.isAuthenticated && !!state.auth.token;
}

export function checkHasRole(state: RootState, requiredRole: string): boolean {
  return state.auth.user?.role === requiredRole;
}
