import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Store } from 'lucide-react';
import { ROUTES } from '../constants';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left Promotional Banner */}
      <div className="hidden lg:flex flex-col justify-between p-12 maroon-gradient border-r-2 border-[#DAA520]/40 text-amber-100 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#DAA520]/10 blur-3xl pointer-events-none" />
        <Link to={ROUTES.HOME} className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-[#DAA520] text-slate-950 flex items-center justify-center font-black text-xl shadow-lg">
            🪔
          </div>
          <span className="font-black text-2xl tracking-tight text-white">Divine<span className="text-[#DAA520]">Kart</span></span>
        </Link>

        <div className="z-10 max-w-md my-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#DAA520]">Sacred Devotional Store</span>
          <h2 className="text-4xl font-black tracking-tight leading-tight text-white">
            Bring Home Divine Blessings
          </h2>
          <p className="text-amber-200/90 text-sm leading-relaxed">
            Join millions of devotees shopping authentic handcrafted brass idols, pure puja samagri & certified rudrakshas.
          </p>
        </div>

        <div className="z-10 text-xs text-amber-200/60">
          © {new Date().getFullYear()} DivineKart Inc. All rights reserved.
        </div>
      </div>

      {/* Right Form Outlet */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
