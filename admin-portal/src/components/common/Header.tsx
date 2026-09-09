import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { useAppSelector } from '../../store';

export const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E4D7C2] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs transition-colors">
      {/* Search Bar */}
      <div className="relative w-64 sm:w-80">
        <Search className="w-4 h-4 text-[#766555] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search vendors, products, customers..."
          className="w-full text-xs font-medium pl-9 pr-4 py-2 rounded-xl border border-[#E4D7C2] bg-white text-[#261C14] placeholder:text-[#766555] focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5EC] text-[#6B131E] text-xs font-bold border border-[#C5A059]">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Microservices Operational</span>
        </div>

        <button className="relative p-2 rounded-xl text-[#766555] hover:bg-[#FAF5EC] hover:text-[#6B131E] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#6B131E]" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#E4D7C2]">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt={user?.firstName}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border-2 border-[#C5A059]"
          />
          <div className="hidden sm:block text-left">
            <p className="font-serif text-xs font-bold text-[#261C14]">{user?.firstName} {user?.lastName}</p>
            <p className="text-[10px] text-[#6B131E] font-bold">Platform Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
