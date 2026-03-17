import React, { useState, useEffect } from 'react';
import { MdClose, MdFilterList, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import Banner from '../../components/common/Banner';
import ProductCard, { ProductSelectionProvider } from '../../components/common/ProductCard';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { useSearchParams } from 'react-router-dom';
import AnnouncementBanner from '../../components/AnnouncementBanner';

// ── Skeleton loader card ───────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-52 bg-gray-100" />
    <div className="p-4 space-y-2">
      <div className="h-3 bg-gray-100 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      <div className="h-8 bg-gray-100 rounded-xl mt-3" />
    </div>
  </div>
);

// ── Filter section heading ─────────────────────────────────────
const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-4 rounded-full bg-[#AC292A]" />
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#192133]">{title}</h4>
    </div>
    {children}
  </div>
);

// ── Filter radio option ────────────────────────────────────────
const FilterOption = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer group hover:bg-[#AC292A]/5 hover:border-[#AC292A]/10 border border-transparent transition-all duration-200">
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
      checked ? 'border-[#AC292A] bg-[#AC292A]' : 'border-gray-200 group-hover:border-[#AC292A]/40'
    }`}>
      {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
    </div>
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <span className={`text-sm transition-colors duration-200 ${checked ? 'text-[#192133] font-semibold' : 'text-gray-500 group-hover:text-[#192133]'}`}>
      {label}
    </span>
  </label>
);

// ── Pagination button ──────────────────────────────────────────
const PaginationBtn = ({ onClick, disabled, children, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-9 h-9 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
      ${active
        ? 'bg-[#AC292A] text-white shadow-[0_4px_12px_rgba(172,41,42,0.30)]'
        : 'bg-white border border-gray-100 text-[#192133] hover:bg-[#192133] hover:text-white hover:border-[#192133]'
      }`}
  >
    {children}
  </button>
);

