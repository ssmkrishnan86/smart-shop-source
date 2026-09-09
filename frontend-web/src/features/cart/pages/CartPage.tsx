import React, { useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { Button } from '../../../components/ui/Button';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { SEO } from '../../../components/common/SEO';
import { formatCurrency } from '../../../utils';
import {
  Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin, Tag,
  Loader2, RefreshCw, CheckCircle2, AlertCircle, Truck, Receipt, X,
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const {
    items, updateQuantity, removeFromCart, subtotal, discountAmount,
    total, grandTotal, taxAmount, taxRate, shippingFee,
    clearCart, applyCoupon, removeCoupon, couponCode, serverTotals,
    isSyncing, itemCount, totalQuantity,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      await applyCoupon(couponInput.trim());
      setCouponInput('');
    } catch (e: any) {
      setCouponError(e?.message ?? 'Invalid coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  // ─── Empty cart state ──────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <SEO title="Shopping Cart | DivineKart" />
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className="text-center py-20 border-2 border-dashed border-amber-200 rounded-2xl bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-rose-50/30 pointer-events-none" />
          <ShoppingBag className="w-16 h-16 text-amber-800/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Explore DivineKart's sacred collection of idols, puja essentials & more
          </p>
          {isSyncing && (
            <p className="text-xs text-amber-700 flex items-center justify-center gap-1.5 mb-4 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking your saved cart...
            </p>
          )}
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3 rounded-xl bg-[#800020] text-amber-100 font-bold text-sm shadow hover:bg-[#600018] transition-colors"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title={`Shopping Cart (${itemCount} items) | DivineKart`} />
      <Breadcrumbs items={[{ label: 'Cart' }]} />

      {/* Delivery widget */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#800020]" />
          <span>Deliver to: <strong className="font-bold">631502, Kanchipuram</strong></span>
        </div>
        <button className="font-bold text-[#800020] underline hover:text-amber-800">Change</button>
      </div>

      {/* Cart header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-slate-900">
            Shopping Cart
            <span className="text-base font-semibold text-slate-500 ml-2">
              ({itemCount} {itemCount === 1 ? 'item' : 'items'}, {totalQuantity} units)
            </span>
          </h1>
          {isSyncing && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" /> Syncing
            </span>
          )}
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Cart Items ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-amber-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="w-20 h-20 rounded-xl border border-amber-100 overflow-hidden shrink-0 bg-amber-50">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=200&q=60';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <Link
                  to={`/products/${item.product.id}`}
                  className="font-bold text-sm text-slate-900 hover:text-[#800020] transition-colors line-clamp-2 leading-snug"
                >
                  {item.product.name}
                </Link>
                <p className="text-xs text-slate-400 mt-0.5">{item.product.category}</p>
                {item.selectedAttributes?.variant && (
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {item.selectedAttributes.variant}
                  </span>
                )}
                <div className="flex items-center gap-2 mt-1.5 justify-center sm:justify-start">
                  <span className="text-base font-black text-[#800020]">
                    {formatCurrency(item.price)}
                  </span>
                  {item.product.originalPrice > item.price && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(item.product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Qty Controls + Remove */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-amber-300 rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-amber-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 text-slate-700" />
                  </button>
                  <span className="px-3 text-sm font-black min-w-[2rem] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-amber-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-700" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary Sidebar ─────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl border border-amber-200 bg-white shadow-sm h-fit space-y-5 sticky top-24">
          <h3 className="text-base font-black text-slate-900 pb-3 border-b border-amber-100 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#800020]" />
            Payment Summary
          </h3>

          {/* ── Coupon Section ─────────────────────────────────────────────── */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Tag className="w-3.5 h-3.5 text-[#800020]" />
              Promo / Coupon Code
            </label>
            {couponCode ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {couponCode} — ₹{discountAmount} off
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. DIVINE10, SMART20"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    className="flex-1 px-3 py-2.5 text-xs border border-amber-300 rounded-xl bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-[#800020]/30 font-medium"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    className="px-4 py-2.5 text-xs font-bold rounded-xl bg-[#800020] text-amber-100 hover:bg-[#600018] disabled:opacity-50 transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {couponLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {couponError}
                  </p>
                )}
              </>
            )}
          </div>

          {/* ── Price Breakdown ───────────────────────────────────────────── */}
          <div className="space-y-2.5 text-xs border-t border-amber-100 pt-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({totalQuantity} items)</span>
              <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Coupon Discount
                </span>
                <span className="font-bold">− {formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3" /> Shipping
              </span>
              {shippingFee === 0 ? (
                <span className="font-bold text-emerald-600">FREE</span>
              ) : (
                <span className="font-semibold">{formatCurrency(shippingFee)}</span>
              )}
            </div>

            {shippingFee > 0 && (
              <p className="text-[10px] text-amber-700 font-medium">
                Add {formatCurrency(499 - subtotal)} more for free shipping
              </p>
            )}

            <div className="flex justify-between text-slate-600">
              <span>GST ({taxRate}%)</span>
              <span className="font-semibold">{formatCurrency(taxAmount)}</span>
            </div>
          </div>

          {/* ── Grand Total ───────────────────────────────────────────────── */}
          <div className="pt-3 border-t border-amber-200 flex justify-between items-baseline">
            <span className="text-sm font-black text-slate-900">Grand Total</span>
            <div className="text-right">
              <span className="text-xl font-black text-[#800020]">{formatCurrency(grandTotal)}</span>
              <p className="text-[10px] text-slate-400 font-medium">Inclusive of all taxes</p>
            </div>
          </div>

          {/* ── Savings Badge ─────────────────────────────────────────────── */}
          {discountAmount > 0 && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
              <p className="text-xs font-bold text-emerald-800">
                🎉 You're saving {formatCurrency(discountAmount)} on this order!
              </p>
            </div>
          )}

          {/* ── Checkout CTA ──────────────────────────────────────────────── */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-amber-100 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] group"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4 text-[#DAA520] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <p className="text-center text-[10px] text-slate-400 font-medium">
            🔒 Secure checkout • All major payment methods accepted
          </p>
        </div>
      </div>
    </div>
  );
};
