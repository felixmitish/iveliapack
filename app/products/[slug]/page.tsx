"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/data/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const product = products.find((p) => p.slug === params.slug);

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );
  const [cartQuantity, setCartQuantity] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [showQuantityWarning, setShowQuantityWarning] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  useEffect(() => {
    const saved = localStorage.getItem("ivelia-cart");
    const cart = saved ? JSON.parse(saved) : [];

    const existing = cart.find(
      (item: any) => item.name === product.name && item.color === selectedColor,
    );

    setCartQuantity(existing?.quantity || 0);
  }, [product, selectedColor]);

  const addToCart = () => {
    setShowQuantityWarning(false);
    if (selectedQuantity <= 0) {
      setShowQuantityWarning(true);
      return;
    }
    const saved = localStorage.getItem("ivelia-cart");
    const cart = saved ? JSON.parse(saved) : [];

    const existing = cart.find(
      (item: any) => item.name === product.name && item.color === selectedColor,
    );

    let updated;

    if (existing) {
      updated = cart.map((item: any) =>
        item.name === product.name && item.color === selectedColor
          ? { ...item, quantity: item.quantity + selectedQuantity }
          : item,
      );
    } else {
      updated = [
        ...cart,
        {
          cartId: `${product.slug}-${selectedColor}`,
          ...product,
          color: selectedColor,
          quantity: selectedQuantity,
        },
      ];
    }

    console.log("Cart updated:", updated);
    localStorage.setItem("ivelia-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setCartQuantity(
      updated.find(
        (item: any) =>
          item.name === product.name && item.color === selectedColor,
      )?.quantity || 0,
    );
    setSelectedQuantity(0);
  };

  const removeOneFromCart = () => {
    setSelectedQuantity((q) => Math.max(0, q - 1));
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-neutral-900">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div className="relative h-[600px] overflow-hidden rounded-3xl border border-neutral-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            IVELIA PACK
          </p>

          <h1 className="mt-4 text-5xl font-light text-neutral-900">
            {product.name}
          </h1>

          <p className="mt-6 text-lg text-neutral-800">{product.description}</p>

          <div className="mt-8">
            <h3 className="mb-3 text-sm uppercase tracking-wider text-neutral-500">
              Available Colours
            </h3>

            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full px-4 py-2 text-sm border ${selectedColor === color ? "bg-black text-white border-black" : "border-neutral-300"}`}
                >
                  {color}
                </button>
              ))}
            </div>

            <p className="mt-4 text-sm text-neutral-500">
              Selected colour: {selectedColor}
            </p>
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <div className="mb-6 text-3xl font-light text-neutral-900">
              €{product.price}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={addToCart}
                className="rounded-full bg-black px-8 py-4 text-white hover:opacity-90"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  if (selectedQuantity > 0) {
                    addToCart();
                    router.push("/cart");
                  } else {
                    setShowQuantityWarning(true);
                  }
                }}
                className={`rounded-full px-8 py-4 ${
                  showQuantityWarning
                    ? "border border-red-500 text-red-500"
                    : "border border-neutral-300"
                }`}
              >
                {showQuantityWarning ? "Select Quantity First" : "Buy Now"}
              </button>

              <div className="flex items-center gap-3 rounded-full border border-neutral-300 px-4 py-2 font-medium">
                <button onClick={removeOneFromCart}>−</button>
                <span className="min-w-8 text-center font-medium">
                  {selectedQuantity}
                </span>
                <button
                  onClick={() => {
                    setShowQuantityWarning(false);
                    setSelectedQuantity((q) => q + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 text-sm text-neutral-700">
              <p>✓ Professional florist quality</p>
              <p>✓ Fast delivery across Europe</p>
              <p>✓ Suitable for bouquets and gift packaging</p>
            </div>

            <div className="mt-8">
              <Link href="/cart" className="underline">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
