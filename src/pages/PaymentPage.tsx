import { PaymentForm } from "@/components/PaymentForm";

export default function PaymentPage() {
  const handlePaymentSuccess = (paymentId: string, orderId: string, signature: string) => {
    console.log("Payment successful:", { paymentId, orderId, signature });
    // In a real app, you would verify the payment with your backend here
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment failed:", error);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h1>
      <PaymentForm 
        amount={100000} // ₹1,000.00 (in paise)
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This is a test payment. No actual charges will be made.</p>
        <p className="mt-1">Use any email, phone number, and card details for testing.</p>
      </div>
    </div>
  );
}