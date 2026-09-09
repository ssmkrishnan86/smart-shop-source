import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Store, ShieldCheck, Globe, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEO title="About Us" />
      <Breadcrumbs items={[{ label: 'About SmartShop' }]} />

      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Empowering Modern Global eCommerce
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          SmartShop Enterprise is designed from the ground up to connect verified merchants with millions of customers worldwide through cutting-edge technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl border border-border bg-card text-center space-y-2">
          <Globe className="w-10 h-10 text-primary mx-auto" />
          <h3 className="font-bold text-lg">Global Reach</h3>
          <p className="text-xs text-muted-foreground">Operating across 45+ countries with localized payments and multi-currency support.</p>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card text-center space-y-2">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-lg">Verified Quality</h3>
          <p className="text-xs text-muted-foreground">Strict multi-vendor verification ensuring 100% genuine products and buyer protection.</p>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card text-center space-y-2">
          <Users className="w-10 h-10 text-sky-500 mx-auto" />
          <h3 className="font-bold text-lg">10M+ Customers</h3>
          <p className="text-xs text-muted-foreground">Trusted by millions of active daily buyers and enterprise brand partners.</p>
        </div>
      </div>
    </div>
  );
};
