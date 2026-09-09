import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3D0B0E] text-[#F8F5F0] border-t border-[#5C1115] mt-16 transition-colors font-serif">
      {/* Trust Perks Bar */}
      <div className="border-b border-[#4E0E11] bg-[#2D0608]/80 py-8">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-[100px] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl gold-gradient-btn text-[#2C1E16] shadow-xs shrink-0 font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-[#C59B34] uppercase tracking-wider">Free Delivery</h5>
              <p className="font-sans text-[11px] sm:text-xs text-[#F8F5F0]/80">On orders above ₹499</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl gold-gradient-btn text-[#2C1E16] shadow-xs shrink-0 font-bold">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-[#C59B34] uppercase tracking-wider">Easy 7-Day Returns</h5>
              <p className="font-sans text-[11px] sm:text-xs text-[#F8F5F0]/80">Hassle-free replacement</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl gold-gradient-btn text-[#2C1E16] shadow-xs shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-[#C59B34] uppercase tracking-wider">100% Authentic</h5>
              <p className="font-sans text-[11px] sm:text-xs text-[#F8F5F0]/80">Certified pure brass & marble</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl gold-gradient-btn text-[#2C1E16] shadow-xs shrink-0 font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-[#C59B34] uppercase tracking-wider">Devotional Support</h5>
              <p className="font-sans text-[11px] sm:text-xs text-[#F8F5F0]/80">Call +91 (800) DIVINE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 text-center text-xs text-[#F8F5F0]/60 bg-[#2D0608]">
        © {new Date().getFullYear()} DivineKart Inc. All rights reserved. Crafted with devotion.
      </div>
    </footer>
  );
};
