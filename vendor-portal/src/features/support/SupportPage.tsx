import React from 'react';
import { HelpCircle, MessageSquare, PhoneCall, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SupportPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Merchant Help & Support Center</h1>
        <p className="text-xs text-slate-500 mt-0.5">Need help with store listings, payouts or order dispatches? Contact support.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm text-center space-y-2">
          <PhoneCall className="w-6 h-6 text-[#800020] mx-auto" />
          <h4 className="font-bold text-xs">Dedicated Merchant Hotline</h4>
          <p className="text-[11px] font-black text-[#800020]">+91 (800) VENDOR-HELP</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm text-center space-y-2">
          <Mail className="w-6 h-6 text-[#800020] mx-auto" />
          <h4 className="font-bold text-xs">Support Email</h4>
          <p className="text-[11px] font-black text-[#800020]">vendor-support@smartshop.com</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm text-center space-y-2">
          <MessageSquare className="w-6 h-6 text-[#800020] mx-auto" />
          <h4 className="font-bold text-xs">Live Chat</h4>
          <p className="text-[11px] font-bold text-emerald-600">Available 24/7</p>
        </div>
      </div>
    </div>
  );
};
