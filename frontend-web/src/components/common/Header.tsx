import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User as UserIcon, MapPin, Sparkles, Truck } from 'lucide-react';
import { SearchBox } from '../ui/SearchBox';
import { DarkModeToggle } from './DarkModeToggle';
import { useCart } from '../../hooks/useCart';
import { useAppSelector } from '../../store';
import { ROUTES } from '../../constants';
import { notificationService } from '../../services/notificationService';
import { useDeliveryAddress } from '../../contexts/AddressContext';

export const Header: React.FC = () => {
  const { itemCount, toggleCartDrawer } = useCart();
  const { activeAddress, openAddressDrawer } = useDeliveryAddress();
  const wishlistCount = useAppSelector((state) => state.wishlist.productIds.length);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [, setUnreadNotifications] = useState(0);
  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadNotifications(0);
      return;
    }
    notificationService.getNotifications(1, 1).then(({ unreadCount }) => setUnreadNotifications(unreadCount));
  }, [isAuthenticated]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#3B0A11] border-b border-[#540F19] text-[#F8F5F0] shadow-md transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#2A050A] text-[#E0C078] text-[11px] py-1.5 px-4 text-center font-serif font-bold flex items-center justify-center gap-2 border-b border-[#4A0E17] tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>
          ❖ Festive shrine collections • Special Kanchi silk offerings upto 20% off • Premium brass idols &amp; puja kits
        </span>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-[80px] h-20 flex items-center justify-between gap-4 py-2">
        {/* Brand Logo - DivineKart */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#E0C078] via-[#B88B4A] to-[#8C6228] text-[#2A050A] flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-[#E0C078]">
            🪔
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-extrabold text-2xl tracking-widest text-[#E0C078] uppercase leading-none">
              DIVINE<span className="text-[#F8F5F0]">KART</span>
            </span>
            <span className="text-[9px] text-[#D4AF37]/80 font-serif font-semibold tracking-widest mt-0.5">
              Shop • Pūjā • Art • Music • Sacred temple offerings
            </span>
          </div>
        </Link>

        {/* Deliver To Location Widget */}
        <div
          onClick={openAddressDrawer}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A0E17]/80 border border-[#6B1522] text-xs text-[#F8F5F0] font-medium shadow-2xs cursor-pointer hover:border-[#D4AF37] transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <span>
            Deliver to: <strong className="font-bold text-[#E0C078]">{activeAddress ? `${activeAddress.zipCode}, ${activeAddress.city}` : '631503, Kanchipuram Temple Precincts'}</strong>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openAddressDrawer();
            }}
            className="text-[10px] text-[#D4AF37] font-bold underline ml-1 hover:text-white"
          >
            Change
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <SearchBox placeholder="Search for idols, puja samagri..." />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />

          {/* Wishlist */}
          <Link
            to={ROUTES.WISHLIST}
            aria-label="Wishlist"
            className="relative p-2 text-[#F8F5F0] hover:text-[#E0C078] rounded-full transition-colors"
          >
            <Heart className="w-5 h-5 text-[#E0C078]" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 text-[10px] font-black rounded-full bg-[#8C1D2B] text-white flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <button
            onClick={toggleCartDrawer}
            aria-label="Shopping Cart"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37] bg-[#4A0E17] text-[#E0C078] text-xs font-serif font-extrabold tracking-wider shadow-md hover:bg-[#5E121E] transition-all"
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-[#E0C078]" />
            <span className="hidden sm:inline">
              Your everything bag ({itemCount})
            </span>
            <span className="sm:hidden font-bold">({itemCount})</span>
          </button>

          {/* User Profile Avatar */}
          {isAuthenticated ? (
            <Link to={ROUTES.PROFILE} className="p-0.5 rounded-full border-2 border-[#D4AF37]">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={user?.firstName}
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          ) : (
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-serif font-bold px-4 py-2 rounded-full border border-[#D4AF37] text-[#E0C078] hover:bg-[#D4AF37] hover:text-[#3B0A11] transition-colors shadow-xs"
            >
              <UserIcon className="w-4 h-4" />
              Sign in
            </button>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-[#4A0E17] bg-[#2A050A] hidden md:block">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-[80px] flex items-center justify-between text-[11px] font-serif font-bold text-[#F8F5F0] py-2">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to={ROUTES.HOME} className="hover:text-[#E0C078] transition-colors text-[#E0C078]">Home</Link>
            <Link to={ROUTES.CATEGORIES} className="hover:text-[#E0C078] transition-colors">Categories</Link>
            <Link to="/products?category=Puja%20Samagri" className="hover:text-[#E0C078] transition-colors">Puja samagri</Link>
            <Link to="/products?category=Idols" className="hover:text-[#E0C078] transition-colors">Brass &amp; marble idols</Link>
            <Link to="/products?category=Books" className="hover:text-[#E0C078] transition-colors">Sacred books</Link>
            <Link to="/products?category=Rudraksha" className="hover:text-[#E0C078] transition-colors">Rudraksha</Link>
            <Link to="/products?category=Gift%20Items" className="hover:text-[#E0C078] transition-colors">Gifts &amp; art</Link>
            <Link to={ROUTES.PRODUCTS} className="text-[#E0C078] font-black tracking-wider flex items-center gap-1">Offers 🔥</Link>
            <Link to="/account/orders" className="px-2.5 py-0.5 rounded-full bg-[#4A0E17] text-[#E0C078] border border-[#D4AF37]/50 hover:border-[#D4AF37] font-sans font-black tracking-wider flex items-center gap-1.5 transition-all shadow-xs">
              <Truck className="w-3.5 h-3.5 text-[#D4AF37]" /> Track Order
            </Link>
          </div>
          <span className="text-[11px] text-[#D4AF37]/80 font-sans font-semibold">
            ✦ Free shipping on sacred orders above ₹499
          </span>
        </div>
      </nav>
    </header>
  );
};
