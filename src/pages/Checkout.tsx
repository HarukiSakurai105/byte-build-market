
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, CheckCircle, Bank, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { translate, formatPrice } = useLanguage();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
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
  };

  const handleCheckout = () => {
    setIsCheckoutComplete(true);
  };

  const handleConfirmOrder = () => {
    setIsCheckoutComplete(false);
    setIsOrderConfirmed(true);
    
    // Clear the cart
    clearCart();
    
    // Show success toast
    toast({
      title: translate("orderPlaced"),
      description: translate("orderConfirmation"),
      duration: 5000,
    });
    
    // Redirect to home after a delay
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Button
          variant="ghost"
          className="mb-8 flex items-center text-gray-400 hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {translate("backToCart")}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order summary */}
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
          
          {/* Payment details */}
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
                      <Bank className="h-5 w-5 text-gray-400" />
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
                </RadioGroup>
              </div>
              
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
      
      <Dialog open={isCheckoutComplete} onOpenChange={setIsCheckoutComplete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{translate("confirmOrder")}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-900">
              {paymentMethod === "cash" && <Wallet className="h-5 w-5 text-tech-blue" />}
              {paymentMethod === "bank" && <Bank className="h-5 w-5 text-tech-blue" />}
              {paymentMethod === "credit" && <CreditCard className="h-5 w-5 text-tech-blue" />}
              
              <div>
                <div className="font-medium">
                  {paymentMethod === "cash" && translate("cashOnDelivery")}
                  {paymentMethod === "bank" && translate("bankTransfer")}
                  {paymentMethod === "credit" && translate("creditCard")}
                </div>
                <div className="text-sm text-gray-400">
                  {paymentMethod === "cash" && translate("payWhenReceived")}
                  {paymentMethod === "bank" && translate("payViaTransfer")}
                  {paymentMethod === "credit" && translate("secureCardPayment")}
                </div>
              </div>
            </div>
            
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
