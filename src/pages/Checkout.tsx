
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, CheckCircle, Banknote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreditCardForm, { CreditCardFormData } from "@/components/CreditCardForm";
import SearchBar from "@/components/SearchBar";

// Mock saved wallet data - in a real app, this would come from a user profile or API
const mockSavedWallet = {
  walletId: "wallet-123",
  walletType: "Digital Wallet",
  walletName: "My Digital Wallet",
  balance: 1500.00
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { translate, formatPrice } = useLanguage();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardFormData | null>(null);
  const [hasWallet, setHasWallet] = useState(false);

  // Simulate checking if user has wallet
  useEffect(() => {
    // In a real app, this would be an API call or user context check
    // For demo purposes, we'll just set it to true after a short delay
    const timer = setTimeout(() => {
      setHasWallet(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">{translate("emptyCart")}</h1>
          <p className="text-gray-400 mb-8">{translate("addItemsToCheckout")}</p>
          <Button onClick={() => navigate("/category/gaming-pcs")}>
            {translate("continueShopping")}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    if (value === "credit") {
      setShowCreditCardForm(true);
    } else {
      setShowCreditCardForm(false);
    }
  };

  const handleCreditCardSubmit = (data: CreditCardFormData) => {
    setCreditCardInfo(data);
    setShowCreditCardForm(false);
    toast({
      title: translate("cardAdded"),
      description: translate("cardAddedSuccessfully"),
    });
  };

  const handleCheckout = () => {
    if (paymentMethod === "credit" && !creditCardInfo) {
      setShowCreditCardForm(true);
      return;
    }
    setIsCheckoutComplete(true);
  };

  const handleConfirmOrder = () => {
    setIsCheckoutComplete(false);
    setIsOrderConfirmed(true);
    
    clearCart();
    
    toast({
      title: translate("orderPlaced"),
      description: translate("orderConfirmation"),
      duration: 5000,
    });
    
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <Button
            variant="ghost"
            className="flex items-center text-gray-400 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {translate("backToCart")}
          </Button>
          
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">{translate("checkoutTitle")}</h1>
            
            <div className="bg-card rounded-lg border border-gray-800 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold mb-4">{translate("orderSummary")}</h2>
                
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className="mt-1 text-sm text-gray-400">
                            {Object.entries(item.selectedOptions)
                              .filter(([_, value]) => value)
                              .map(([key, value]) => (
                                <div key={key} className="capitalize">
                                  {key}: <span className="text-gray-300">{value}</span>
                                  {item.optionPrices && item.optionPrices[key] > 0 && (
                                    <span className="text-tech-red ml-1">
                                      (+{formatPrice(item.optionPrices[key])})
                                    </span>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                        
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-gray-400">
                            {translate("quantity")}: {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-800">
                <div className="flex justify-between mb-2">
                  <span>{translate("subtotal")}</span>
                  <span>{formatPrice(totalPrice())}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{translate("shipping")}</span>
                  <span>{translate("free")}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-800">
                  <span>{translate("total")}</span>
                  <span>{formatPrice(totalPrice())}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-card rounded-lg border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold mb-4">{translate("paymentMethod")}</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-lg border border-gray-800 p-4 cursor-pointer hover:bg-gray-900 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <label htmlFor="cash" className="flex items-center gap-3 flex-1 cursor-pointer">
                      <Wallet className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">{translate("cashOnDelivery")}</div>
                        <div className="text-sm text-gray-400">{translate("payWhenReceived")}</div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-lg border border-gray-800 p-4 cursor-pointer hover:bg-gray-900 transition-colors">
                    <RadioGroupItem value="bank" id="bank" />
                    <label htmlFor="bank" className="flex items-center gap-3 flex-1 cursor-pointer">
                      <Banknote className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">{translate("bankTransfer")}</div>
                        <div className="text-sm text-gray-400">{translate("payViaTransfer")}</div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-lg border border-gray-800 p-4 cursor-pointer hover:bg-gray-900 transition-colors">
                    <RadioGroupItem value="credit" id="credit" />
                    <label htmlFor="credit" className="flex items-center gap-3 flex-1 cursor-pointer">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">{translate("creditCard")}</div>
                        <div className="text-sm text-gray-400">{translate("secureCardPayment")}</div>
                      </div>
                    </label>
                  </div>
                  
                  {hasWallet && (
                    <div className="flex items-center space-x-2 rounded-lg border border-gray-800 p-4 cursor-pointer hover:bg-gray-900 transition-colors">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <label htmlFor="wallet" className="flex items-center gap-3 flex-1 cursor-pointer">
                        <Wallet className="h-5 w-5 text-tech-blue" />
                        <div>
                          <div className="font-medium">{mockSavedWallet.walletName}</div>
                          <div className="text-sm text-gray-400">
                            {translate("balance")}: {formatPrice(mockSavedWallet.balance)}
                          </div>
                        </div>
                      </label>
                    </div>
                  )}
                </RadioGroup>
              </div>
              
              {paymentMethod === "credit" && (
                <div className="mx-6 my-4">
                  {creditCardInfo ? (
                    <div className="p-4 bg-gray-900 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{translate("savedCard")}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowCreditCardForm(true)}
                          className="text-xs"
                        >
                          {translate("change")}
                        </Button>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-tech-blue" />
                          <span>•••• •••• •••• {creditCardInfo.cardNumber.slice(-4)}</span>
                        </p>
                        <p>{creditCardInfo.cardHolder}</p>
                        <p className="text-gray-400">{creditCardInfo.bankName}</p>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreditCardForm(true)}
                      className="w-full"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      {translate("addCreditCard")}
                    </Button>
                  )}
                </div>
              )}
              
              <div className="p-6">
                <Button 
                  className="w-full bg-tech-blue hover:bg-tech-blue/90" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  {translate("completeOrder")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showCreditCardForm} onOpenChange={setShowCreditCardForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{translate("addCreditCard")}</DialogTitle>
          </DialogHeader>
          <CreditCardForm onSubmit={handleCreditCardSubmit} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isCheckoutComplete} onOpenChange={setIsCheckoutComplete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{translate("confirmOrder")}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-900">
              {paymentMethod === "cash" && <Wallet className="h-5 w-5 text-tech-blue" />}
              {paymentMethod === "bank" && <Banknote className="h-5 w-5 text-tech-blue" />}
              {paymentMethod === "credit" && <CreditCard className="h-5 w-5 text-tech-blue" />}
              {paymentMethod === "wallet" && <Wallet className="h-5 w-5 text-tech-blue" />}
              
              <div>
                <div className="font-medium">
                  {paymentMethod === "cash" && translate("cashOnDelivery")}
                  {paymentMethod === "bank" && translate("bankTransfer")}
                  {paymentMethod === "credit" && translate("creditCard")}
                  {paymentMethod === "wallet" && mockSavedWallet.walletName}
                </div>
                <div className="text-sm text-gray-400">
                  {paymentMethod === "cash" && translate("payWhenReceived")}
                  {paymentMethod === "bank" && translate("payViaTransfer")}
                  {paymentMethod === "credit" && translate("secureCardPayment")}
                  {paymentMethod === "wallet" && `${translate("balance")}: ${formatPrice(mockSavedWallet.balance)}`}
                </div>
              </div>
            </div>
            
            {paymentMethod === "credit" && creditCardInfo && (
              <div className="p-4 rounded-lg bg-gray-900">
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">{translate("cardNumber")}:</span> •••• •••• •••• {creditCardInfo.cardNumber.slice(-4)}</p>
                  <p><span className="text-gray-400">{translate("cardHolder")}:</span> {creditCardInfo.cardHolder}</p>
                  <p><span className="text-gray-400">{translate("bankName")}:</span> {creditCardInfo.bankName}</p>
                </div>
              </div>
            )}
            
            {paymentMethod === "bank" && (
              <div className="p-4 rounded-lg bg-gray-900">
                <h3 className="font-medium mb-2">{translate("bankDetails")}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">{translate("bankName")}:</span> Tech Bank</p>
                  <p><span className="text-gray-400">{translate("accountName")}:</span> TechStore Inc.</p>
                  <p><span className="text-gray-400">{translate("accountNumber")}:</span> 1234 5678 9012 3456</p>
                  <p><span className="text-gray-400">{translate("reference")}:</span> Order #{Math.floor(Math.random() * 10000)}</p>
                </div>
              </div>
            )}
            
            <div className="font-medium">
              {translate("totalAmount")}: {formatPrice(totalPrice())}
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsCheckoutComplete(false)}
            >
              <X className="mr-2 h-4 w-4" />
              {translate("cancel")}
            </Button>
            <Button 
              className="bg-tech-blue hover:bg-tech-blue/90"
              onClick={handleConfirmOrder}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {translate("confirmPayment")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isOrderConfirmed} onOpenChange={setIsOrderConfirmed}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{translate("thankYou")}</h2>
            <p className="text-gray-400 mb-4">{translate("orderSuccess")}</p>
            <p className="text-sm text-gray-400">{translate("redirecting")}</p>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
