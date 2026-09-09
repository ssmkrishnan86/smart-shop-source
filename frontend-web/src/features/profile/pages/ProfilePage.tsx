import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../store';
import { updateUserProfile } from '../../../store/slices/authSlice';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SEO } from '../../../components/common/SEO';
import { useToast } from '../../../hooks/useToast';
import { authService } from '../../../services/authService';
import { 
  User, 
  Mail, 
  Phone, 
  Save, 
  BadgeCheck, 
  ShieldAlert, 
  Settings as SettingsIcon,
  Camera,
  Upload,
  X,
  Sparkles,
  Check,
  RotateCcw
} from 'lucide-react';

const AVATAR_PRESETS = [
  { id: 'pres_1', label: 'Brass Ganesha', url: '/images/products/brass_ganesha_idol.jpg' },
  { id: 'pres_2', label: 'Sacred Temple', url: '/images/temple_bg.jpg' },
  { id: 'pres_3', label: '5-Mukhi Rudraksha', url: '/images/products/5_mukhi_rudraksha_mala.jpg' },
  { id: 'pres_4', label: 'Bhagavad Gita', url: '/images/products/bhagavad_gita_book.jpg' },
  { id: 'pres_5', label: 'Sambrani Dhoop', url: '/images/products/sambrani_dhoop_cups.jpg' },
  { id: 'pres_6', label: 'Ashwagandha', url: '/images/products/ashwagandha_rasayana.jpg' },
  { id: 'pres_7', label: 'Classic Portrait 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'pres_8', label: 'Classic Portrait 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { id: 'pres_9', label: 'Classic Portrait 3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
];

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || AVATAR_PRESETS[6].url);
  const [isSaving, setIsSaving] = useState(false);

  // Avatar Modal States
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATAR_PRESETS[6].url);
  const [customUrl, setCustomUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  useEffect(() => {
    authService
      .getMe()
      .then((freshUser) => {
        dispatch(updateUserProfile(freshUser));
        setFirstName(freshUser.firstName);
        setLastName(freshUser.lastName);
        setPhone(freshUser.phone || '');
        if (freshUser.avatar) {
          setCurrentAvatar(freshUser.avatar);
          setSelectedAvatar(freshUser.avatar);
        }
      })
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await authService.updateProfile({ 
        firstName, 
        lastName, 
        phone, 
        avatar: currentAvatar 
      });
      dispatch(updateUserProfile(updated));
      showToast('Profile information updated successfully!', 'success');
    } catch (err: any) {
      showToast(err?.response?.data?.detail || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image size should be less than 10MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            setSelectedAvatar(compressed);
            showToast('Image loaded and optimized! Click save to apply.', 'success');
          } else {
            setSelectedAvatar(reader.result as string);
          }
        };
        img.onerror = () => {
          setSelectedAvatar(reader.result as string);
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyAvatar = async (urlToSave: string) => {
    setIsUpdatingAvatar(true);
    try {
      const updated = await authService.updateProfile({
        firstName,
        lastName,
        phone,
        avatar: urlToSave,
      });
      dispatch(updateUserProfile(updated));
      setCurrentAvatar(urlToSave);
      setSelectedAvatar(urlToSave);
      setIsAvatarModalOpen(false);
      showToast('Profile picture updated successfully!', 'success');
    } catch (err: any) {
      showToast(err?.response?.data?.detail || 'Failed to update profile picture', 'error');
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  const handleResetAvatar = () => {
    const defaultUrl = AVATAR_PRESETS[6].url;
    handleApplyAvatar(defaultUrl);
  };

  return (
    <div className="space-y-6">
      <SEO title="My Profile - DivineKart" />
      <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#2C1E16]">My Profile</h2>

      <div className="p-6 sm:p-8 rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] shadow-xs space-y-6">
        {/* Header Profile Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-[#EAE1D0]">
          <div className="flex items-center gap-5">
            {/* Avatar with Interactive Edit Button */}
            <div className="relative group">
              <img
                src={currentAvatar || AVATAR_PRESETS[6].url}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#C59B34] shadow-md transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = AVATAR_PRESETS[6].url;
                }}
              />
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#800020] text-amber-100 border-2 border-white flex items-center justify-center shadow-lg hover:bg-[#600018] hover:scale-110 transition-all cursor-pointer"
                title="Change Profile Picture"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl text-[#2C1E16]">{user?.firstName} {user?.lastName}</h3>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="text-[11px] font-bold text-[#800020] hover:underline flex items-center gap-1 bg-amber-100/70 px-2 py-0.5 rounded-md"
                >
                  <Sparkles className="w-3 h-3 text-[#C59B34]" /> Change Photo
                </button>
              </div>
              <p className="text-xs font-sans text-[#6E584B] mt-0.5">{user?.email}</p>
              <span className="inline-block mt-2 text-[10px] font-serif font-extrabold uppercase tracking-widest bg-[#FAF2E4] border border-[#C59B34]/40 text-[#7A1F1E] px-3 py-1 rounded-full">
                {user?.role || 'CUSTOMER'} ACCOUNT
              </span>
            </div>
          </div>

          <Link to="/account/settings" className="text-xs font-serif font-bold text-[#7A1F1E] hover:text-[#C59B34] hover:underline inline-flex items-center gap-1.5 uppercase tracking-wider">
            <SettingsIcon className="w-4 h-4 text-[#C59B34]" /> Account &amp; Security Settings
          </Link>
        </div>

        {/* Verification Status Badges */}
        <div className="flex flex-wrap gap-3 text-xs">
          <span className={`inline-flex items-center gap-1.5 font-bold px-3 py-1 rounded-full ${user?.emailVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
            {user?.emailVerified ? <BadgeCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            Email {user?.emailVerified ? 'Verified' : 'Not Verified'}
          </span>
          <span className={`inline-flex items-center gap-1.5 font-bold px-3 py-1 rounded-full ${user?.phoneVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
            {user?.phoneVerified ? <BadgeCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            Mobile {user?.phoneVerified ? 'Verified' : 'Not Verified'}
          </span>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSave} className="space-y-5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} leftIcon={<User className="w-4 h-4 text-[#6E584B]" />} />
            <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Input label="Email Address" value={user?.email || ''} disabled leftIcon={<Mail className="w-4 h-4 text-[#6E584B]" />} />
            <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} leftIcon={<Phone className="w-4 h-4 text-[#6E584B]" />} />
          </div>

          <Button type="submit" variant="gold" size="lg" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            SAVE CHANGES
          </Button>
        </form>
      </div>

      {/* Profile Picture Update Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-amber-300/80 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#800020] flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#C59B34]" /> Update Profile Picture
                </h3>
                <p className="text-xs text-slate-500">Choose from sacred presets, upload a photo, or paste an image URL.</p>
              </div>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Selected Avatar Preview */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200">
              <img
                src={selectedAvatar}
                alt="Selected Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#C59B34] shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = AVATAR_PRESETS[6].url;
                }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">Live Preview</span>
                <p className="text-xs text-slate-600 truncate font-mono">{selectedAvatar.slice(0, 45)}...</p>
              </div>
              <button
                type="button"
                onClick={handleResetAvatar}
                className="text-xs font-bold text-slate-600 hover:text-[#800020] flex items-center gap-1 underline"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Selector Tabs */}
            <div className="flex border-b border-amber-100 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`py-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'presets'
                    ? 'border-[#800020] text-[#800020]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Sacred &amp; Classic Presets
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'upload'
                    ? 'border-[#800020] text-[#800020]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`py-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'url'
                    ? 'border-[#800020] text-[#800020]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Image URL
              </button>
            </div>

            {/* Tab 1: Presets Grid */}
            {activeTab === 'presets' && (
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto p-1">
                {AVATAR_PRESETS.map((preset) => {
                  const isSelected = selectedAvatar === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedAvatar(preset.url)}
                      className={`relative flex flex-col items-center p-2 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#800020] bg-amber-100/50 shadow-xs ring-2 ring-[#800020]/20'
                          : 'border-amber-100 bg-white hover:border-amber-300'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-14 h-14 rounded-full object-cover border border-amber-200"
                      />
                      <span className="text-[11px] font-bold text-slate-800 mt-1 text-center truncate w-full">
                        {preset.label}
                      </span>
                      {isSelected && (
                        <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#800020] text-amber-100 flex items-center justify-center text-xs">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Upload File */}
            {activeTab === 'upload' && (
              <div className="space-y-4 py-4 text-center">
                <div className="border-2 border-dashed border-amber-300 rounded-2xl p-8 bg-amber-50/40 hover:bg-amber-50 transition-colors">
                  <Upload className="w-10 h-10 text-[#800020] mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">Click to select an image from your computer</p>
                  <p className="text-[11px] text-slate-500 mt-1">Supports PNG, JPG, WEBP (Max 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-4 block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#800020] file:text-amber-100 hover:file:bg-[#600018] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Custom URL */}
            {activeTab === 'url' && (
              <div className="space-y-4 py-2">
                <Input
                  label="Image Address URL"
                  placeholder="https://example.com/avatar.jpg"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setSelectedAvatar(e.target.value);
                  }}
                />
                <p className="text-xs text-slate-500">Paste any public direct link to an image file.</p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-amber-100 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsAvatarModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="gold"
                size="sm"
                isLoading={isUpdatingAvatar}
                onClick={() => handleApplyAvatar(selectedAvatar)}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Profile Picture
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
