import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import logo from "../../assets/images/google-logo.png";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { BaseUrl } from '../../utils/BaseUrl';
import { RiShoppingBagLine, RiLockLine, RiArrowLeftLine, RiCheckboxCircleLine } from 'react-icons/ri';
import PageMetadata from '../../components/common/PageMetadata';

const Checkout = () => {
  const { productData: cartItems } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    note: '',
    acceptTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0).toFixed(2) || '0.00';
  };

  const subtotal = cartItems?.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0) || 0;

  const metadata = {
    title: "Checkout - Umbrella Custom Packaging",
    description: "Complete your order - Umbrella Custom Packaging",
    author: "Umbrella Custom Packaging",
    ogUrl: `${BaseUrl}/checkout`,
    ogTitle: "Checkout - Umbrella Custom Packaging",
    modifiedTime: "2025-06-13T15:18:43+00:00",
    twitterTitle: "Checkout - Umbrella Custom Packaging",
    robots: "index, follow"
  };

  // Redirect to cart if empty
  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <PageMetadata {...metadata} />
        <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 flex items-center justify-center">
                <RiShoppingBagLine className="w-12 h-12 text-[#213554]/40" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#213554] mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Please add items to your cart before checkout.</p>
            <Link 
              to="/cart" 
              className="inline-flex items-center gap-2 bg-[#EE334B] hover:bg-[#EE334B]/90 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <RiArrowLeftLine className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      setIsProcessing(false);
      return;
    }

    const checkoutPayload = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
      companyName: formData.companyName,
      note: formData.note,
      delivery: {
        country: formData.country,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        addressLine1: formData.address1,
        addressLine2: formData.address2
      },
      productIds: cartItems.map(item => item._id),
      totalBill: calculateTotal(),
      userId: localStorage.getItem('userId') || null
    };

    try {
      const response = await fetch('http://localhost:8000/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(checkoutPayload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Could not create checkout');
      }

      toast.success('Order placed successfully!');
      // Redirect to confirmation page or clear cart
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <PageMetadata {...metadata} />
      <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white">
        <div className="sm:max-w-8xl max-w-[95%] mx-auto py-8 sm:py-12 px-4">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/cart" 
              className="inline-flex items-center gap-2 text-[#213554] hover:text-[#EE334B] font-medium mb-4 transition-colors"
            >
              <RiArrowLeftLine className="w-5 h-5" />
              Back to Cart
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#213554] mb-2 flex items-center gap-3">
              <RiLockLine className="w-8 h-8 text-[#EE334B]" />
              Checkout
            </h1>
            <p className="text-gray-600">Complete your order securely</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Billing Details Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Google Pay Button */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <button 
                    type="button"
                    className="w-full bg-black flex justify-center gap-2 items-center text-white px-4 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                  >
                    Buy with <img src={logo} className="w-5 h-5" alt="Google" /> Pay
                  </button>
                  <div className="flex justify-center items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                  <h4 className="text-xl font-bold text-[#213554] mb-6 flex items-center gap-2">
                    <RiCheckboxCircleLine className="w-6 h-6 text-[#EE334B]" />
                    Billing Details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="md:col-span-1">
                      <Input
                        label={"First Name"}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"First Name"}
                        star={"*"}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Input
                        label={"Last Name"}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"Last Name"}
                        star={"*"}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label={"Company Name (optional)"}
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"Company Name"}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label={"Country / Region"}
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"Select Country"}
                        star={"*"}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label={"Street address"}
                        name="address1"
                        value={formData.address1}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all mb-3"}
                        placeholder={"House number and street name"}
                        star={"*"}
                        required
                      />
                      <Input
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"Apartment, suite, unit, etc. (optional)"}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Input
                        label={"Town / City"}
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"City"}
                        star={"*"}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Input
                        label={"State"}
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"State"}
                        star={"*"}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Input
                        label={"ZIP Code"}
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"ZIP Code"}
                        star={"*"}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Input
                        label={"Phone"}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"Phone"}
                        star={"*"}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label={"Email Address"}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={"bg-white border-2 border-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"}
                        placeholder={"Email Address"}
                        star={"*"}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                  <h4 className="text-lg font-bold text-[#213554] mb-4">Order Notes (Optional)</h4>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full bg-white border-2 border-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-8">
                  <h4 className="text-xl font-bold text-[#213554] mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                    <RiShoppingBagLine className="w-6 h-6 text-[#EE334B]" />
                    Order Summary
                  </h4>

                  <div className="space-y-4 mb-6">
                    {/* Products List */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cartItems?.map((item, index) => (
                        <div key={index} className="flex justify-between items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#213554] line-clamp-2">
                              {item?.title || item?.name || 'Product'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Qty: {item?.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-[#EE334B] whitespace-nowrap">
                            ${((parseFloat(item?.price) || 0) * (parseInt(item?.quantity) || 0)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Subtotal</span>
                        <span className="text-lg font-semibold text-[#213554]">${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t-2 border-[#213554]">
                        <span className="text-lg font-bold text-[#213554]">Total</span>
                        <span className="text-2xl font-bold text-[#EE334B]">${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <p className="font-semibold text-[#213554]">Accepted Payment Methods</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'https://xcustompackaging.com/wp-content/plugins/woocommerce-square/build/images/card-visa.svg',
                          'https://xcustompackaging.com/wp-content/plugins/woocommerce-square/build/images/card-mastercard.svg',
                          'https://xcustompackaging.com/wp-content/plugins/woocommerce-square/build/images/card-amex.svg',
                          'https://xcustompackaging.com/wp-content/plugins/woocommerce-square/build/images/card-discover.svg',
                          'https://xcustompackaging.com/wp-content/plugins/woocommerce-square/build/images/card-dinersclub.svg',
                          'https://xcustompackaging.com/wp-content/plugins/woocommerce-square/build/images/card-jcb.svg',
                          'https://xcustompackaging.com/wp-content/plugins/woocommerce-square/build/images/card-unionpay.svg'
                        ].map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt=""
                            className="w-8 h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PayPal Payment */}
                  <div className="mb-6">
                    <PayPalScriptProvider
                      options={{
                        clientId: "AaiAjek2ug7UzUcX5mP4GKDsJKZaGSbmn0kHFehtED8KW4ANIc3MM_EwgV1upOlK8D7zPe8L_ypWfYmp",
                        currency: "USD",
                        intent: "capture",
                        commit: true,
                        components: "buttons,card-fields", 
                        enableFunding: "card,paylater",
                        disableFunding: "credit,venmo,sepa,bancontact,eps,giropay,ideal,mybank,p24,sofort"
                      }}
                    >
                      <PayPalButtons
                        fundingSource={FUNDING.PAYPAL}
                        style={{
                          layout: "vertical",
                          color: "gold",
                          shape: "rect",
                          label: "checkout",
                          height: 48
                        }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: calculateTotal(),
                                  currency_code: "USD",
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          try {
                            const details = await actions.order.capture();
                            const newCaptureId = details?.purchase_units[0]?.payments?.captures[0]?.id;
                            
                            if (!newCaptureId) {
                              toast.error("No Capture ID received. Please try again.");
                              return;
                            }
                            document.querySelector('form').requestSubmit();
                          } catch (error) {
                            console.error("Error:", error);
                            toast.error("Payment failed. Please try again.");
                          }
                        }}
                        onError={(err) => {
                          console.error("PayPal error:", err);
                          toast.error("An error occurred with PayPal. Please try again.");
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>

                  {/* Privacy Policy */}
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                    <a href="#" className="text-[#EE334B] hover:underline font-medium">privacy policy</a>.
                  </p>

                  {/* Terms Checkbox */}
                  <div className="flex items-start mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <input
                      type="checkbox"
                      id="terms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="mt-1 mr-3 w-5 h-5 text-[#EE334B] border-gray-300 rounded focus:ring-2 focus:ring-[#EE334B] cursor-pointer"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                      I have read and agree to the website{' '}
                      <a href="#" className="text-[#EE334B] hover:underline font-medium">terms and conditions</a>.
                    </label>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    type="submit"
                    label={isProcessing ? 'Processing...' : 'Place Order'}
                    disabled={isProcessing}
                    className={`w-full bg-gradient-to-r from-[#7249A4] to-[#EE334B] hover:from-[#7249A4]/90 hover:to-[#EE334B]/90 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                    size="lg"
                  />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Checkout;