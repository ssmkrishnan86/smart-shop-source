import React from 'react';
import { Heart, ShoppingBag, Star, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces';
import { formatCurrency } from '../../utils';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

interface ProductCardProps {
  product: IProduct;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { isWishlisted: checkWishlisted, toggle: toggleWishlist } = useWishlist();
  const isWishlisted = checkWishlisted(product.id);

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative flex flex-col sm:flex-row rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] text-[#2C1E16] shadow-xs hover:shadow-lg hover:border-[#C59B34] transition-all duration-300 overflow-hidden w-full">
        {/* Fixed Aspect Thumbnail Container */}
        <div className="relative aspect-square sm:aspect-auto sm:w-52 md:w-60 shrink-0 bg-[#EAE1D0]/40 overflow-hidden">
          <Link to={`/products/${product.id}`} className="w-full h-full block">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
            {product.discountPercentage > 0 && (
              <span className="px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-[#7A1F1E] text-white shadow-xs">
                {product.discountPercentage}% OFF
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-0.5 text-[10px] font-serif font-extrabold rounded-full gold-gradient text-[#2C1E16] shadow-xs uppercase tracking-wider">
                Best Seller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            aria-label="Wishlist product"
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isWishlisted
                ? 'bg-[#7A1F1E] text-white'
                : 'bg-white/80 text-[#6E584B] hover:bg-[#F8F5F0] hover:text-[#7A1F1E]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Details & Actions Row */}
        <div className="flex flex-col md:flex-row flex-1 p-4 md:p-5 gap-4 justify-between items-start md:items-center">
          {/* Main Info */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF2E4] text-[#7A1F1E] border border-[#EAE1D0]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-[#C59B34] font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-current text-[#C59B34]" />
                <span>{product.rating}</span>
                <span className="text-[#6E584B] font-normal">({product.reviewCount || 128})</span>
              </div>
            </div>

            <Link to={`/products/${product.id}`} className="group-hover:text-[#7A1F1E] transition-colors block">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#2C1E16] leading-snug line-clamp-2">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs font-sans text-[#6E584B] line-clamp-2 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-[#9E7728] font-bold">
              <span>Brand: {product.brand || 'DivineKart Artisan'}</span>
              <span>•</span>
              <span className="text-emerald-700">In Stock ({product.stock || 15} units)</span>
            </div>
          </div>

          {/* Pricing & Actions Column */}
          <div className="flex flex-col sm:items-end justify-between shrink-0 w-full md:w-52 gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#EAE1D0] md:border-l md:pl-5">
            <div className="space-y-0.5 text-left md:text-right">
              <div className="flex items-baseline gap-2 md:justify-end">
                <span className="text-xl sm:text-2xl font-black text-[#7A1F1E]">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-[#6E584B] line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="text-[11px] font-bold text-emerald-700">
                  Save {formatCurrency(product.originalPrice - product.price)} ({product.discountPercentage}% OFF)
                </p>
              )}
              <p className="text-[10px] text-[#6E584B]">Free Devotional Delivery</p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => addToCart(product, 1)}
                className="w-full py-2.5 rounded-xl border border-[#C59B34] text-[#7A1F1E] hover:bg-[#FAF2E4] font-serif font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 rounded-xl gold-gradient-btn font-serif font-extrabold text-xs text-[#2C1E16] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Zap className="w-4 h-4 text-[#2C1E16]" /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View Render
  return (
    <div className="group relative flex flex-col rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] text-[#2C1E16] shadow-xs hover:shadow-xl hover:border-[#C59B34] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-[#EAE1D0]/40 overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
          {product.discountPercentage > 0 && (
            <span className="px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-[#7A1F1E] text-white shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 text-[10px] font-serif font-extrabold rounded-full gold-gradient text-[#2C1E16] shadow-xs uppercase tracking-wider">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Wishlist product"
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
            isWishlisted
              ? 'bg-[#7A1F1E] text-white'
              : 'bg-white/80 text-[#6E584B] hover:bg-[#F8F5F0] hover:text-[#7A1F1E]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 text-[#C59B34] font-bold text-xs mb-1.5">
          <Star className="w-3.5 h-3.5 fill-current text-[#C59B34]" />
          <span>{product.rating}</span>
          <span className="text-[#6E584B] font-normal">({product.reviewCount || 128})</span>
        </div>

        {/* Title */}
        <Link to={`/products/${product.id}`} className="group-hover:text-[#7A1F1E] transition-colors">
          <h3 className="font-serif font-bold text-xs sm:text-sm line-clamp-2 text-[#2C1E16] mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Pricing & Stock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-[#7A1F1E]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#6E584B] line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
              product.stock <= 0
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : product.stock <= 10
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}
          >
            {product.stock <= 0 ? 'Out of Stock' : `${product.stock} units`}
          </span>
        </div>


        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2.5 border-t border-[#EAE1D0]">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2 rounded-xl border border-[#C59B34] text-[#7A1F1E] hover:bg-[#FAF2E4] font-serif font-bold text-xs transition-colors flex items-center justify-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full py-2 rounded-xl gold-gradient-btn font-serif font-extrabold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-[#2C1E16]" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
