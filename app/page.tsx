"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  const categories = [
    {
      title: "Premium Wrapping Paper",
      description: "Elegant papers for gifts, retail and creative packaging.",
    },
    {
      title: "Waterproof Wrap",
      description: "Durable and stylish protection for premium presentations.",
    },
    {
      title: "Ribbons & Finishing",
      description: "The final touch for refined packaging.",
    },
    {
      title: "Gift Boxes",
      description: "Minimalist boxes for luxury products and gifts.",
    },
    {
      title: "Packaging Supplies",
      description: "Professional tools and accessories.",
    },
    {
      title: "New Collection",
      description: "Discover the latest trends in modern packaging.",
    },
  ];

  const products = [
    {
      name: "Soft Pink Wrap",
      image: "/images/WXXL-165-Light-Pink.jpg",
      format: "20cm × 5m Roll",
      price: "€1.00",
    },
    {
      name: "Luxury Black Collection",
      image: "/images/MHSKHBXL-171-Black.jpg",
      format: "40cm × 5m Roll",
      price: "€1.00",
    },
    {
      name: "Red Signature Wrap",
      image: "/images/XRRL-012-Red.jpg",
      format: "60cm × 5m Roll",
      price: "€1.00",
    },
    {
      name: "Lilac Premium Paper",
      image: "/images/WXXL-033-Lilac.jpg",
      format: "80cm × 5m Roll",
      price: "€1.00",
    },
    {
      name: "Classic Kraft Series",
      image: "/images/XXLGZ-2.jpg",
      format: "20 Sheets • 70cm × 70cm",
      price: "€1.00",
    },
    {
      name: "White Matte Collection",
      image: "/images/WXXL-5.jpg",
      format: "20 Sheets • 70cm × 70cm",
      price: "€1.00",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="text-xl font-semibold tracking-[0.35em]">
            IVÉLIA PACK
          </div>

          <nav className="hidden gap-8 text-sm text-neutral-600 md:flex">
            <a href="#">Collections</a>
            <a href="#">Best Sellers</a>
            <a href="#">Wholesale</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Cart (0)</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Premium Packaging Collection
          </p>

          <h1 className="mb-8 text-5xl font-light leading-tight md:text-7xl">
            Elevated Packaging For Modern Brands &amp; Creative Retail.
          </h1>

          <p className="max-w-xl text-lg text-neutral-600">
            Curated wrapping paper, ribbons and premium packaging materials for
            brands, retailers, gift shops and creative professionals.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-black px-8 py-3 text-white">
              Explore Collection
            </button>
            <button className="rounded-full border border-neutral-300 px-8 py-3">
              Wholesale Orders
            </button>
          </div>
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-[40px] border border-neutral-200 bg-neutral-50 shadow-2xl shadow-neutral-200/50">
          <div className="absolute inset-0 z-10 opacity-40 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <mesh rotation={[0.5, 0.5, 0]}>
                <planeGeometry args={[3, 4]} />
                <meshStandardMaterial color="#ffffff" wireframe />
              </mesh>
              <ambientLight intensity={2} />
            </Canvas>
          </div>
          <Image
            src="/images/WXXL-165-Light-Pink.jpg"
            alt="Premium wrapping paper"
            fill
            className="object-cover transition-all duration-1000 hover:scale-110"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <div className="text-3xl font-light">5000+</div>
            <div className="text-neutral-500">Orders Delivered</div>
          </div>
          <div>
            <div className="text-3xl font-light">EU</div>
            <div className="text-neutral-500">Fast Delivery</div>
          </div>
          <div>
            <div className="text-3xl font-light">Premium</div>
            <div className="text-neutral-500">Quality Materials</div>
          </div>
          <div>
            <div className="text-3xl font-light">B2B</div>
            <div className="text-neutral-500">Wholesale Available</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 text-4xl font-light">Collections</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-neutral-200 p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-neutral-300/40"
            >
              <div className="relative mb-6 h-40 overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src="/images/MHSKHBXL-3.jpg"
                  alt={category.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mb-2 text-xl font-medium">{category.title}</h3>
              <p className="text-neutral-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-light">Featured Collection</h2>
          <div className="rounded-full border border-neutral-200 px-4 py-2 text-sm">
            Cart (0)
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-3xl border border-neutral-200 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative mb-5 h-72 overflow-hidden rounded-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <h3 className="text-xl font-medium">{product.name}</h3>
              <p className="mt-2 text-sm text-neutral-500">{product.format}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-medium">{product.price}</span>
                <button className="rounded-full bg-black px-5 py-2 text-sm text-white">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-200 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-neutral-500 md:flex-row md:justify-between">
          <div>IVÉLIA PACK</div>
          <div>© 2026 All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
