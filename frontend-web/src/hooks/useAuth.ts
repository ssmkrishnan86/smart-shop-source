import { useAppDispatch, useAppSelector } from '../store';
import { logout, setCredentials } from '../store/slices/authSlice';
import { IUser } from '../interfaces';
import { authService } from '../services/authService';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error, sessionChecked } = useAppSelector((state) => state.auth);

  const loginUser = (userData: IUser, authToken: string) => {
    dispatch(setCredentials({ user: userData, token: authToken }));
  };

  const logoutUser = async () => {
    await authService.logout().catch(() => undefined);
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    sessionChecked,
    loginUser,
    logoutUser,
  };
}
