import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateQuantity } from '../../store/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../utils/BaseUrl';
import PageMetadata from '../../components/common/PageMetadata';
import Button from '../../components/common/Button';
import { RiShoppingCartLine, RiDeleteBin6Line, RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { HiOutlineShoppingBag } from 'react-icons/hi';

const Cart = () => {
  const { productData: cartItems } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems?.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0) || 0;

  const total = subtotal;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }));
    }
  };

  const handleIncreaseQuantity = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const metadata = {
    title: "add to cart - Umbrella Custom Packaging",
    description: "Umbrella Custom Packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/cart`,
    ogTitle: "add to cart - Umbrella Custom Packaging",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "add to cart - Umbrella Custom Packaging",
    robots: "index, follow"
  };

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        {/* <PageMetadata {...metadata} /> */}
        <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 flex items-center justify-center">
                <HiOutlineShoppingBag className="w-12 h-12 text-[#213554]/40" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#213554] mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <RiShoppingCartLine className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMetadata {...metadata} />
      <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white">
        <div className="sm:max-w-8xl max-w-[95%] mx-auto py-8 sm:py-12 px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-2 flex items-center gap-3">
              <RiShoppingCartLine className="w-8 h-8 text-[#EE334B]" />
              Shopping Cart
            </h1>
            <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems?.map((item, index) => (
                <div 
                  key={item._id || index}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-[#213554]/5 to-[#EE334B]/5 border border-gray-100">
                          {item?.image ? (
                            <img
                              src={`${BaseUrl}/${item?.image}`}
                              alt={item?.title || item?.name || 'Product'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <RiShoppingCartLine className="w-8 h-8 text-[#213554]/30" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-[#213554] mb-1 line-clamp-2 group-hover:text-[#EE334B] transition-colors">
                              {item?.title || item?.name || 'Product'}
                            </h3>
                            <p className="text-lg font-semibold text-[#EE334B]">${(parseFloat(item?.price) || 0).toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => dispatch(deleteProduct(item._id))}
                            className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 flex items-center justify-center transition-all duration-200 hover:scale-110"
                            aria-label="Remove item"
                          >
                            <RiDeleteBin6Line className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-4">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
                              disabled={item.quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-[#213554] hover:text-white text-[#213554] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Decrease quantity"
                            >
                              <RiSubtractLine className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item?.quantity}
                              onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                              className="w-16 h-10 text-center border-0 focus:ring-2 focus:ring-[#EE334B] text-[#213554] font-semibold"
                            />
                            <button
                              onClick={() => handleIncreaseQuantity(item._id, item.quantity)}
                              className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-[#213554] hover:text-white text-[#213554] transition-all duration-200"
                              aria-label="Increase quantity"
                            >
                              <RiAddLine className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="ml-auto">
                            <p className="text-lg font-bold text-[#213554]">
                              ${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">Subtotal</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-8">
                <h3 className="text-xl font-bold text-[#213554] mb-6 pb-4 border-b border-gray-200">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Subtotal</span>
                    <span className="text-lg font-semibold text-[#213554]">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-gray-700 font-medium">Shipping</span>
                    <button className="text-[#EE334B] hover:text-[#EE334B]/80 text-sm font-medium flex items-center gap-1 transition-colors">
                      Calculate
                      <span className="text-xs">🚚</span>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t-2 border-[#213554]">
                    <span className="text-lg font-bold text-[#213554]">Total</span>
                    <span className="text-2xl font-bold text-[#EE334B]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  label="Proceed to Checkout"
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-[#7249A4] to-[#EE334B] hover:from-[#7249A4]/90 hover:to-[#EE334B]/90 py-4 rounded-xl shadow-lg hover:shadow-xl"
                  size="lg"
                />

                <Link 
                  to={'/shop'} 
                  className="block w-full mt-4 text-center text-[#213554] hover:text-[#EE334B] font-medium transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
