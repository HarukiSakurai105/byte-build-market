
import { useState } from "react";
import { CreditCard, Building, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CreditCardFormProps {
  onSubmit: (data: CreditCardFormData) => void;
}

export interface CreditCardFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  bankName: string;
}

const CreditCardForm = ({ onSubmit }: CreditCardFormProps) => {
  const { translate } = useLanguage();
  const [focused, setFocused] = useState<string | null>(null);

  const form = useForm<CreditCardFormData>({
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      bankName: "",
    },
  });

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups = [];
    
    for (let i = 0; i < digits.length && i < 16; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    
    return groups.join(" ");
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setValue("cardNumber", formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    form.setValue("expiryDate", formatted);
  };

  const handleSubmit = (data: CreditCardFormData) => {
    onSubmit(data);
  };

  return (
    <div className="rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-tech-blue" />
          {translate("creditCardInformation")}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("cardNumber")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        onChange={handleCardNumberChange}
                        onFocus={() => setFocused("cardNumber")}
                        onBlur={() => setFocused(null)}
                        className={`pl-10 ${focused === "cardNumber" ? "border-tech-blue" : ""}`}
                      />
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("cardHolder")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder={translate("cardHolderPlaceholder")}
                        onFocus={() => setFocused("cardHolder")}
                        onBlur={() => setFocused(null)}
                        className={`pl-10 ${focused === "cardHolder" ? "border-tech-blue" : ""}`}
                      />
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>{translate("expiryDate")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="MM/YY"
                        maxLength={5}
                        onChange={handleExpiryDateChange}
                        onFocus={() => setFocused("expiryDate")}
                        onBlur={() => setFocused(null)}
                        className={focused === "expiryDate" ? "border-tech-blue" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>{translate("cvv")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        onFocus={() => setFocused("cvv")}
                        onBlur={() => setFocused(null)}
                        className={focused === "cvv" ? "border-tech-blue" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>{translate("bankName")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Bank name"
                          onFocus={() => setFocused("bankName")}
                          onBlur={() => setFocused(null)}
                          className={`pl-10 ${focused === "bankName" ? "border-tech-blue" : ""}`}
                        />
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-tech-blue hover:bg-tech-blue/90">
              {translate("saveCardInformation")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreditCardForm;
