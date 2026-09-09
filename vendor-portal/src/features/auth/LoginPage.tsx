import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { loginSuccess } from '../../store';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/authService';
import { vendorService } from '../../services/vendorService';
import { Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const session = await authService.login({ email, password });
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
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF8F5]">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl maroon-gradient text-amber-300 flex items-center justify-center font-black text-2xl mx-auto shadow-md border border-amber-400/40">
            🪔
          </div>
          <h2 className="text-2xl font-black text-[#800020]">Sign In to Vendor Hub</h2>
          <p className="text-xs text-slate-500">Access seller dashboard, order queue & product listings.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Business Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />
          <Button type="submit" className="w-full py-3.5" isLoading={isLoading}>
            Sign In to Merchant Hub
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Want to sell on SmartShop?{' '}
          <Link to="/register" className="font-extrabold text-[#800020] hover:underline">
            Register Seller Store
          </Link>
        </div>
      </div>
    </div>
  );
};
