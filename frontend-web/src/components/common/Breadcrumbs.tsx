import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../../constants';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground my-4 overflow-x-auto">
      <Link to={ROUTES.HOME} className="flex items-center gap-1 hover:text-primary transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-semibold whitespace-nowrap">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
