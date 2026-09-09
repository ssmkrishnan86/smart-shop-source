import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ENV } from '../../config/env';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Enterprise Multi-Vendor eCommerce Platform offering top brand products with instant delivery and secure payment.',
  keywords = 'ecommerce, multi-vendor, online shopping, electronics, fashion, deals',
  image = '/logo.png',
}) => {
  const fullTitle = title ? `${title} | ${ENV.APP_NAME}` : ENV.APP_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};
