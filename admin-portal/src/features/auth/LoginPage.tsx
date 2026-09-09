import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { loginSuccess } from '../../store';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@smartshop.com');
  const [password, setPassword] = useState('supersecret');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      loginSuccess({
        user: {
          id: 'usr_admin_001',
          email,
          firstName: 'Super',
          lastName: 'Admin',
          role: 'SUPER_ADMIN' as any,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
          permissions: ['ALL_ACCESS'],
        },
        token: 'mock_admin_jwt_token_7788',
      })
    );
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF8F5]">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl maroon-gradient text-amber-300 flex items-center justify-center font-black text-2xl mx-auto shadow-md border border-amber-400/40">
            🪔
          </div>
          <h2 className="text-2xl font-black text-[#800020]">Sign In to DivineAdmin</h2>
          <p className="text-xs text-slate-500">Central Platform Governance & Telemetry Console</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Super Admin Email"
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
          <Button type="submit" className="w-full py-3.5">
            Sign In to Super Admin Console
          </Button>
        </form>
      </div>
    </div>
  );
};
