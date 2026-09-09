import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt = 'Product Image' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-muted border border-border group">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={alt}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                idx === selectedIndex
                  ? 'border-primary ring-2 ring-primary/20 scale-105'
                  : 'border-border opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${alt} thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