// ── Main Component ─────────────────────────────────────────────
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [loadingMore, setLoadingMore]   = useState(false);
  const [currentPage, setCurrentPage]   = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [perPage]                       = useState(12);
  const [brands, setBrands]             = useState([]);
  const [categories, setCategories]     = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [sidebarOpen, setSidebarOpen]   = useState(false);

  const selectedBrandId    = searchParams.get('brandId');
  const selectedCategoryId = searchParams.get('categoryId');
  const hasActiveFilters   = !!(selectedBrandId || selectedCategoryId);

  // Fetch brands
  useEffect(() => {
    axios.get(`${BaseUrl}/brands/getAll?all=true`)
      .then(r => { if (r?.data?.status === 'success') setBrands(r.data.data); })
      .catch(console.error);
  }, []);

  // Fetch categories
  useEffect(() => {
    axios.get(`${BaseUrl}/category/getAll?page=1&perPage=100`)
      .then(r => { if (r?.data?.status === 'success') setCategories(r.data.data); })
      .catch(console.error)
      .finally(() => setLoadingFilters(false));
  }, []);

  const fetchProducts = async (page = 1, loadMore = false) => {
    loadMore ? setLoadingMore(true) : setLoading(true);
    try {
      let url = `${BaseUrl}/products/getAll?page=${page}&perPage=${perPage}`;
      if (selectedBrandId)    url += `&brandId=${selectedBrandId}`;
      if (selectedCategoryId) url += `&categoryId=${selectedCategoryId}`;
      const r = await axios.get(url);
      if (r?.data?.status === 'success' && r?.data?.data) {
        loadMore ? setProducts(prev => [...prev, ...r.data.data]) : setProducts(r.data.data);
        setCurrentPage(r?.data?.pagination?.page || page);
        setTotalPages(r?.data?.pagination?.totalPages || 1);
        setTotalProducts(r?.data?.pagination?.totalItems || r.data.data.length);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); setLoadingMore(false); }
  };

  useEffect(() => {
    setProducts([]); setCurrentPage(1); fetchProducts(1);
  }, [selectedBrandId, selectedCategoryId]);

  const handleBrandChange = (id) => {
    const p = new URLSearchParams(searchParams);
    id === selectedBrandId ? p.delete('brandId') : p.set('brandId', id);
    p.delete('page'); setSearchParams(p, { replace: true });
  };

  const handleCategoryChange = (id) => {
    const p = new URLSearchParams(searchParams);
    id === selectedCategoryId ? p.delete('categoryId') : p.set('categoryId', id);
    p.delete('page'); setSearchParams(p, { replace: true });
  };

  const clearFilters = () => setSearchParams({}, { replace: true });

  const goToPage = (page) => {
    fetchProducts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active filter labels
  const activeBrandName    = brands.find(b => b._id === selectedBrandId)?.name;
  const activeCategoryName = categories.find(c => c._id === selectedCategoryId)?.title
    || categories.find(c => c._id === selectedCategoryId)?.name;

  // Sidebar content shared between desktop and mobile
  const SidebarContent = () => (
    <div className="flex flex-col gap-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#AC292A]/10 flex items-center justify-center text-[#AC292A]">
            <MdFilterList size={16} />
          </div>
          <h3 className="text-sm font-bold text-[#192133] uppercase tracking-wide">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-[10px] font-bold uppercase tracking-widest text-[#AC292A] hover:text-[#AC292A]/70 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Brands */}
      <FilterSection title="Brands">
        {loadingFilters ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="h-9 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : brands.length > 0 ? (
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            {brands.map(brand => (
              <FilterOption
                key={brand._id}
                label={brand.name}
                checked={selectedBrandId === brand._id}
                onChange={() => handleBrandChange(brand._id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 pl-2">No brands available</p>
        )}
      </FilterSection>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-5" />

      {/* Categories */}
      <FilterSection title="Categories">
        {loadingFilters ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-9 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : categories.length > 0 ? (
          <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
            {categories.map(cat => (
              <FilterOption
                key={cat._id}
                label={cat.title || cat.name}
                checked={selectedCategoryId === cat._id}
                onChange={() => handleCategoryChange(cat._id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 pl-2">No categories available</p>
        )}
      </FilterSection>
    </div>
  );

  return (
    <>
       <AnnouncementBanner/>
      <Banner title="Catalogue" subTitle="Catalogue" />

      <div className="bg-[#f7f8fc] min-h-screen selection:bg-[#AC292A] selection:text-white">
        <div className="max-w-8xl mx-auto px-4 md:px-8 py-10">

          {/* ── Mobile filter toggle ── */}
          <div className="flex sm:hidden items-center justify-between mb-5">
            <p className="text-sm text-gray-500 font-medium">
              {totalProducts > 0 && <span><strong className="text-[#192133]">{totalProducts}</strong> products</span>}
            </p>
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#192133] text-white text-xs font-bold uppercase tracking-wide"
            >
              <MdFilterList size={14} /> Filters
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-[#AC292A] text-white text-[9px] flex items-center justify-center font-black">
                  {(selectedBrandId ? 1 : 0) + (selectedCategoryId ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* ── Mobile sidebar drawer ── */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex sm:hidden">
              <div className="absolute inset-0 bg-[#192133]/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
              <div className="relative ml-auto w-72 h-full bg-white shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-[#192133] uppercase tracking-wide">Filters</p>
                  <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#AC292A]/10 hover:text-[#AC292A] transition-all">
                    <MdClose size={16} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <SidebarContent />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6">

            {/* ── Desktop sidebar ── */}
            <aside className="hidden sm:block sm:w-64 flex-shrink-0">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sticky top-4">
                <SidebarContent />
              </div>
            </aside>

            {/* ── Products area ── */}
            <div className="flex-1 min-w-0">

              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  {/* Active filter pills */}
                  {hasActiveFilters ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">Active:</span>
                      {activeBrandName && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#192133] text-white text-[11px] font-bold">
                          {activeBrandName}
                          <button onClick={() => handleBrandChange(selectedBrandId)} className="hover:text-[#AC292A] transition-colors ml-0.5">
                            <MdClose size={12} />
                          </button>
                        </span>
                      )}
                      {activeCategoryName && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#192133] text-white text-[11px] font-bold">
                          {activeCategoryName}
                          <button onClick={() => handleCategoryChange(selectedCategoryId)} className="hover:text-[#AC292A] transition-colors ml-0.5">
                            <MdClose size={12} />
                          </button>
                        </span>
                      )}
                      <button onClick={clearFilters} className="text-[11px] text-[#AC292A] font-bold hover:underline underline-offset-2">
                        Clear all
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {!loading && totalProducts > 0 && (
                        <>Showing <strong className="text-[#192133]">{products.length}</strong> of <strong className="text-[#192133]">{totalProducts}</strong> products</>
                      )}
                    </p>
                  )}
                </div>

                {/* Page indicator */}
                {totalPages > 1 && (
                  <span className="text-xs text-gray-400 font-medium">
                    Page <strong className="text-[#192133]">{currentPage}</strong> / {totalPages}
                  </span>
                )}
              </div>

              {/* Loading skeleton */}
              {loading && products.length === 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                  {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : products.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#AC292A]/10 flex items-center justify-center mb-5">
                    <FaSearch size={22} className="text-[#AC292A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#192133] mb-2">No Products Found</h3>
                  <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
                    We couldn't find any products matching your current filters.
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#192133] hover:bg-[#AC292A] text-white text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:shadow-[0_4px_14px_rgba(172,41,42,0.30)]"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <ProductSelectionProvider>
                  {/* Product grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                    {products.map((item, index) => (
                      <ProductCard key={item._id || index} data={item} disableSelection={false} />
                    ))}
                  </div>

                  {/* Load more */}
                  {currentPage < totalPages && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => fetchProducts(currentPage + 1, true)}
                        disabled={loadingMore || loading}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#192133] hover:bg-[#AC292A] text-white text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:shadow-[0_6px_20px_rgba(172,41,42,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingMore ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Loading…
                          </>
                        ) : (
                          'Load More Products'
                        )}
                      </button>
                    </div>
                  )}
                </ProductSelectionProvider>
              )}

              {/* ── Pagination ── */}
              {totalPages > 1 && !loading && (
                <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-gray-100">
                  {/* Prev */}
                  <PaginationBtn onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1 || loading}>
                    <MdChevronLeft size={18} />
                  </PaginationBtn>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .reduce((acc, p, i, arr) => {
                      if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === '...' ? (
                        <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
                      ) : (
                        <PaginationBtn
                          key={p}
                          active={p === currentPage}
                          onClick={() => goToPage(p)}
                          disabled={loading}
                        >
                          {p}
                        </PaginationBtn>
                      )
                    )}

                  {/* Next */}
                  <PaginationBtn onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || loading}>
                    <MdChevronRight size={18} />
                  </PaginationBtn>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;