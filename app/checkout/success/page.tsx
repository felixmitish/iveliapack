"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    localStorage.removeItem("ivelia-cart");
    window.dispatchEvent(new Event("storage"));
  }, []);
  return (
    <main className="min-h-screen bg-white px-6 py-12 flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <div className="mb-6 text-6xl">✅</div>

        <h1 className="text-5xl font-light mb-6">Thank You For Your Order</h1>

        <p className="text-lg text-neutral-600 mb-8">
          Your payment has been successfully received. We will prepare your
          order and contact you if any additional information is required.
        </p>

        <div className="rounded-3xl border border-neutral-200 p-6 mb-8 text-left">
          <h2 className="text-xl font-medium mb-4">What happens next?</h2>

          <ul className="space-y-3 text-neutral-600">
            <li>✓ Payment confirmed</li>
            <li>✓ Order received by IVELIA PACK</li>
            <li>✓ Order preparation and packaging</li>
            <li>✓ Shipping confirmation by email</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/" className="rounded-full bg-black px-8 py-3 text-white">
            Continue Shopping
          </Link>

          <Link
            href="/cart"
            className="rounded-full border border-neutral-300 px-8 py-3"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  );
}
