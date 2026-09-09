import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SEO } from '../../../components/common/SEO';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.register({ firstName, lastName, email, password });
      loginUser(res.data.user, res.data.token);
      showToast('Account registered successfully!', 'success');
      navigate('/');
    } catch (err: any) {
      showToast(err?.message || 'Failed to register account', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <SEO title="Register Account" />
      <div>
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Create Customer Account</h2>
        <p className="text-xs text-muted-foreground mt-1">Join SmartShop enterprise marketplace today.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            leftIcon={<User className="w-4 h-4 text-muted-foreground" />}
            required
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          helperText="At least 8 characters, including a letter and a number."
          required
        />

        <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading} leftIcon={<UserPlus className="w-5 h-5" />}>
          Register Account
        </Button>
      </form>

      <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
