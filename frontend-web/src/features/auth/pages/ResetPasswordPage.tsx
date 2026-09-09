import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SEO } from '../../../components/common/SEO';
import { authService } from '../../../services/authService';
import { useToast } from '../../../hooks/useToast';
import { Lock, ShieldCheck } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await authService.resetPassword(token, newPassword);
      showToast('Password reset successfully. Please sign in.', 'success');
      navigate('/login');
    } catch (err: any) {
      showToast(err?.message || 'Failed to reset password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full space-y-4 text-center">
        <SEO title="Reset Password" />
        <h2 className="text-xl font-extrabold text-foreground">Invalid Reset Link</h2>
        <p className="text-xs text-muted-foreground">
          This link is missing its reset token. Please request a new one.
        </p>
        <Link to="/forgot-password" className="font-bold text-primary hover:underline text-sm">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <SEO title="Reset Password" />
      <div>
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Set a New Password</h2>
        <p className="text-xs text-muted-foreground mt-1">Choose a strong new password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4 text-muted-foreground" />}
          helperText="At least 8 characters, including a letter and a number."
          required
        />
        <Input
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4 text-muted-foreground" />}
          required
        />

        <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading} leftIcon={<ShieldCheck className="w-5 h-5" />}>
          Reset Password
        </Button>
      </form>
    </div>
  );
};
