import React, { useState, useEffect } from 'react';
import { MdClose, MdFilterList } from 'react-icons/md';
import Banner from '../../components/common/Banner';
import ProductCard, { ProductSelectionProvider } from '../../components/common/ProductCard';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import Button from '../../components/common/Button';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(12);
  
  // Filter states
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  
  // Get filter values from URL params
  const selectedBrandId = searchParams.get('brandId');
  const selectedCategoryId = searchParams.get('categoryId');

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/brands/getAll?all=true`);
        if (response?.data?.status === 'success' && response?.data?.data) {
          setBrands(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/category/getAll?page=1&perPage=100`);
        if (response?.data?.status === 'success' && response?.data?.data) {
          setCategories(response.data.data);
        }
        setLoadingFilters(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingFilters(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async (page = 1, loadMore = false) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let url = `${BaseUrl}/products/getAll?page=${page}&perPage=${perPage}`;
      
      // Add brand filter if selected
      if (selectedBrandId) {
        url += `&brandId=${selectedBrandId}`;
      }
      
      // Add category filter if selected
      if (selectedCategoryId) {
        url += `&categoryId=${selectedCategoryId}`;
      }

      const response = await axios.get(url);
      
      if (response?.data?.status === 'success' && response?.data?.data) {
        if (loadMore) {
          setProducts(prev => [...prev, ...response.data.data]);
        } else {
          setProducts(response.data.data);
        }
        setCurrentPage(response?.data?.pagination?.page || page);
        setTotalPages(response?.data?.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch products when filters or page changes
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    fetchProducts(1);
  }, [selectedBrandId, selectedCategoryId]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1, true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle filter changes
  const handleBrandChange = (brandId) => {
    const params = new URLSearchParams(searchParams);
    if (brandId === selectedBrandId) {
      params.delete('brandId');
    } else {
      params.set('brandId', brandId);
    }
    // Reset to page 1 when filter changes
    params.delete('page');
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === selectedCategoryId) {
      params.delete('categoryId');
    } else {
      params.set('categoryId', categoryId);
    }
    // Reset to page 1 when filter changes
    params.delete('page');
    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <>
      <Banner title={'Catalogue'} subTitle={'Catalogue'} />

      <div className="container md:px-5 px-3 mx-auto pb-10 pt-10">
        <div className="flex sm:flex-row flex-col pt-4 gap-6">
          
          {/* Left Sidebar - Filters */}
          <div className="sm:w-1/4 w-full">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdFilterList className="text-[#EE334B]" />
                  Filters
                </h3>
                {(selectedBrandId || selectedCategoryId) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#EE334B] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Brands Filter */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-700 mb-3">Brands</h4>
                {loadingFilters ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : brands.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {brands.map((brand) => (
                      <label
                        key={brand._id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrandId === brand._id}
                          onChange={() => handleBrandChange(brand._id)}
                          className="w-4 h-4 text-[#EE334B] focus:ring-[#EE334B] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No brands available</p>
                )}
              </div>

              {/* Categories Filter */}
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-3">Categories</h4>
                {loadingFilters ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : categories.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategoryId === category._id}
                          onChange={() => handleCategoryChange(category._id)}
                          className="w-4 h-4 text-[#EE334B] focus:ring-[#EE334B] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{category.title || category.name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No categories available</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Products Grid */}
          <div className="sm:w-3/4 w-full">
            {/* Active Filters Display */}
            {(selectedBrandId || selectedCategoryId) && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedBrandId && (
                  <span className="px-3 py-1 bg-[#EE334B]/10 text-[#EE334B] rounded-full text-sm flex items-center gap-2">
                    {brands.find(b => b._id === selectedBrandId)?.name || 'Brand'}
                    <button
                      onClick={() => handleBrandChange(selectedBrandId)}
                      className="hover:text-[#EE334B]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedCategoryId && (
                  <span className="px-3 py-1 bg-[#EE334B]/10 text-[#EE334B] rounded-full text-sm flex items-center gap-2">
                    {categories.find(c => c._id === selectedCategoryId)?.title || categories.find(c => c._id === selectedCategoryId)?.name || 'Category'}
                    <button
                      onClick={() => handleCategoryChange(selectedCategoryId)}
                      className="hover:text-[#EE334B]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {loading && products.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#EE334B]"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
                {(selectedBrandId || selectedCategoryId) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[#EE334B] hover:underline"
                  >
                    Clear filters to see all products
                  </button>
                )}
              </div>
            ) : (
              <ProductSelectionProvider>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {products.map((item, index) => (
                    <ProductCard
                      key={item._id || index}
                      data={item}
                      disableSelection={false}
                    />
                  ))}
                </div>
                
                {currentPage < totalPages && (
                  <div className="flex justify-center mt-8">
                    <Button
                      label={loadingMore ? "Loading..." : "Load More"}
                      className="bg-gradient-to-r from-[#213554] to-[#213554]/90 hover:from-[#EE334B] hover:to-[#EE334B]/90 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={handleLoadMore}
                      disabled={loadingMore || loading}
                    />
                  </div>
                )}
              </ProductSelectionProvider>
            )}

            {/* Pagination Section */}
            {totalPages > 1 && (
              <div className="flex justify-end gap-2 items-center p-4 mt-6">
                <button 
                  onClick={handlePrevious}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 text-black bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-4">
                  <p className="font-medium">Page {currentPage} of {totalPages}</p>
                </div>
                <button 
                  onClick={handleNext}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 text-black bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;