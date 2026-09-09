import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    toggleCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    total,
    couponCode,
    applyCoupon,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  const handleViewCartClick = () => {
    toggleCartDrawer();
    navigate('/cart');
  };

  const handleCheckoutClick = () => {
    toggleCartDrawer();
    navigate('/checkout');
  };

  return (
    <Drawer isOpen={isOpen} onClose={toggleCartDrawer} title="YOUR DIVINE SHOPPING CART">
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-[#F8F5F0] rounded-2xl border border-[#EAE1D0]">
          <div className="w-16 h-16 rounded-full bg-[#FAF2E4] border border-[#C59B34] text-[#7A1F1E] flex items-center justify-center mb-4 shadow-sm">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-lg font-bold text-[#2C1E16] mb-1">Your Cart is Empty</h4>
          <p className="text-xs text-[#6E584B] mb-6">
            Explore our temple-quality handcrafted brass idols, thalis, and sacred offerings.
          </p>
          <Button onClick={toggleCartDrawer} variant="gold" size="md">
            START SHOPPING
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between bg-[#F8F5F0] p-2 rounded-2xl border border-[#EAE1D0]">
          {/* Header Divider */}
          <div className="text-center py-2 border-b border-[#EAE1D0] mb-3">
            <div className="ornate-divider mb-1"></div>
            <p className="text-xs font-serif font-bold text-[#7A1F1E] uppercase tracking-widest">
              Items ({items.length}):
            </p>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-[#EAE1D0] bg-white shadow-xs"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-[#EAE1D0] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-serif text-xs font-bold text-[#2C1E16] truncate">
                    {item.product.name}
                  </h5>
                  <p className="text-xs font-semibold text-[#7A1F1E] mt-0.5">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[#EAE1D0] rounded-md bg-[#F8F5F0]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#EAE1D0] text-[#2C1E16] rounded-l-md"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#2C1E16]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#EAE1D0] text-[#2C1E16] rounded-r-md"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-[#6E584B] hover:text-[#7A1F1E] rounded-lg hover:bg-[#FAF2E4] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Coupon & Summary Footer */}
          <div className="pt-4 border-t border-[#EAE1D0] mt-4 space-y-3 bg-[#F8F5F0] p-3 rounded-xl border border-[#EAE1D0]">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E584B]" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. DIVINE20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#EAE1D0] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#C59B34] text-[#2C1E16]"
                />
              </div>
              <Button size="sm" variant="outline" onClick={() => applyCoupon(promoInput)}>
                Apply
              </Button>
            </div>

            {couponCode && (
              <p className="text-xs text-emerald-800 font-bold flex items-center justify-between">
                <span>Applied Code: {couponCode}</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </p>
            )}

            <div className="space-y-1.5 text-xs text-[#6E584B] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2C1E16]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-sm text-[#2C1E16] pt-2 border-t border-[#EAE1D0]">
                <span className="font-serif uppercase">Total Amount:</span>
                <span className="text-lg font-extrabold text-[#7A1F1E]">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Action Buttons: VIEW CART (#C59B34) & PROCEED TO CHECKOUT (#7A1F1E) */}
            <div className="space-y-2 pt-2">
              <Button
                variant="gold"
                size="md"
                className="w-full shadow-md text-xs tracking-widest py-3"
                onClick={handleViewCartClick}
                leftIcon={<Eye className="w-4 h-4" />}
              >
                VIEW CART
              </Button>

              <Button
                variant="maroon"
                size="md"
                className="w-full shadow-md text-xs tracking-widest py-3"
                onClick={handleCheckoutClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
