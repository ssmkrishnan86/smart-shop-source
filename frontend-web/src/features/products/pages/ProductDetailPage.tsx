import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { subscribeProductSync } from '../../../services/productSyncService';
import { IProduct } from '../../../interfaces';
import { ImageGallery } from '../../../components/ui/ImageGallery';
import { Rating } from '../../../components/ui/Rating';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { SEO } from '../../../components/common/SEO';
import { useCart } from '../../../hooks/useCart';
import { formatCurrency } from '../../../utils';
import { ShoppingBag, Zap, Truck, RotateCcw, CheckCircle, Plus, Minus, PackageCheck } from 'lucide-react';
import { reviewService } from '../../../services/reviewService';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [, setReviews] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const fetchProductDetail = useCallback(() => {
    if (id) {
      productService
        .getProductById(id)
        .then((res) => setProduct(res.data))
        .catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      productService
        .getProductById(id)
        .then((res) => setProduct(res.data))
        .catch(console.error)
        .finally(() => setIsLoading(false));

      reviewService.getProductReviews(id).then((res) => setReviews(res.data));

      const unsubscribe = subscribeProductSync(() => {
        fetchProductDetail();
      });

      return () => {
        unsubscribe();
      };
    }
  }, [id, fetchProductDetail]);



  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (isLoading) return <div className="h-96 rounded-2xl bg-muted animate-pulse my-8" />;
  if (!product) return <div className="text-center py-20 font-bold text-foreground">Product not found</div>;

  return (
    <div className="space-y-8 w-full">
      <SEO title={product.name} description={product.shortDescription} />
      <Breadcrumbs items={[{ label: 'Idols', href: '/products?category=Idols' }, { label: product.name }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Gallery */}
        <ImageGallery images={product.images} alt={product.name} />

        {/* Right Product Details */}
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-primary text-white shadow-xs">
                Best Seller
              </span>
              {product.discountPercentage > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Rating value={product.rating} showLabel />
            <span className="text-xs text-muted-foreground">({product.reviewCount || 128} customer reviews)</span>
          </div>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-border">
            <span className="text-3xl font-black text-primary">{formatCurrency(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-base text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-xs font-extrabold text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded">
              {product.discountPercentage}% OFF
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Product Specifications Grid */}
          <div className="p-4 rounded-2xl border border-border bg-card space-y-2 text-xs font-medium">
            <div className="grid grid-cols-2 gap-2 text-foreground">
              <div>• <strong>Material:</strong> Brass</div>
              <div>• <strong>Size:</strong> 8 inch</div>
              <div>• <strong>Weight:</strong> 1.2 kg</div>
              <div>• <strong>Color:</strong> Golden</div>
            </div>
            <div className="pt-2 border-t border-border flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold">
              <CheckCircle className="w-4 h-4" /> In Stock - Ready to Ship Today
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-foreground">Quantity:</span>
            <div className="flex items-center border border-border rounded-xl bg-card">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2 hover:bg-accent rounded-l-xl"
              >
                <Minus className="w-4 h-4 text-foreground" />
              </button>
              <span className="px-4 font-bold text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-2 hover:bg-accent rounded-r-xl"
              >
                <Plus className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => addToCart(product, quantity)}
              className="py-3.5 rounded-xl border-2 border-primary/30 text-primary hover:bg-primary/10 font-black text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <ShoppingBag className="w-5 h-5" /> Add To Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3.5 rounded-xl blue-gradient text-white hover:opacity-95 font-black text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Zap className="w-5 h-5 text-amber-300" /> Buy Now
            </button>
          </div>

          {/* Perks Bar */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border text-center text-[11px] font-semibold text-muted-foreground">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-border">
              <Truck className="w-5 h-5 text-primary mx-auto mb-1" />
              <span>Free Delivery</span>
              <span className="block text-[9px] text-muted-foreground font-normal">On orders above ₹499</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-border">
              <RotateCcw className="w-5 h-5 text-primary mx-auto mb-1" />
              <span>Easy Returns</span>
              <span className="block text-[9px] text-muted-foreground font-normal">7 Days hassle-free</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-border">
              <PackageCheck className="w-5 h-5 text-primary mx-auto mb-1" />
              <span>Secure Packaging</span>
              <span className="block text-[9px] text-muted-foreground font-normal">Carefully packed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
