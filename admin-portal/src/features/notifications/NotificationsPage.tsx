import React from 'react';
import { Bell, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">System Notifications & Broadcast Sender</h1>
        <p className="text-xs text-slate-500 mt-0.5">Send platform-wide broadcast announcements to all customers or verified merchants.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <Send className="w-5 h-5 text-[#800020]" /> Broadcast New Announcement
        </h3>
        <div className="space-y-3 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Target Audience</label>
            <select className="w-full p-2.5 rounded-xl border border-amber-200 bg-white">
              <option value="ALL">All Users (Customers & Vendors)</option>
              <option value="VENDORS">Verified Vendors Only</option>
              <option value="CUSTOMERS">Customers Only</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Message Content</label>
            <textarea rows={3} placeholder="Enter broadcast announcement message..." className="w-full p-3 rounded-xl border border-amber-200 bg-white" />
          </div>
          <Button leftIcon={<Send className="w-4 h-4 text-[#DAA520]" />}>Send Platform Broadcast</Button>
        </div>
      </div>
    </div>
  );
};
