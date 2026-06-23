"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { products } from "@/data/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const product = products.find((p) => p.slug === params.slug);

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCart = () => {
    const saved = localStorage.getItem("ivelia-cart");
    const cart = saved ? JSON.parse(saved) : [];

    const existing = cart.find(
      (item: any) => item.name === product.name && item.color === selectedColor,
    );

    let updated;

    if (existing) {
      updated = cart.map((item: any) =>
        item.name === product.name && item.color === selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updated = [
        ...cart,
        {
          ...product,
          color: selectedColor,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("ivelia-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12">
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

          <h1 className="mt-4 text-5xl font-light">{product.name}</h1>

          <p className="mt-6 text-lg text-neutral-600">{product.description}</p>

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
            <div className="mb-6 text-3xl font-light">€{product.price}</div>

            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="rounded-full bg-black px-8 py-4 text-white hover:opacity-90"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart();
                  router.push("/cart");
                }}
                className="rounded-full border border-neutral-300 px-8 py-4"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-8 text-sm text-neutral-500">
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
