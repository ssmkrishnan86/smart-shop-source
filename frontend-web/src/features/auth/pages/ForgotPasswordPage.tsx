import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SEO } from '../../../components/common/SEO';
import { authService } from '../../../services/authService';
import { useToast } from '../../../hooks/useToast';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devToken, setDevToken] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      setSent(true);
      setDevToken(res.devOnlyResetToken ?? null);
    } catch (err: any) {
      showToast(err?.message || 'Something went wrong', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <SEO title="Forgot Password" />
      <div>
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Forgot Password</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Enter your account email and we'll send you a link to reset your password.
        </p>
      </div>

      {sent ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-primary/10 text-primary text-sm font-medium">
            If an account exists for <strong>{email}</strong>, a password reset link has been sent.
          </div>
          {devToken && (
            <div className="p-4 rounded-xl border border-dashed border-border text-xs space-y-2">
              <p className="font-bold text-muted-foreground">
                No email server is configured in this environment — here's your reset link for testing:
              </p>
              <Link
                to={`/reset-password?token=${devToken}`}
                className="block font-mono text-primary break-all hover:underline"
              >
                Reset your password &rarr;
              </Link>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-muted-foreground" />}
            required
          />
          <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading} leftIcon={<KeyRound className="w-5 h-5" />}>
            Send Reset Link
          </Button>
        </form>
      )}

      <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
        <Link to="/login" className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};
