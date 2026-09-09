import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { SEO } from '../../../components/common/SEO';
import { formatCurrency } from '../../../utils';
import { orderService } from '../../../services/orderService';
import { addressService } from '../../../services/addressService';
import { razorpayService } from '../../../services/razorpayService';
import { notifyProductSync } from '../../../services/productSyncService';
import { useToast } from '../../../hooks/useToast';
import { IAddress } from '../../../interfaces';
import { 
  CheckCircle, 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  Smartphone, 
  Wallet, 
  Building2, 
  Banknote, 
  Plus, 
  Check, 
  Home as HomeIcon, 
  Briefcase, 
  Loader2,
  BookmarkCheck,
  PackageCheck,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { PaymentMethod } from '../../../enums';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discountAmount, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // Step 1: Address | Step 2: Review Order | Step 3: Payment
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<any>(null);

  // Address List & Form States
  const [savedAddresses, setSavedAddresses] = useState<IAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveForFuture, setSaveForFuture] = useState<boolean>(true);
  const [addressLabel, setAddressLabel] = useState<string>('Home');
  const [isSavingAddress, setIsSavingAddress] = useState<boolean>(false);

  // Address Form Fields
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.UPI);
  const [upiId, setUpiId] = useState('');
  const [upiApp, setUpiApp] = useState<'GPay' | 'PhonePe' | 'Paytm' | 'BHIM' | 'QR'>('GPay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm Wallet');
  const [walletPhone, setWalletPhone] = useState('');

  // Interactive Payment Gateway Auth Modal State
  const [authModalData, setAuthModalData] = useState<{
    isOpen: boolean;
    method: PaymentMethod;
    orderId: string;
    orderNumber: string;
    total: number;
    rzpOrderData: any;
    details: {
      bank: string;
      netbankingUser: string;
      netbankingPassword: string;
      cardMasked: string;
      cardOtp: string;
      upiVpa: string;
      upiPin: string;
      walletName: string;
      walletOtp: string;
    };
  } | null>(null);
  const [isAuthorizingPayment, setIsAuthorizingPayment] = useState<boolean>(false);



  // Fetch saved user addresses on page load
  useEffect(() => {
    addressService
      .getAddresses()
      .then((addresses) => {
        if (addresses && addresses.length > 0) {
          setSavedAddresses(addresses);
          const def = addresses.find((a) => a.isDefault) || addresses[0];
          if (def) {
            setSelectedAddressId(def.id);
            setFullName(def.fullName);
            setStreet(def.street);
            setCity(def.city);
            setState(def.state);
            setZipCode(def.zipCode);
            setPhone(def.phone);
            setAddressLabel(def.label || 'Home');
            setIsAddingNew(false);
          }
        } else {
          setSavedAddresses([]);
          setIsAddingNew(true);
          if (user) {
            setFullName(`${user.firstName || ''} ${user.lastName || ''}`.trim());
            setPhone(user.phone || '');
          }
        }
      })
      .catch(() => {
        setSavedAddresses([]);
        setIsAddingNew(true);
        if (user) {
          setFullName(`${user.firstName || ''} ${user.lastName || ''}`.trim());
          setPhone(user.phone || '');
        }
      });
  }, [user]);

  // Select an existing saved address card
  const handleSelectAddress = (addr: IAddress) => {
    setSelectedAddressId(addr.id);
    setFullName(addr.fullName);
    setStreet(addr.street);
    setCity(addr.city);
    setState(addr.state);
    setZipCode(addr.zipCode);
    setPhone(addr.phone);
    setAddressLabel(addr.label || 'Home');
    setIsAddingNew(false);
  };

  // Click "+ Add New Delivery Address"
  const handleAddNewClick = () => {
    setSelectedAddressId(null);
    setFullName(user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '');
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
    setPhone(user?.phone || '');
    setAddressLabel('Home');
    setIsAddingNew(true);
  };

  // STEP 1 Action: Save Delivery Address & Proceed to STEP 2 (Review Order)
  const handleSaveAddressAndProceedToReview = async () => {
    if (!fullName.trim() || !street.trim() || !city.trim() || !state.trim() || !zipCode.trim() || !phone.trim()) {
      showToast('Please fill in all required delivery address fields.', 'error');
      return;
    }

    if (isAddingNew && saveForFuture) {
      setIsSavingAddress(true);
      try {
        const newAddr = await addressService.addAddress({
          fullName: fullName.trim(),
          phone: phone.trim(),
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          zipCode: zipCode.trim(),
          label: addressLabel || 'Home',
          isDefault: savedAddresses.length === 0,
        });
        setSavedAddresses((prev) => [newAddr, ...prev]);
        setSelectedAddressId(newAddr.id);
        setIsAddingNew(false);
        showToast('New delivery address saved to your profile!', 'success');
      } catch (err) {
        console.warn('Address saved for checkout session:', err);
        showToast('Delivery address saved for this order.', 'info');
      } finally {
        setIsSavingAddress(false);
      }
    } else if (!isAddingNew && selectedAddressId && saveForFuture) {
      setIsSavingAddress(true);
      try {
        const updated = await addressService.updateAddress(selectedAddressId, {
          fullName: fullName.trim(),
          phone: phone.trim(),
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          zipCode: zipCode.trim(),
          label: addressLabel,
        });
        setSavedAddresses((prev) => prev.map((a) => (a.id === selectedAddressId ? updated : a)));
      } catch (err) {
        console.warn('Address updated for checkout session:', err);
      } finally {
        setIsSavingAddress(false);
      }
    }

    // Advance strictly to Step 2: Review Order
    setStep(2);
  };

  // STEP 2 Action: Confirm Review & Proceed to STEP 3 (Payment)
  const handleConfirmReviewAndProceedToPayment = () => {
    if (!fullName.trim() || !street.trim() || !city.trim() || !state.trim() || !zipCode.trim() || !phone.trim()) {
      showToast('Delivery address missing. Please complete the address step.', 'error');
      setStep(1);
      return;
    }
    setStep(3);
  };

  const handleCompleteGatewayAuth = async () => {
    if (!authModalData) return;
    setIsAuthorizingPayment(true);

    try {
      // Simulate bank gateway authentication delay
      await new Promise((res) => setTimeout(res, 1400));

      const mockPayId = `rzp_pay_${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const mockSig = `sig_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

      // Verify signature on backend
      await razorpayService.verifySignature({
        order_id: authModalData.orderId,
        razorpay_order_id: authModalData.rzpOrderData.razorpay_order_id,
        razorpay_payment_id: mockPayId,
        razorpay_signature: mockSig,
      });

      showToast(`Payment authorized! Transaction ID: ${mockPayId}`, 'success');
      clearCart();
      setOrderCompleted({
        id: authModalData.orderId,
        orderNumber: authModalData.orderNumber,
        total: authModalData.total,
        trackingNumber: mockPayId,
      });
      setAuthModalData(null);
    } catch {
      showToast('Payment authorization failed. Please check credentials and try again.', 'error');
    } finally {
      setIsAuthorizingPayment(false);
    }
  };

  // STEP 3 Action: Place Order & Pay
  const handlePlaceOrder = async () => {
    // Validate Payment Options
    if (paymentMethod === PaymentMethod.UPI && upiApp !== 'QR') {
      if (!upiId.trim() || !upiId.includes('@')) {
        showToast('Please enter a valid VPA / UPI ID (e.g. name@upi, 9876543210@paytm or name@okicici).', 'error');
        return;
      }
    } else if (paymentMethod === PaymentMethod.CREDIT_CARD || paymentMethod === PaymentMethod.DEBIT_CARD) {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (cleanCard.length < 13 || !cardExpiry.trim() || !cardCvv.trim()) {
        showToast('Please enter complete Card details (Card Number, Expiry MM/YY, CVV).', 'error');
        return;
      }
    } else if (paymentMethod === PaymentMethod.NET_BANKING) {
      if (!selectedBank) {
        showToast('Please select your Net Banking bank.', 'error');
        return;
      }
    } else if (paymentMethod === PaymentMethod.WALLETS) {
      if (!selectedWallet) {
        showToast('Please select your preferred digital Wallet.', 'error');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // 1. Create order record in backend
      const res = await orderService.createOrder({
        addressId: selectedAddressId && !isAddingNew ? selectedAddressId : undefined,
        fullName,
        phone,
        street,
        city,
        state,
        zipCode,
        paymentMethod,
      });

      notifyProductSync('EDITED');
      const orderData = res.data;


      // 2. Handle Online Payments via Razorpay vs Cash on Delivery
      if (paymentMethod === PaymentMethod.CASH_ON_DELIVERY) {
        showToast('Order placed successfully via Cash on Delivery!', 'success');
        clearCart();
        setOrderCompleted(orderData);
        setIsSubmitting(false);
      } else {
        // Online Payment: Fetch Razorpay Order Token
        const rzpOrderData = await razorpayService.createRazorpayOrder(orderData.id, orderData.total);

        // Launch Interactive Razorpay Gateway Auth Modal
        setAuthModalData({
          isOpen: true,
          method: paymentMethod,
          orderId: orderData.id,
          orderNumber: orderData.orderNumber,
          total: orderData.total,
          rzpOrderData,
          details: {
            bank: selectedBank || 'HDFC Bank',
            netbankingUser: 'rzp_test',
            netbankingPassword: 'password123',
            cardMasked: cardNumber ? `•••• ${cardNumber.replace(/\s+/g, '').slice(-4)}` : '•••• 8912',
            cardOtp: '123456',
            upiVpa: upiId || 'customer@upi',
            upiPin: '1234',
            walletName: selectedWallet || 'Paytm Wallet',
            walletOtp: '123456',
          },
        });
        setIsSubmitting(false);
      }
    } catch (e: any) {
      showToast(e?.response?.data?.detail || 'Failed to place order', 'error');
      setIsSubmitting(false);
    }
  };




  // Step 4: Order Success View
  if (orderCompleted) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-6">
        <SEO title="Order Success" />
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h1>
          <p className="text-xs text-slate-500">Thank you for shopping with DivineKart. Your sacred offerings are being prepared for dispatch.</p>
        </div>

        <div className="p-6 rounded-2xl border border-amber-200 bg-white text-left space-y-3 shadow-sm text-xs">
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500">Order ID:</span>
            <span className="font-extrabold text-[#800020]">{orderCompleted.orderNumber}</span>
          </div>
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500">Tracking Number:</span>
            <span className="font-bold text-slate-900">{orderCompleted.trackingNumber || 'Assigned once shipped'}</span>
          </div>
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500">Delivery Address:</span>
            <span className="font-medium text-slate-800 text-right">{street}, {city}, {state} - {zipCode}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">Total Paid:</span>
            <span className="font-black text-emerald-600 text-sm">{formatCurrency(orderCompleted.total)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(`/account/orders/${orderCompleted.id}`)}
            className="w-full py-3.5 rounded-xl bg-[#800020] text-amber-100 font-bold text-sm shadow hover:bg-[#600018] transition-all"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate('/products')}
            className="w-full py-3.5 rounded-xl border border-amber-300 bg-white text-[#800020] font-bold text-sm hover:bg-amber-50 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title="Checkout" />
      <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

      {/* Step Wizard Bar strictly: Address (1) ➔ Review Order (2) ➔ Payment (3) */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 py-4 border-b border-amber-200 text-xs font-extrabold">
        <button 
          onClick={() => setStep(1)}
          className={`flex items-center gap-2 cursor-pointer ${step >= 1 ? 'text-[#800020]' : 'text-slate-400'}`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? 'bg-[#800020] text-white shadow-xs' : 'bg-slate-200 text-slate-600'}`}>1</span>
          Address
        </button>

        <span className="text-amber-300 font-light">➔</span>

        <button 
          onClick={() => {
            if (fullName && street) setStep(2);
          }}
          disabled={!fullName || !street}
          className={`flex items-center gap-2 ${step >= 2 ? 'text-[#800020] cursor-pointer' : 'text-slate-400 cursor-not-allowed'}`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-[#800020] text-white shadow-xs' : 'bg-slate-200 text-slate-600'}`}>2</span>
          Review Order
        </button>

        <span className="text-amber-300 font-light">➔</span>

        <button 
          disabled={step < 3}
          className={`flex items-center gap-2 ${step === 3 ? 'text-[#800020] cursor-pointer' : 'text-slate-400 cursor-not-allowed'}`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 3 ? 'bg-[#800020] text-white shadow-xs' : 'bg-slate-200 text-slate-600'}`}>3</span>
          Payment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step Views */}
        <div className="lg:col-span-2 space-y-6">

          {/* STEP 1: Address */}
          {step === 1 && (
            <div className="p-6 rounded-2xl border border-amber-200 bg-white space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#800020]" /> Step 1: Select Delivery Address
                </h3>
                {savedAddresses.length > 0 && !isAddingNew && (
                  <button
                    onClick={handleAddNewClick}
                    className="text-xs font-extrabold text-[#800020] hover:text-[#600018] flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 transition-all hover:bg-amber-100"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Address
                  </button>
                )}
              </div>

              {/* No Saved Addresses Banner */}
              {savedAddresses.length === 0 && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[#800020] shrink-0" />
                  <div>
                    <p className="font-bold text-[#800020]">No saved addresses found in your account</p>
                    <p className="text-slate-600">Please enter your shipping address below. It can be saved to your profile for future orders.</p>
                  </div>
                </div>
              )}

              {/* Saved Addresses Selector Cards */}
              {savedAddresses.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      Select Shipping Address ({savedAddresses.length} Saved)
                    </p>
                    {isAddingNew && (
                      <button
                        onClick={() => {
                          if (savedAddresses[0]) handleSelectAddress(savedAddresses[0]);
                        }}
                        className="text-xs font-bold text-[#800020] hover:underline"
                      >
                        ← Back to Saved Addresses
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id && !isAddingNew;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => handleSelectAddress(addr)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 relative ${
                            isSelected
                              ? 'border-[#800020] bg-amber-50/80 ring-2 ring-[#800020]/20 shadow-sm'
                              : 'border-amber-200/80 bg-white hover:bg-amber-50/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded-full border-2 border-[#800020] flex items-center justify-center shrink-0">
                                {isSelected && <span className="w-2 h-2 rounded-full bg-[#800020]" />}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#800020] text-amber-100">
                                {addr.label === 'Work' ? <Briefcase className="w-3 h-3" /> : <HomeIcon className="w-3 h-3" />}
                                {addr.label || 'Home'}
                              </span>
                            </div>
                            {addr.isDefault && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>

                          <div className="text-xs space-y-1">
                            <p className="font-extrabold text-slate-900">{addr.fullName}</p>
                            <p className="text-slate-600 leading-relaxed">{addr.street}, {addr.city}, {addr.state} - {addr.zipCode}</p>
                            <p className="text-[11px] text-slate-500 font-medium pt-1 flex items-center gap-1">
                              <Smartphone className="w-3 h-3 text-[#800020]" /> {addr.phone}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-[#800020] font-extrabold">
                              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Selected for Delivery</span>
                              <span className="text-[10px] text-slate-500 font-normal">Click another to change</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Address Form (For adding new address or modifying address fields) */}
              {(isAddingNew || savedAddresses.length === 0) && (
                <div className="pt-2 space-y-4 border-t border-amber-100">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Enter New Delivery Address
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <Input
                      label="Mobile Phone Number *"
                      placeholder="e.g. 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Street / Door No. & Area *"
                        placeholder="e.g. No 12, Temple Car Street, Gandhi Nagar"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                    <Input
                      label="City *"
                      placeholder="e.g. Kanchipuram"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Input
                      label="State *"
                      placeholder="e.g. Tamil Nadu"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <Input
                      label="Pincode *"
                      placeholder="e.g. 631502"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  {/* Address Type Tag Selector */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-slate-700">Address Label Tag</label>
                    <div className="flex items-center gap-2">
                      {['Home', 'Work', 'Other'].map((lbl) => (
                        <button
                          key={lbl}
                          type="button"
                          onClick={() => setAddressLabel(lbl)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            addressLabel === lbl
                              ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-xs'
                              : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Checkbox: Save Address for Future Orders */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="saveForFuture"
                      checked={saveForFuture}
                      onChange={(e) => setSaveForFuture(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#800020] focus:ring-[#800020] border-amber-300 cursor-pointer"
                    />
                    <label htmlFor="saveForFuture" className="text-xs font-medium text-slate-800 cursor-pointer select-none">
                      <span className="font-bold text-[#800020] flex items-center gap-1 inline-flex">
                        <BookmarkCheck className="w-3.5 h-3.5" /> Save this delivery address to my account profile
                      </span>
                      <br />
                      <span className="text-[11px] text-slate-500">
                        Automatically saves this address in your DivineKart address book for faster future checkouts.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Button: Save Address ➔ Proceed to Step 2 Review Order */}
              <div className="pt-2">
                <button
                  disabled={isSavingAddress}
                  onClick={handleSaveAddressAndProceedToReview}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-amber-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSavingAddress ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving Address...
                    </>
                  ) : (
                    <>
                      {isAddingNew
                        ? 'Save Address & Proceed to Review Order'
                        : 'Use Selected Address & Proceed to Review Order'}{' '}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Review Order (Must occur BEFORE payment step) */}
          {step === 2 && (
            <div className="p-6 rounded-2xl border border-amber-200 bg-white space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-[#800020]" /> Step 2: Review Order Details
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Address Saved
                </span>
              </div>

              {/* Delivery Address Banner */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#800020] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> Saved Delivery Address:
                  </span>
                  <button 
                    onClick={() => setStep(1)} 
                    className="text-[11px] font-extrabold text-[#800020] hover:text-[#600018] underline"
                  >
                    Change Address
                  </button>
                </div>
                <p className="font-bold text-slate-900 pt-1">{fullName} ({phone})</p>
                <p className="text-slate-600">{street}, {city}, {state} - {zipCode}</p>
              </div>

              {/* Order Items Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#800020]" /> Order Items ({items.length}):
                </h4>
                <div className="space-y-3 divide-y divide-amber-100 border border-amber-200/70 rounded-xl p-4 bg-white">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.product.thumbnail || item.product.images?.[0] || '/images/products/brass_ganesha_idol.jpg'} 
                          alt={item.product.name} 
                          className="w-12 h-12 rounded-lg object-cover border border-amber-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/products/brass_ganesha_idol.jpg';
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-900">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-[#800020] text-sm">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Breakdown in Review Step */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-600"><span>Items Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Festive Discount</span><span>-{formatCurrency(discountAmount)}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Shipping</span><span>FREE</span></div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-900 text-sm">
                  <span>Total Amount</span>
                  <span className="text-[#800020]">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Actions: Back to Address OR Confirm Review ➔ Proceed to Step 3 Payment */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setStep(1)} 
                  className="px-6 py-3.5 rounded-xl border border-amber-300 text-slate-700 font-bold text-xs hover:bg-amber-50 transition-all"
                >
                  Back to Address
                </button>
                <button 
                  onClick={handleConfirmReviewAndProceedToPayment} 
                  className="flex-1 py-3.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-amber-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Confirm Order &amp; Proceed to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Options (Only unlocked AFTER Step 2 Review Order is completed) */}
          {step === 3 && (
            <div className="p-6 rounded-2xl border border-amber-200 bg-white space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#800020]" /> Step 3: Select Payment Method
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Order Reviewed
                </span>
              </div>

              {/* Reviewed Order & Address Summary */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#800020] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Delivering To:
                  </span>
                  <button onClick={() => setStep(2)} className="text-[11px] font-extrabold text-[#800020] underline">
                    Review Order Again
                  </button>
                </div>
                <p className="font-bold text-slate-900">{fullName} ({phone})</p>
                <p className="text-slate-600">{street}, {city}, {state} - {zipCode}</p>
                <p className="text-[11px] font-bold text-[#800020] pt-1">{items.length} item(s) • Total Payable: {formatCurrency(total)}</p>
              </div>

              {/* Available Payment Options */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-700">Choose Payment Method:</p>
                {[
                  { id: PaymentMethod.UPI, label: 'UPI (Google Pay / PhonePe / Paytm / BHIM)', icon: Smartphone },
                  { id: PaymentMethod.CREDIT_CARD, label: 'Credit / Debit Card (Visa / MasterCard / RuPay)', icon: CreditCard },
                  { id: PaymentMethod.NET_BANKING, label: 'Net Banking (SBI / HDFC / ICICI / Axis)', icon: Building2 },
                  { id: PaymentMethod.WALLETS, label: 'Wallets (Paytm / Mobikwik / Amazon Pay)', icon: Wallet },
                  { id: PaymentMethod.CASH_ON_DELIVERY, label: 'Cash on Delivery', icon: Banknote },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <div key={pm.id} className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`w-full p-4 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#800020] ring-2 ring-[#800020]/20 bg-amber-50 text-[#800020]'
                            : 'border-slate-200 text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-[#800020]" />
                          <span>{pm.label}</span>
                        </div>
                        <span className="w-4 h-4 rounded-full border-2 border-[#800020] flex items-center justify-center">
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#800020]" />}
                        </span>
                      </button>

                      {/* Sub-Panel: UPI */}
                      {isSelected && pm.id === PaymentMethod.UPI && (
                        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
                          <div className="space-y-1.5">
                            <label className="font-bold text-slate-800">Select UPI Method:</label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                { id: 'GPay', label: 'Google Pay' },
                                { id: 'PhonePe', label: 'PhonePe' },
                                { id: 'Paytm', label: 'Paytm UPI' },
                                { id: 'BHIM', label: 'BHIM / Other UPI' },
                                { id: 'QR', label: 'Scan QR Code' },
                              ].map((app) => (
                                <button
                                  key={app.id}
                                  type="button"
                                  onClick={() => setUpiApp(app.id as any)}
                                  className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition-all ${
                                    upiApp === app.id
                                      ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-xs'
                                      : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/60'
                                  }`}
                                >
                                  {app.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {upiApp === 'QR' ? (
                            <div className="p-4 rounded-xl bg-white border border-amber-300 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                              <div className="w-28 h-28 bg-slate-900 rounded-xl p-2 flex items-center justify-center shrink-0 shadow-md">
                                <div className="w-full h-full bg-white p-1 rounded-lg flex flex-col items-center justify-center text-[9px] font-mono text-center">
                                  <span className="font-black text-[#800020]">DIVINEKART</span>
                                  <span className="text-[7px] text-slate-500">SCAN TO PAY</span>
                                  <span className="font-bold text-emerald-700 text-[10px] mt-1">{formatCurrency(total)}</span>
                                </div>
                              </div>
                              <div className="space-y-1 text-slate-700">
                                <p className="font-extrabold text-slate-900">Scan QR Code using any UPI App</p>
                                <p className="text-[11px] text-slate-500">Open GPay, PhonePe, Paytm, or BHIM to scan and confirm payment of {formatCurrency(total)}.</p>
                                <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md mt-1">
                                  Instant Verification Enabled
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <label className="font-bold text-slate-800">Enter Virtual Payment Address (VPA / UPI ID) *</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="e.g. 9876543210@paytm or yourname@okicici"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  className="flex-1 p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                                />
                              </div>
                              <p className="text-[11px] text-slate-500">A payment collect request will be sent to your UPI app for {formatCurrency(total)}.</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Sub-Panel: Credit / Debit Card */}
                      {isSelected && (pm.id === PaymentMethod.CREDIT_CARD || pm.id === PaymentMethod.DEBIT_CARD) && (
                        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-3 animate-in fade-in zoom-in-95 duration-150 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800">Card Details:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black px-2 py-0.5 bg-blue-900 text-white rounded">VISA</span>
                              <span className="text-[10px] font-black px-2 py-0.5 bg-red-800 text-white rounded">MasterCard</span>
                              <span className="text-[10px] font-black px-2 py-0.5 bg-orange-700 text-white rounded">RuPay</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Card Number *</label>
                            <input
                              type="text"
                              maxLength={19}
                              placeholder="4532 •••• •••• 8912"
                              value={cardNumber}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                setCardNumber(v);
                              }}
                              className="w-full p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-bold text-slate-700">Expiry Date (MM/YY) *</label>
                              <input
                                type="text"
                                maxLength={5}
                                placeholder="08/28"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-slate-700">CVV / CVC *</label>
                              <input
                                type="password"
                                maxLength={4}
                                placeholder="•••"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="w-full p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Cardholder Name *</label>
                            <input
                              type="text"
                              placeholder="e.g. RAMESH KUMAR"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value.toUpperCase())}
                              className="w-full p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Sub-Panel: Net Banking */}
                      {isSelected && pm.id === PaymentMethod.NET_BANKING && (
                        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-3 animate-in fade-in zoom-in-95 duration-150 text-xs">
                          <label className="font-bold text-slate-800">Select Popular Bank:</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bnk) => (
                              <button
                                key={bnk}
                                type="button"
                                onClick={() => setSelectedBank(bnk)}
                                className={`p-2 rounded-xl border font-bold text-[11px] text-center transition-all ${
                                  selectedBank === bnk
                                    ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-xs'
                                    : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/60'
                                }`}
                              >
                                {bnk}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sub-Panel: Wallets */}
                      {isSelected && pm.id === PaymentMethod.WALLETS && (
                        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-3 animate-in fade-in zoom-in-95 duration-150 text-xs">
                          <label className="font-bold text-slate-800">Select Digital Wallet:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Paytm Wallet', 'PhonePe Wallet', 'Mobikwik', 'Amazon Pay Wallet'].map((wlt) => (
                              <button
                                key={wlt}
                                type="button"
                                onClick={() => setSelectedWallet(wlt)}
                                className={`p-2.5 rounded-xl border font-bold text-xs transition-all ${
                                  selectedWallet === wlt
                                    ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-xs'
                                    : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/60'
                                }`}
                              >
                                {wlt}
                              </button>
                            ))}
                          </div>
                          <div className="space-y-1 pt-1">
                            <label className="font-bold text-slate-700">Wallet Mobile Number:</label>
                            <input
                              type="text"
                              placeholder={phone || 'e.g. 98765 43210'}
                              value={walletPhone}
                              onChange={(e) => setWalletPhone(e.target.value)}
                              className="w-full p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Sub-Panel: Cash on Delivery */}
                      {isSelected && pm.id === PaymentMethod.CASH_ON_DELIVERY && (
                        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1 text-slate-800">
                          <p className="font-extrabold text-[#800020]">Cash on Delivery Selected</p>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            You can pay using Cash or scan a UPI QR code at your doorstep when the delivery partner delivers your order ({formatCurrency(total)}).
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>


              {/* Final Actions */}
              <div className="flex gap-3 pt-4 border-t border-amber-100">
                <button 
                  onClick={() => setStep(2)} 
                  className="px-6 py-3.5 rounded-xl border border-amber-300 text-slate-700 font-bold text-xs hover:bg-amber-50 transition-all"
                >
                  Back to Review Order
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-amber-100 font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Placing Order...
                    </>
                  ) : (
                    `Pay ${formatCurrency(total)} & Place Order`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Payment Summary */}
        <div className="p-6 rounded-2xl border border-amber-200 bg-white shadow-sm h-fit space-y-4">
          <h3 className="text-base font-black text-slate-900 pb-3 border-b border-amber-100">Payment Summary</h3>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span className="font-semibold text-emerald-600">-{formatCurrency(discountAmount)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="font-semibold text-emerald-600">₹0 (FREE)</span></div>
          </div>
          <div className="pt-3 border-t border-amber-200 flex justify-between text-base font-black text-slate-900">
            <span>Total Amount</span>
            <span className="text-[#800020] text-xl">{formatCurrency(total)}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-[11px] text-amber-900 flex items-center gap-2 border border-amber-200">
            <ShieldCheck className="w-5 h-5 text-[#800020] shrink-0" />
            100% Secure DivineKart Payments
          </div>
        </div>
      </div>

      {/* RAZORPAY / BANK GATEWAY AUTHENTICATION MODAL */}
      {authModalData && authModalData.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Gateway Header */}
            <div className="bg-[#800020] text-amber-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400/30">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-sm text-white">Razorpay Secure Gateway</h3>
                  <p className="text-[10px] text-amber-200 font-medium">Merchant: DivineKart - SmartShop</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-amber-200 block uppercase font-bold">Total Payable</span>
                <span className="text-sm font-black text-white">{formatCurrency(authModalData.total)}</span>
              </div>
            </div>

            {/* Modal Body: Custom Authentication per Payment Method */}
            <div className="p-6 space-y-4 text-xs">

              {/* NET BANKING AUTHENTICATION SCREEN */}
              {authModalData.method === PaymentMethod.NET_BANKING && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-blue-900 text-white flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-300" />
                      <span className="font-extrabold text-sm">{authModalData.details.bank} NetBanking</span>
                    </div>
                    <span className="text-[10px] bg-blue-800 px-2 py-0.5 rounded-md font-bold">256-bit SSL</span>
                  </div>

                  <p className="text-slate-600 font-medium">
                    Please log into your <strong>{authModalData.details.bank}</strong> internet banking account to authorize the payment of <strong>{formatCurrency(authModalData.total)}</strong>:
                  </p>

                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-800">NetBanking User ID / Customer ID *</label>
                      <input
                        type="text"
                        value={authModalData.details.netbankingUser}
                        onChange={(e) =>
                          setAuthModalData({
                            ...authModalData,
                            details: { ...authModalData.details, netbankingUser: e.target.value },
                          })
                        }
                        placeholder="Enter Netbanking User ID"
                        className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-800">NetBanking Password *</label>
                      <input
                        type="password"
                        value={authModalData.details.netbankingPassword}
                        onChange={(e) =>
                          setAuthModalData({
                            ...authModalData,
                            details: { ...authModalData.details, netbankingPassword: e.target.value },
                          })
                        }
                        placeholder="••••••••"
                        className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-slate-600 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Sandbox Credentials pre-filled. Enter or update your User ID and Password, then click "Authorize &amp; Pay".
                    </span>
                  </div>
                </div>
              )}

              {/* CREDIT / DEBIT CARD 3D-SECURE OTP SCREEN */}
              {(authModalData.method === PaymentMethod.CREDIT_CARD || authModalData.method === PaymentMethod.DEBIT_CARD) && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-amber-400" />
                      <span className="font-extrabold text-sm">3D-Secure Card Verification</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md font-bold">Verified by Visa / RuPay</span>
                  </div>

                  <p className="text-slate-600">
                    An OTP has been sent to your bank registered mobile number for card <strong>{authModalData.details.cardMasked}</strong>:
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="font-bold text-slate-800">Enter 6-Digit Bank OTP *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={authModalData.details.cardOtp}
                      onChange={(e) =>
                        setAuthModalData({
                          ...authModalData,
                          details: { ...authModalData.details, cardOtp: e.target.value },
                        })
                      }
                      placeholder="123456"
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-center font-mono font-black text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#800020]"
                    />
                    <p className="text-[11px] text-slate-400 text-center">Sandbox Test OTP: 123456</p>
                  </div>
                </div>
              )}

              {/* UPI PIN AUTHENTICATION SCREEN */}
              {authModalData.method === PaymentMethod.UPI && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-900 text-white flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-300" />
                      <span className="font-extrabold text-sm">UPI Payment Authorization</span>
                    </div>
                    <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-md font-bold">NPCI UPI</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <p className="text-slate-600">UPI VPA: <strong className="text-slate-900">{authModalData.details.upiVpa}</strong></p>
                    <p className="text-slate-600">Payable Amount: <strong className="text-emerald-800 font-extrabold">{formatCurrency(authModalData.total)}</strong></p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="font-bold text-slate-800">Enter 4 or 6-Digit UPI PIN *</label>
                    <input
                      type="password"
                      maxLength={6}
                      value={authModalData.details.upiPin}
                      onChange={(e) =>
                        setAuthModalData({
                          ...authModalData,
                          details: { ...authModalData.details, upiPin: e.target.value },
                        })
                      }
                      placeholder="••••"
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-center font-mono font-black text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              )}

              {/* WALLETS OTP SCREEN */}
              {authModalData.method === PaymentMethod.WALLETS && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-purple-900 text-white flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-purple-300" />
                      <span className="font-extrabold text-sm">{authModalData.details.walletName} Authorization</span>
                    </div>
                    <span className="text-[10px] bg-purple-800 px-2 py-0.5 rounded-md font-bold">Secure Wallet</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="font-bold text-slate-800">Enter Wallet Mobile OTP *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={authModalData.details.walletOtp}
                      onChange={(e) =>
                        setAuthModalData({
                          ...authModalData,
                          details: { ...authModalData.details, walletOtp: e.target.value },
                        })
                      }
                      placeholder="123456"
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-center font-mono font-black text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>
              )}

              {/* Modal Bottom Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isAuthorizingPayment}
                  onClick={() => {
                    setAuthModalData(null);
                    showToast('Payment cancelled by user.', 'info');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isAuthorizingPayment}
                  onClick={handleCompleteGatewayAuth}
                  className="px-6 py-2.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-amber-100 font-extrabold shadow-md transition-all flex items-center gap-2"
                >
                  {isAuthorizingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Authorizing with Bank...
                    </>
                  ) : (
                    `Authorize & Pay ${formatCurrency(authModalData.total)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

