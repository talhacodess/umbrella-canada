import React, { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { prefetchProduct } from "../../utils/prefetchUtils";

// Context for product selection
const ProductSelectionContext = createContext();

export const ProductSelectionProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
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
  if (!context) {
    return { selectedProducts: new Set(), toggleProduct: () => {} };
  }
  return context;
};

const ProductCardTwo = ({ data, disableSelection = false, size = "default" }) => {
  const { selectedProducts, toggleProduct } = useProductSelection();
  const isSelected = selectedProducts.has(data?._id);
  const isCompact = size === "compact";

  const handleMouseEnter = () => {
    if (data?.slug) prefetchProduct(data.slug);
  };

  const handleMouseDown = () => {
    if (data?.slug) prefetchProduct(data.slug, true);
  };

  const handleProductClick = (e) => {
    if (!disableSelection && !e.target.closest("a")) {
      e.preventDefault();
      e.stopPropagation();
      if (data?._id) toggleProduct(data._id);
    }
  };

  const cardContent = (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        border: isSelected && !disableSelection
          ? "2px solid #AC292A"
          : "1px solid transparent",
        boxShadow: isSelected && !disableSelection
          ? "0 0 0 3px rgba(172,41,42,0.12)"
          : "0 2px 8px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        cursor: "pointer",
      }}
      className="card-hover-effect"
    >
      {/* Square image area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
          position: "relative",
        }}
      >
        {data?.images?.[0]?.url ? (
          <img
            src={`${BaseUrl}/${data.images[0].url}`}
            alt={data?.name || "Product"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.35s ease",
            }}
            loading="lazy"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #192133 0%, #2e3f62 100%)",
            }}
          >
            <span
              style={{
                fontSize: isCompact ? "32px" : "52px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              {data?.name?.charAt(0) || "P"}
            </span>
          </div>
        )}

        {/* Selected checkmark badge */}
        {isSelected && !disableSelection && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#AC292A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Name label below image */}
      <div
        style={{
          padding: isCompact ? "8px 10px" : "10px 14px",
          backgroundColor: "#ffffff",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: isCompact ? "13px" : "14px",
            fontWeight: "600",
            color: "#192133",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data?.name || "Product Name"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .card-hover-effect:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.13) !important;
          transform: translateY(-3px);
        }
      `}</style>

      {disableSelection ? (
        <Link
          state={{ productSlug: data._id }}
          to={`/product/${data?.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          style={{ display: "block", width: "100%", textDecoration: "none" }}
        >
          {cardContent}
        </Link>
      ) : (
        <div onClick={handleProductClick} style={{ width: "100%" }}>
          <Link
            state={{ productSlug: data._id }}
            to={`/product/${data?.slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            style={{ display: "block", width: "100%", textDecoration: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            {cardContent}
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCardTwo;