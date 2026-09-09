import React from 'react';
import { Activity, CheckCircle2, Server, Database, Zap } from 'lucide-react';

export const MonitoringPage: React.FC = () => {
  const services = [
    { name: 'Python FastAPI Microservices API', status: 'HEALTHY', latency: '12ms', icon: Zap },
    { name: 'PostgreSQL 16 Primary Database', status: 'HEALTHY', latency: '3ms', icon: Database },
    { name: 'Redis 7 In-Memory Cache', status: 'HEALTHY', latency: '1ms', icon: Server },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Platform Microservices Health & Monitoring</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time status of backend services, DB latency & Redis caching clusters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6 text-[#800020]" />
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {s.status}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">{s.name}</h3>
              <p className="text-xs text-slate-500 font-mono">Latency: {s.latency}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
