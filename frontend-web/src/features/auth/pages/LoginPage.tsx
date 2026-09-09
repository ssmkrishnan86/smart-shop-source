import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SEO } from '../../../components/common/SEO';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { LogIn, Mail, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.login({ email, password });
      loginUser(res.data.user, res.data.token);
      showToast('Welcome back, ' + res.data.user.firstName, 'success');
      navigate('/');
    } catch (err: any) {
      showToast(err?.message || 'Invalid email or password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <SEO title="Sign In" />
      <div>
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Sign In to Your Account</h2>
        <p className="text-xs text-muted-foreground mt-1">Enter your credentials to access your enterprise dashboard.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4 text-muted-foreground" />}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4 text-muted-foreground" />}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-input text-primary focus:ring-primary" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="font-semibold text-primary hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading} leftIcon={<LogIn className="w-5 h-5" />}>
          Sign In
        </Button>
      </form>

      <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-primary hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
};
