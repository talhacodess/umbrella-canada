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

  const isCompact = size === "compact";

  const cardContent = (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: isSelected && !disableSelection
          ? "2px solid #AC292A"
          : "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        boxShadow: isSelected && !disableSelection
          ? "0 0 0 3px rgba(172,41,42,0.15)"
          : "0 1px 4px rgba(25,33,51,0.08)",
      }}
      onMouseEnter={(e) => {
        // e.currentTarget.style.boxShadow = "0 6px 20px rgba(25,33,51,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        // e.currentTarget.style.boxShadow = isSelected && !disableSelection
        //   ? "0 0 0 3px rgba(172,41,42,0.15)"
        //   : "0 1px 4px rgba(25,33,51,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image Area */}
      <div
        style={{
          width: "100%",
          height: isCompact ? "120px" : "190px",
          overflow: "hidden",
          backgroundColor: "#f3f4f6",
          flexShrink: 0,
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
              transition: "transform 0.3s ease",
            }}
            loading="lazy"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
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
              backgroundColor: "#192133",
            }}
          >
            <span
              style={{
                fontSize: isCompact ? "28px" : "40px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "-1px",
              }}
            >
              {data?.name?.charAt(0) || "P"}
            </span>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div
        style={{
          padding: isCompact ? "10px 12px" : "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flexGrow: 1,
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

        {/* Selected indicator */}
        {isSelected && !disableSelection && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "2px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#AC292A",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#AC292A",
                letterSpacing: "0.02em",
              }}
            >
              Selected
            </span>
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          height: "3px",
          backgroundColor: isSelected && !disableSelection ? "#AC292A" : "#192133",
          opacity: isSelected && !disableSelection ? 1 : 0.08,
          transition: "opacity 0.2s ease, background-color 0.2s ease",
          flexShrink: 0,
        }}
      />
    </div>
  );

  return (
    <>
      {disableSelection ? (
        <Link
          state={{ productSlug: data._id }}
          to={`/product/${data?.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          style={{ display: "block", height: "100%", width: "100%", textDecoration: "none" }}
        >
          {cardContent}
        </Link>
      ) : (
        <div
          onClick={handleProductClick}
          style={{ transition: "all 0.2s ease", height: "100%", width: "100%" }}
        >
          <Link
            state={{ productSlug: data._id }}
            to={`/product/${data?.slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            style={{ display: "block", height: "100%", width: "100%", textDecoration: "none" }}
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