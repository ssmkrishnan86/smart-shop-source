import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { ICategory } from '../interfaces';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowRight } from 'lucide-react';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    categoryService.getCategories().then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <SEO title="Categories - DivineKart" />
      <Breadcrumbs items={[{ label: 'Categories' }]} />

      <div className="border-b border-[#EAE1D0] pb-3">
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#2C1E16]">
          Shop by Category
        </h1>
        <p className="text-xs font-sans text-[#6E584B] mt-1">Explore authentic spiritual collection handcrafted by temple artisans</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${encodeURIComponent(cat.slug || cat.name)}`}
            className="group flex flex-col rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-[#C59B34] transition-all"
          >
            {/* Ornate Temple Arch Top */}
            <div className="w-full flex items-center justify-center pt-3 pb-1 bg-[#FAF6EE] border-b border-[#EAE1D0]/60">
              <svg className="w-12 h-4 text-[#C59B34]/60 group-hover:text-[#C59B34] transition-colors" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30 C 30 10, 40 0, 50 0 C 60 0, 70 10, 100 30 Z" fill="currentColor" fillOpacity="0.15" />
                <path d="M10 30 C 35 15, 45 5, 50 5 C 55 5, 65 15, 90 30" stroke="currentColor" strokeWidth="2.5" fill="none" />
              </svg>
            </div>

            {/* Image Container */}
            <div className="w-full h-40 overflow-hidden bg-white relative">
              <img
                src={cat.image || '/images/ganesha_idol.jpg'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.retried) {
                    target.dataset.retried = 'true';
                    target.src = '/images/products/brass_ganesha_idol.jpg';
                  } else {
                    target.src = '/images/ganesha_idol.jpg';
                  }
                }}
              />
            </div>

            {/* Category Title & Item Count */}
            <div className="p-4 bg-[#F8F5F0] text-center border-t border-[#EAE1D0] flex flex-col items-center">
              <h4 className="font-serif font-bold text-sm text-[#2C1E16] group-hover:text-[#7A1F1E] transition-colors uppercase tracking-wider">
                {cat.name}
              </h4>
              <span className="text-xs text-[#6E584B] font-sans mt-0.5">{cat.itemCount} items listed</span>
              <div className="mt-3 flex items-center gap-1 text-xs font-serif font-bold text-[#C59B34] group-hover:text-[#7A1F1E] transition-colors">
                <span>Explore Department</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
