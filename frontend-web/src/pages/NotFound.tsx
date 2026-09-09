import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
      <SEO title="Page Not Found" />
      <span className="text-6xl font-black text-primary">404</span>
      <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="lg" leftIcon={<Home className="w-5 h-5" />}>
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
};
