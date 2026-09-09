import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ui/ProductCard';
import { SEO } from '../components/common/SEO';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { subscribeProductSync } from '../services/productSyncService';
import { IProduct, ICategory } from '../interfaces';
import { ArrowRight, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const loadHomeData = () => {
    productService.getFeaturedProducts().then((res) => setFeaturedProducts(res.data));
    categoryService.getCategories().then((res) => setCategories(res.data));
  };

  useEffect(() => {
    loadHomeData();

    const unsubscribe = subscribeProductSync(() => {
      loadHomeData();
    });

    return () => {
      unsubscribe();
    };
  }, []);



  const heroSlides = [
    {
      id: 1,
      badge: '✨ Curated Kanchi Spiritual Arts',
      title: 'Bring home divine blessings',
      description: 'A wide range of temple-quality Handcrafted Brass Idols, pure Puja Items, Certified Rudrakshas, Sacred Books, and traditional Kanchipuram Silk Offerings.',
      ctaText: 'Shop Now',
      link: '/products',
      image: '/images/products/brass_ganesha_idol.jpg',
      alt: 'Handcrafted Antique Brass Ganesha Idol in Ornate Gold Frame'
    },
    {
      id: 2,
      badge: '🌸 Authentic Panchaloha & Brass Masterpieces',
      title: 'Sacred idols & temple sculptures',
      description: 'Handcrafted 5-metal Panchaloha & heavy solid brass idols of Lord Ganesha, Radha Krishna, Nataraja Shiva, and Kanchi Kamakshi Amman.',
      ctaText: 'Explore Idols',
      link: '/products?category=Idols',
      image: '/images/products/radha_krishna_idol.jpg',
      alt: 'Sacred Handcrafted Brass Idols'
    },
    {
      id: 3,
      badge: '🪔 Complete Puja Samagri & Thali Kits',
      title: 'Pure brass puja kits & akhand diyas',
      description: 'Complete 9-piece brass puja thalis, windproof borosilicate glass Akhand Diyas, Bhimseni camphor, and temple-grade Chandan paste.',
      ctaText: 'View Puja Kits',
      link: '/products?category=Puja%20Samagri',
      image: '/images/products/puja_thali_set.jpg',
      alt: 'Premium Pure Brass Puja Thali Set'
    },
    {
      id: 4,
      badge: '📜 Lab-Certified Nepal Beads',
      title: 'Certified Himalayan Rudraksha malas',
      description: 'Government lab-certified authentic Nepal Rudraksha beads & 108-bead Japa Malas for spiritual peace, focus, and divine protection.',
      ctaText: 'Get Certified Malas',
      link: '/products?category=Rudraksha',
      image: '/images/products/5_mukhi_rudraksha_mala.jpg',
      alt: '5 Mukhi Certified Himalayan Rudraksha Mala'
    },
    {
      id: 5,
      badge: '🎶 High-Fidelity Vedic Audio & Music',
      title: 'Sacred Vedic chants & temple music',
      description: 'High-fidelity audio recordings of Sri Rudram, Chamakam, Bhagavad Gita, and traditional Nadaswaram played by Vedic scholars.',
      ctaText: 'Listen Now',
      link: '/products?category=Music',
      image: '/images/products/vedic_chants_album.jpg',
      alt: 'Sacred Vedic Chants Audio Album'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }, [heroSlides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const festivalOffers = [
    { title: 'Akshaya Tritiya', offer: 'Upto 30% Off', bg: 'from-[#F8F5F0] to-[#EAE1D0]', img: '/images/products/puja_thali_set.jpg' },
    { title: 'Ram Navami', offer: 'Special Offer', bg: 'from-[#FAF2E4] to-[#EAE1D0]', img: '/images/products/valmiki_ramayana_set.jpg' },
    { title: 'Hanuman Jayanti', offer: 'Upto 30% Off', bg: 'from-[#F8F5F0] to-[#EAE1D0]', img: '/images/products/14_mukhi_rudraksha.jpg' },
  ];

  return (
    <div className="space-y-12 w-full">
      <SEO title="The Kanchi Shrine - Bring Home Divine Blessings" />

      {/* Main Promotional Carousel/Slideshow matching Prototype Design & Theme */}
      <div 
        className="relative rounded-[32px] bg-gradient-to-r from-[#FBF8F2] via-[#F6F0E5] to-[#EFE5D5] text-[#33271F] overflow-hidden shadow-md border border-[#DECDB3]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides Track */}
        <div className="relative min-h-[440px] sm:min-h-[480px] lg:min-h-[520px]">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 p-8 sm:p-12 lg:p-[5.5em] flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Left Text Content */}
              <div className="max-w-xl z-10 space-y-5">
                {/* Curated Badge */}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold bg-[#7D5220] text-[#FAF6F0] shadow-xs">
                  {slide.badge}
                </span>
                
                {/* Main Title - Sentence Case, Balanced Font Size & Rich Divine Color */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight leading-[1.2] text-[#4A1517]">
                  {slide.title}
                </h1>

                {/* Description Paragraph */}
                <p className="text-sm sm:text-base font-sans text-[#33271F] leading-relaxed max-w-xl font-normal">
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => navigate(slide.link)}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#C2944A] via-[#A87936] to-[#825921] text-[#1F140C] font-serif font-extrabold text-sm shadow-md shadow-[#825921]/25 hover:brightness-105 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 border border-[#825921]/40"
                  >
                    {slide.ctaText} <ArrowRight className="w-4 h-4 text-[#1F140C]" />
                  </button>
                </div>
              </div>

              {/* Right Side - Ornate Gold Framed Artwork */}
              <div className="relative z-10 shrink-0 w-72 sm:w-80 lg:w-[380px] flex items-center justify-center">
                <div className="relative p-2 rounded-2xl bg-gradient-to-b from-[#E0C078] via-[#B88B4A] to-[#8C6228] shadow-2xl border-4 border-[#C59B34]">
                  <div className="p-1 rounded-xl bg-[#2A050A] border-2 border-[#E0C078]/80 overflow-hidden shadow-inner">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-[280px] sm:h-[320px] lg:h-[360px] object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/ganesha_idol.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#7D5220]/80 hover:bg-[#8C6228] text-white shadow-lg border border-[#DECDB3]/60 backdrop-blur-xs transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#7D5220]/80 hover:bg-[#8C6228] text-white shadow-lg border border-[#DECDB3]/60 backdrop-blur-xs transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Pagination Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-7 h-2.5 rounded-full bg-[#825921]'
                  : 'w-2.5 h-2.5 rounded-full bg-[#825921]/30 hover:bg-[#825921]/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* SHOP BY CATEGORY Section matching Prototype Screenshot */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#EAE1D0]">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#2C1E16]">
              Shop by category
            </h2>
            <p className="text-xs font-sans text-[#6E584B] mt-0.5">Explore authentic spiritual collection</p>
          </div>
          <Link to="/categories" className="text-xs font-serif font-bold text-[#2C1E16] hover:text-[#9B6E28] flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 15 Category Cards with Temple Arch Tops */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.slug || cat.name)}`}
              className="group flex flex-col rounded-2xl border border-[#EAE1D0] bg-[#F8F5F0] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 hover:border-[#9B6E28] transition-all"
            >
              {/* Ornate Temple Mandap Arch Top */}
              <div className="w-full flex items-center justify-center pt-2 pb-1 bg-[#FAF6EE] border-b border-[#EAE1D0]/60">
                <svg className="w-10 h-3 text-[#9B6E28]/60 group-hover:text-[#9B6E28] transition-colors" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 30 C 30 10, 40 0, 50 0 C 60 0, 70 10, 100 30 Z" fill="currentColor" fillOpacity="0.2" />
                  <path d="M10 30 C 35 15, 45 5, 50 5 C 55 5, 65 15, 90 30" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </svg>
              </div>

              {/* Image Container */}
              <div className="w-full h-28 sm:h-32 overflow-hidden bg-white relative">
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

              {/* Category Title Pill Box */}
              <div className="p-2.5 bg-[#F8F5F0] text-center border-t border-[#EAE1D0]">
                <h4 className="font-serif font-bold text-xs text-[#2C1E16] group-hover:text-[#7A1F1E] transition-colors truncate tracking-wide">
                  {cat.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Festival Offers Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE1D0] pb-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1E16] tracking-wide flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#9B6E28]" /> Festival offers
          </h2>
          <Link to="/products" className="text-xs font-serif font-bold text-[#9B6E28] hover:underline">View all &gt;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festivalOffers.map((fest, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/products')}
              className={`cursor-pointer rounded-2xl bg-gradient-to-r ${fest.bg} text-[#2C1E16] p-6 flex items-center justify-between border border-[#EAE1D0] shadow-xs hover:border-[#9B6E28] hover:scale-[1.02] transition-transform`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-serif font-black tracking-wide text-[#7A1F1E]">Special festival offer</span>
                <h3 className="font-serif text-xl font-bold text-[#2C1E16]">{fest.title}</h3>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-sans font-bold bg-[#9B6E28] text-white">
                  {fest.offer}
                </span>
              </div>
              <img src={fest.img} alt={fest.title} className="w-20 h-20 object-cover rounded-xl border border-[#EAE1D0] shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE1D0] pb-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#2C1E16]">
              Divine idols &amp; sacred puja kits
            </h2>
            <p className="text-xs text-[#6E584B] mt-0.5">Top rated authentic handcrafted spiritual collection</p>
          </div>
          <Link to="/products" className="text-xs font-serif font-bold text-[#9B6E28] hover:underline flex items-center gap-1">
            Shop all idols <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};
