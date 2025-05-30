import { loadScript } from "@/lib/utils";

export interface RazorpayOptions {
  key: string;
  amount: number; // in smallest currency unit (paise for INR)
  currency: string;
  name: string;
  description?: string;
  orderId: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializeRazorpay = async (): Promise<boolean> => {
  return await loadScript("https://checkout.razorpay.com/v1/checkout.js");
};

export const openRazorpayCheckout = async (options: RazorpayOptions): Promise<any> => {
  const res = await initializeRazorpay();
  
  if (!res) {
    alert("Razorpay SDK failed to load. Please check your internet connection.");
    return;
  }

  return new Promise((resolve, reject) => {
    const razorpay = new window.Razorpay({
      ...options,
      handler: (response: any) => {
        resolve(response);
      },
    });
    
    razorpay.on("payment.failed", (response: any) => {
      reject(response.error);
    });
    
    razorpay.open();
  });
};