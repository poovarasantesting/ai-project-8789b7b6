import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openRazorpayCheckout, RazorpayOptions } from "@/lib/razorpay";
import { toast } from "@/components/ui/use-toast";
import { CreditCard } from "lucide-react";

interface PaymentFormProps {
  amount?: number;
  onSuccess?: (paymentId: string, orderId: string, signature: string) => void;
  onError?: (error: any) => void;
}

export function PaymentForm({ amount = 1000, onSuccess, onError }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(amount);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // In a real application, you would get this from your backend
  const createOrderId = async (amount: number): Promise<string> => {
    // Mock implementation - in a real app, this would call your backend
    // which would call Razorpay's create order API
    console.log("Creating order for amount:", amount);
    return `order_${Date.now()}`;
  };

  const handlePayment = async () => {
    if (!name || !email || !phone) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Get order ID from your backend (mocked here)
      const orderId = await createOrderId(paymentAmount);
      
      // Configure Razorpay options
      const options: RazorpayOptions = {
        key: "rzp_test_YOUR_KEY_ID", // Replace with your actual key in production
        amount: paymentAmount, // Amount in paise
        currency: "INR",
        name: "Your Company Name",
        description: "Purchase Description",
        orderId: orderId,
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#3730a3", // Indigo color
        },
      };

      // Open Razorpay checkout
      const response = await openRazorpayCheckout(options);
      
      // Handle success
      toast({
        title: "Payment Successful",
        description: `Payment ID: ${response.razorpay_payment_id}`,
      });
      
      if (onSuccess) {
        onSuccess(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      }
    } catch (error) {
      console.error("Payment failed:", error);
      
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error.message || "Something went wrong with the payment",
      });
      
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
        <CardDescription>Enter your details to complete the payment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            value={paymentAmount / 100} // Convert paise to rupees for display
            onChange={(e) => setPaymentAmount(parseInt(e.target.value) * 100 || 0)}
            placeholder="Amount in rupees"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handlePayment} 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : `Pay ₹${paymentAmount / 100}`}
        </Button>
      </CardFooter>
    </Card>
  );
}