import React, { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { prefetchProduct } from "../../utils/prefetchUtils";
import { FaArrowRight } from "react-icons/fa";

// ── Context (unchanged logic) ──────────────────────────────────
const ProductSelectionContext = createContext();

export const ProductSelectionProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  };

  return (
    <ProductSelectionContext.Provider value={{ selectedProducts, toggleProduct }}>
      {children}
    </ProductSelectionContext.Provider>
  );
};

export const useProductSelection = () => {
  const context = useContext(ProductSelectionContext);
  if (!context) return { selectedProducts: new Set(), toggleProduct: () => {} };
  return context;
};

// ── ProductCard ────────────────────────────────────────────────
const ProductCard = ({ data, disableSelection = false, size = "default" }) => {
  const { selectedProducts, toggleProduct } = useProductSelection();
  const [hovered, setHovered] = useState(false);

  const isSelected  = selectedProducts.has(data?._id);
  const isCompact   = size === "compact";
  const hasImage    = !!data?.images?.[0]?.url;
  const initial     = data?.name?.charAt(0)?.toUpperCase() || "P";

  const handleMouseEnter = () => {
    setHovered(true);
    if (data?.slug) prefetchProduct(data.slug);
  };
  const handleMouseLeave = () => setHovered(false);
  const handleMouseDown  = () => { if (data?.slug) prefetchProduct(data.slug, true); };

  const handleProductClick = (e) => {
    if (!disableSelection && !e.target.closest("a")) {
      e.preventDefault();
      e.stopPropagation();
      if (data?._id) toggleProduct(data._id);
    }
  };

  // ── Card inner ───────────────────────────────────────────────
  const cardContent = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-white flex flex-col w-full overflow-hidden transition-all duration-300 cursor-pointer
        ${isCompact ? 'rounded-2xl' : 'rounded-3xl'}
        ${isSelected && !disableSelection
          ? 'ring-2 ring-[#AC292A] ring-offset-2 shadow-[0_8px_24px_rgba(172,41,42,0.18)]'
          : 'border border-gray-100 hover:border-[#AC292A]/20 hover:shadow-xl shadow-sm'
        }
      `}
      style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.3s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease, border-color 0.3s ease' }}
    >

      {/* ── Image area ── */}
      <div className={`relative overflow-hidden bg-[#f7f8fc] w-full ${isCompact ? 'aspect-square' : 'aspect-square'}`}>

        {hasImage ? (
          <img
            src={`${BaseUrl}/${data.images[0].url}`}
            alt={data?.name || "Product"}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
          />
        ) : (
          /* Placeholder */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#192133] to-[#2e3f62]">
            <span className={`font-black text-white/20 select-none ${isCompact ? 'text-4xl' : 'text-6xl'}`}>
              {initial}
            </span>
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#192133]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        {/* Top accent bar sweep */}
        <div className={`absolute top-0 left-0 h-0.5 bg-[#AC292A] transition-all duration-500 ${hovered || isSelected ? 'w-full' : 'w-0'}`} />

        {/* Selected checkmark badge */}
        {isSelected && !disableSelection && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#AC292A] flex items-center justify-center shadow-lg z-10">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {/* "View Details" hover pill — only for disableSelection (link mode) */}
        {disableSelection && (
          <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#AC292A] text-white text-[10px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
              View Details <FaArrowRight size={8} />
            </span>
          </div>
        )}

        {/* Selection mode — "tap to select" hint */}
        {!disableSelection && !isSelected && (
          <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#192133]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
              Click to Select
            </span>
          </div>
        )}
      </div>

      {/* ── Card footer ── */}
      <div className={`flex flex-col gap-2 ${isCompact ? 'px-3 py-3' : 'px-4 py-4'}`}>
        {/* Animated underbar */}
        <div className={`h-0.5 rounded-full bg-[#AC292A] transition-all duration-400 ${hovered || isSelected ? (isCompact ? 'w-6' : 'w-8') : 'w-2'}`} />

        {/* Product name */}
        <p className={`font-bold text-[#192133] leading-snug line-clamp-2 transition-colors duration-200 ${
          isCompact ? 'text-xs' : 'text-sm'
        } ${hovered ? 'text-[#AC292A]' : ''}`}>
          {data?.name || "Product Name"}
        </p>

        {/* Category tag if available */}
        {data?.category?.title && (
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
            {data.category.title}
          </span>
        )}
      </div>

    </div>
  );

  // ── Render with or without link wrapper ──────────────────────
  return disableSelection ? (
    <Link
      to={`/product/${data?.slug}`}
      state={{ productSlug: data._id }}
      onMouseDown={handleMouseDown}
      className="block w-full no-underline"
    >
      {cardContent}
    </Link>
  ) : (
    <div onClick={handleProductClick} className="w-full">
      <Link
        to={`/product/${data?.slug}`}
        state={{ productSlug: data._id }}
        onMouseDown={handleMouseDown}
        className="block w-full no-underline"
        onClick={(e) => e.stopPropagation()}
      >
        {cardContent}
      </Link>
    </div>
  );
};

export default ProductCard;