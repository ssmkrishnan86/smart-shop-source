import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SEO } from '../../../components/common/SEO';
import { useToast } from '../../../hooks/useToast';
import { authService } from '../../../services/authService';
import { updateUserProfile } from '../../../store/slices/authSlice';
import { useAppDispatch } from '../../../store';
import { ISession } from '../../../interfaces';
import { formatDate } from '../../../utils';
import {
  User, Phone, Save, Lock, ShieldCheck, MailCheck, Smartphone,
  Monitor, LogOut, BadgeCheck, KeyRound,
} from 'lucide-react';

type Tab = 'profile' | 'account' | 'security';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [tab, setTab] = useState<Tab>('profile');

  // ─── Profile tab ────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [savingProfile, setSavingProfile] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await authService.updateProfile({ firstName, lastName, phone });
      dispatch(updateUserProfile(updated));
      showToast('Profile updated successfully!', 'success');
    } catch (err: any) {
      showToast(err?.response?.data?.detail || 'Failed to update profile', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  // ─── Account tab: email + mobile verification ──────────────────────────
  const [sendingEmailVerify, setSendingEmailVerify] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleSendEmailVerification = async () => {
    setSendingEmailVerify(true);
    try {
      const res = await authService.sendEmailVerification();
      showToast(res.message, 'success');
    } catch (err: any) {
      showToast(err?.response?.data?.detail || 'Failed to send verification email', 'error');
    } finally {
      setSendingEmailVerify(false);
    }
  };

  const handleSendOtp = async () => {
    setSendingOtp(true);
    try {
      const res = await authService.sendOtp(phone || undefined);
      setOtpSent(true);
      setDevOtp(res.devOnlyOtp ?? null);
      showToast(res.message, 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to send OTP', 'error');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyingOtp(true);
    try {
      const message = await authService.verifyOtp(otpCode);
      showToast(message, 'success');
      dispatch(updateUserProfile({ phoneVerified: true }));
      setOtpSent(false);
      setOtpCode('');
    } catch (err: any) {
      showToast(err?.message || 'Incorrect OTP', 'error');
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ─── Security tab: change password + sessions ──────────────────────────
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [sessions, setSessions] = useState<ISession[]>([]);

  useEffect(() => {
    if (tab === 'security') {
      authService.getSessions().then(setSessions).catch(() => setSessions([]));
    }
  }, [tab]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setChangingPassword(true);
    try {
      const message = await authService.changePassword(currentPassword, newPassword);
      showToast(message, 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err?.message || 'Failed to change password', 'error');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleRevokeSession = async (id: string) => {
    try {
      await authService.revokeSession(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      showToast('Session revoked', 'success');
    } catch {
      showToast('Failed to revoke session', 'error');
    }
  };

  const handleLogoutAll = async () => {
    try {
      await authService.logoutAllDevices();
      window.location.href = '/login';
    } catch {
      showToast('Failed to sign out of all devices', 'error');
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile Settings' },
    { id: 'account', label: 'Account Verification' },
    { id: 'security', label: 'Security & Password' },
  ];

  return (
    <div className="space-y-6">
      <SEO title="Account Settings - DivineKart" />
      <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#2C1E16]">Account Settings</h2>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#EAE1D0]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 font-serif text-xs font-bold uppercase tracking-wider border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? 'border-[#C59B34] text-[#7A1F1E]'
                : 'border-transparent text-[#6E584B] hover:text-[#2C1E16]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile Tab Form */}
      {tab === 'profile' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] shadow-xs space-y-6">
          <h3 className="font-serif font-bold text-lg text-[#2C1E16] uppercase tracking-wider">
            Personal Information
          </h3>
          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} leftIcon={<User className="w-4 h-4 text-[#6E584B]" />} />
              <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} leftIcon={<Phone className="w-4 h-4 text-[#6E584B]" />} />
            </div>
            <Button type="submit" variant="gold" size="lg" isLoading={savingProfile} leftIcon={<Save className="w-4 h-4" />}>
              SAVE CHANGES
            </Button>
          </form>
        </div>
      )}

      {/* Account Verification Tab */}
      {tab === 'account' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] shadow-xs space-y-3">
            <h3 className="font-serif text-base font-bold text-[#2C1E16] flex items-center gap-2 uppercase tracking-wider">
              <MailCheck className="w-5 h-5 text-[#C59B34]" /> Email Verification
            </h3>
            <p className="text-xs font-sans text-[#6E584B]">{user?.email}</p>
            {user?.emailVerified ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                <BadgeCheck className="w-4 h-4" /> Verified
              </span>
            ) : (
              <Button size="sm" variant="outline" isLoading={sendingEmailVerify} onClick={handleSendEmailVerification}>
                Send Verification Email
              </Button>
            )}
          </div>

          <div className="p-6 rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] shadow-xs space-y-3">
            <h3 className="font-serif text-base font-bold text-[#2C1E16] flex items-center gap-2 uppercase tracking-wider">
              <Smartphone className="w-5 h-5 text-[#C59B34]" /> Mobile Number Verification
            </h3>
            <p className="text-xs font-sans text-[#6E584B]">{phone || 'No phone number on file'}</p>
            {user?.phoneVerified ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                <BadgeCheck className="w-4 h-4" /> Verified
              </span>
            ) : otpSent ? (
              <form onSubmit={handleVerifyOtp} className="flex flex-wrap items-end gap-3">
                <Input label="Enter OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="max-w-[160px]" />
                <Button type="submit" size="sm" variant="gold" isLoading={verifyingOtp}>Verify OTP</Button>
                {devOtp && <span className="text-[11px] text-[#6E584B]">(Dev OTP: <span className="font-mono font-bold text-[#7A1F1E]">{devOtp}</span>)</span>}
              </form>
            ) : (
              <Button size="sm" variant="outline" isLoading={sendingOtp} onClick={handleSendOtp} leftIcon={<KeyRound className="w-4 h-4" />}>
                Send Verification OTP
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Security & Password Tab */}
      {tab === 'security' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#2C1E16] flex items-center gap-2 uppercase tracking-wider">
              <Lock className="w-5 h-5 text-[#C59B34]" /> Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" variant="maroon" size="md" isLoading={changingPassword} leftIcon={<ShieldCheck className="w-4 h-4" />}>
                UPDATE PASSWORD
              </Button>
            </form>
          </div>

          <div className="p-6 rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#2C1E16] flex items-center gap-2 uppercase tracking-wider">
                <Monitor className="w-5 h-5 text-[#C59B34]" /> Active Sessions
              </h3>
              <Button size="sm" variant="ghost" onClick={handleLogoutAll} leftIcon={<LogOut className="w-4 h-4 text-[#7A1F1E]" />}>
                Sign out everywhere
              </Button>
            </div>
            <div className="space-y-2">
              {sessions.length === 0 && <p className="text-xs text-[#6E584B]">No active sessions found.</p>}
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-xl border border-[#EAE1D0] bg-white text-xs">
                  <div>
                    <p className="font-serif font-bold text-[#2C1E16]">
                      {s.userAgent || 'Unknown device'} {s.isCurrent && <span className="text-[#7A1F1E] font-bold">(this device)</span>}
                    </p>
                    <p className="text-[#6E584B]">
                      {s.ipAddress} &bull; Signed in {s.createdAt ? formatDate(s.createdAt) : ''}
                    </p>
                  </div>
                  {!s.isCurrent && (
                    <Button size="sm" variant="ghost" onClick={() => handleRevokeSession(s.id)}>Revoke</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
