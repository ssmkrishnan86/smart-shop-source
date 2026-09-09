import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../../components/ui/ProductCard';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { SEO } from '../../../components/common/SEO';
import { productService } from '../../../services/productService';
import { subscribeProductSync } from '../../../services/productSyncService';
import { IProduct } from '../../../interfaces';
import { Grid, List, Search, Loader2 } from 'lucide-react';

const PAGE_SIZE = 8;

export const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial page when filters/category/search/sort change
  useEffect(() => {
    let isMounted = true;
    const fetchInitialProducts = async (isBackground = false) => {
      if (!isBackground) setIsLoading(true);
      setPage(1);
      try {
        const res = await productService.getProducts({
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          sortBy,
          search: searchQuery || undefined,
          page: 1,
          limit: PAGE_SIZE,
        });

        if (isMounted) {
          setProducts(res.data || []);
          const total = res.meta?.total ?? res.data.length;
          setTotalCount(total);
          setHasMore(res.meta?.hasMore ?? (res.data.length >= PAGE_SIZE));
        }
      } catch (e) {
        console.error('Failed to load products:', e);
      } finally {
        if (isMounted && !isBackground) setIsLoading(false);
      }
    };

    fetchInitialProducts(false);

    const unsubscribe = subscribeProductSync(() => {
      if (isMounted) fetchInitialProducts(true);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [selectedCategory, sortBy, searchQuery]);


  // Function to load the next page of products
  const loadNextPage = useCallback(async () => {
    if (isLoading || isFetchingMore || !hasMore) return;

    const nextPage = page + 1;
    setIsFetchingMore(true);

    try {
      const res = await productService.getProducts({
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        sortBy,
        search: searchQuery || undefined,
        page: nextPage,
        limit: PAGE_SIZE,
      });

      if (res.data && res.data.length > 0) {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems = res.data.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newItems];
        });
        setPage(nextPage);
        setHasMore(res.meta?.hasMore ?? (res.data.length >= PAGE_SIZE));
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching next page of products:', err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [isLoading, isFetchingMore, hasMore, page, selectedCategory, sortBy, searchQuery]);

  // Setup IntersectionObserver sentinel for infinite scrolling
  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isFetchingMore) {
          loadNextPage();
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadNextPage, hasMore, isLoading, isFetchingMore]);

  const categories = [
    'All',
    'Pooja Essentials',
    'God Idols & Statues',
    'Rudraksha & Spiritual Malas',
    'Temple & Pooja Accessories',
    'Incense Sticks & Dhoop',
    'Diyas & Lamps',
    'Spiritual Books & Scriptures',
    'Yantra, Kavach & Protection',
    'Ayurvedic & Pooja Herbs',
    'Spiritual Gift Sets',
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <SEO title="Explore Divine Marketplace - DivineKart" />
      <Breadcrumbs items={[{ label: 'Products' }]} />

      {/* Header Banner matching Divine & Luxury Kanchi Theme */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#FAF6F0] border border-[#EAE1D0] text-[#2C1E16] shadow-xs">
        <div className="space-y-1.5">
          <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#7A1F1E]">
            ❖ Sacred Devotional Collection
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight text-[#9E7728]">
            DivineKart Marketplace
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#6E584B]">
            Explore authentic temple-quality handcrafted brass idols, pure puja samagri, certified rudrakshas, sacred books & devotional music.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-serif font-bold px-4 py-2 rounded-full gold-gradient-btn text-[#2C1E16] shadow-xs">
            {totalCount || products.length} Items Found
          </span>
        </div>
      </div>

      {/* Filter & Toolbar Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] shadow-2xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSearchParams(cat === 'All' ? {} : { category: cat });
              }}
              className={`px-4 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'gold-gradient-btn text-[#2C1E16] shadow-sm scale-105 border border-[#E6C875]'
                  : 'bg-[#FAF2E4] text-[#6E584B] border border-[#EAE1D0] hover:bg-[#FAF6EE] hover:text-[#7A1F1E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & View Controls */}
        <div className="flex items-center gap-3 ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2 text-xs font-serif font-bold rounded-xl border border-[#EAE1D0] bg-white text-[#2C1E16] focus:outline-none focus:ring-1 focus:ring-[#C59B34]"
          >
            <option value="popularity">Most Popular</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
          </select>

          <div className="flex items-center border border-[#EAE1D0] rounded-xl p-1 bg-[#FAF2E4]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white shadow-xs text-[#7A1F1E] border border-[#EAE1D0]'
                  : 'text-[#6E584B] hover:text-[#2C1E16]'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'list'
                  ? 'bg-white shadow-xs text-[#7A1F1E] border border-[#EAE1D0]'
                  : 'text-[#6E584B] hover:text-[#2C1E16]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid / List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-[#EAE1D0]/50 animate-pulse border border-[#EAE1D0]" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-[#EAE1D0] rounded-2xl bg-[#F8F5F0]">
          <Search className="w-12 h-12 text-[#C59B34] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#2C1E16]">No Products Found</h3>
          <p className="text-sm font-sans text-[#6E584B] mt-1">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Infinite Scroll Sentinel & Loader State */}
      <div ref={sentinelRef} className="py-6 text-center">
        {isFetchingMore && (
          <div className="flex items-center justify-center gap-2 text-xs font-serif font-bold text-[#7A1F1E] bg-[#FAF6F0] py-3 px-6 rounded-2xl border border-[#EAE1D0] shadow-xs max-w-xs mx-auto">
            <Loader2 className="w-4 h-4 animate-spin text-[#C59B34]" /> Loading more products...
          </div>
        )}
        {!hasMore && products.length > 0 && !isLoading && (
          <p className="text-xs font-serif font-bold text-[#6E584B]/80 py-4 uppercase tracking-wider">
            ❖ You've reached the end of the divine collection ❖
          </p>
        )}
      </div>
    </div>
  );
};
