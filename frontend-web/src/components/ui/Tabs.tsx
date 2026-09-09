import React, { useState } from 'react';
import { cn } from '../../utils';

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultKey?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultKey, className }) => {
  const [activeKey, setActiveKey] = useState(defaultKey || items[0]?.key);
  const activeTab = items.find((item) => item.key === activeKey);

  return (
    <div className={cn('w-full flex flex-col gap-4', className)}>
      <div className="flex items-center gap-2 border-b border-border overflow-x-auto">
        {items.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            className={cn(
              'px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap',
              activeKey === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-2">{activeTab?.content}</div>
    </div>
  );
};
