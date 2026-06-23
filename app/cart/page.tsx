"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const saved = localStorage.getItem("ivelia-cart");
      setCartItems(saved ? JSON.parse(saved) : []);
    };

    loadCart();
    window.addEventListener("focus", loadCart);

    return () => window.removeEventListener("focus", loadCart);
  }, []);

  const updateQuantity = (name: string, change: number) => {
    const updated = cartItems
      .map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updated);
    localStorage.setItem("ivelia-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const checkout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to start checkout.");
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-5xl font-light">Shopping Cart</h1>

          <Link
            href="/"
            className="rounded-full border border-neutral-300 px-5 py-2"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-neutral-200 p-8">
            <h2 className="mb-6 text-2xl font-medium">Items</h2>

            {cartItems.length === 0 ? (
              <p className="text-neutral-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.name}-${item.color ?? "default"}`}
                    className="flex items-center gap-6 rounded-2xl border border-neutral-200 p-4"
                  >
                    <div className="relative h-32 w-32 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-medium">{item.name}</h3>

                      {item.color && (
                        <p className="mt-1 text-sm font-medium text-neutral-700">
                          Colour: {item.color}
                        </p>
                      )}

                      <p className="text-neutral-500">{item.description}</p>
                      <p className="mt-2 font-medium">€{item.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="h-10 w-10 rounded-full border border-neutral-300"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className="h-10 w-10 rounded-full border border-neutral-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8 h-fit">
            <h2 className="mb-6 text-2xl font-medium">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>€{total}</span>
              </div>
            </div>

            <button
              onClick={checkout}
              disabled={cartItems.length === 0}
              className="mt-8 w-full rounded-full bg-black px-8 py-3 text-white disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
