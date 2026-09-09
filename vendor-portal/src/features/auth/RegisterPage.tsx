import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/authService';
import { Mail, Lock, User } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      // Creates the merchant-owner account. A real store record is
      // provisioned separately once DivineAdmin verifies the application —
      // there's no vendor-onboarding workflow to fabricate a store here.
      await authService.register({ firstName, lastName, email, phone, password });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF8F5]">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl maroon-gradient text-amber-300 flex items-center justify-center font-black text-2xl mx-auto shadow-md border border-amber-400/40">
            🪔
          </div>
          <h2 className="text-xl font-black text-[#800020]">Account Created</h2>
          <p className="text-sm text-slate-600">
            Your merchant-owner account has been created. Your store listing is now pending verification by the
            SmartShop team before you can access the seller dashboard.
          </p>
          <Link to="/login" className="inline-block font-extrabold text-[#800020] hover:underline text-sm">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF8F5]">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl maroon-gradient text-amber-300 flex items-center justify-center font-black text-2xl mx-auto shadow-md border border-amber-400/40">
            🪔
          </div>
          <h2 className="text-2xl font-black text-[#800020]">Register Seller Store</h2>
          <p className="text-xs text-slate-500">Join SmartShop enterprise multi-vendor marketplace.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} leftIcon={<User className="w-4 h-4" />} required />
            <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <Input label="Business Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="w-4 h-4" />} required />
          <Input label="Mobile Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            helperText="At least 8 characters, including a letter and a number."
            required
          />
          <Button type="submit" className="w-full py-3.5" isLoading={isLoading}>
            Submit Merchant Application
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already a merchant?{' '}
          <Link to="/login" className="font-extrabold text-[#800020] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
