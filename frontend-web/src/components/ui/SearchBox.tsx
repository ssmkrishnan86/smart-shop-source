import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { IProduct } from '../../interfaces';
import { formatCurrency } from '../../utils';

export const SearchBox: React.FC<{ placeholder?: string; className?: string }> = ({
  placeholder = 'Search for idols, puja samagri...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await productService.getProducts({ search: query, limit: 5 });
        setResults(res.data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-[#A68A56] pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 rounded-full border border-[#5C151D] bg-[#2A050A] text-sm text-[#F8F5F0] placeholder:text-[#A68A56] focus:bg-[#2A050A] focus:border-[#5C151D] focus:outline-none focus:ring-0 outline-none transition-none shadow-inner"
        />
        {isLoading && <Loader2 className="absolute right-3.5 w-4 h-4 text-[#A68A56] animate-spin" />}
        {!isLoading && query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3.5 p-0.5 rounded-full hover:bg-[#3B0A11] text-[#A68A56]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#F8F5F0] border border-[#EAE1D0] rounded-2xl shadow-2xl overflow-hidden divide-y divide-[#EAE1D0]">
          {results.length === 0 ? (
            <div className="p-4 text-center text-sm text-[#6E584B]">
              No products found matching "{query}"
            </div>
          ) : (
            results.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  setIsOpen(false);
                  navigate(`/products/${prod.id}`);
                }}
                className="flex items-center gap-3.5 p-3 hover:bg-[#FAF2E4] cursor-pointer transition-colors"
              >
                <img src={prod.thumbnail} alt={prod.name} className="w-12 h-12 object-cover rounded-lg shrink-0 border border-[#EAE1D0]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#2C1E16] truncate">{prod.name}</p>
                  <p className="text-xs text-[#6E584B]">{prod.category} • {prod.brand}</p>
                </div>
                <span className="text-sm font-extrabold text-[#7A1F1E]">{formatCurrency(prod.price)}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
