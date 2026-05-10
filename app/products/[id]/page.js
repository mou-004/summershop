"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import products from "@/data/products.json";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold text-orange-500 bg-[#fff5e8]">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold text-orange-500 bg-[#fff5e8]">
        Redirecting to login...
      </div>
    );
  }

  const routeId = String(params?.id).trim();

  const product = products.find(
    (item) => String(item.id) === routeId
  );

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-5xl font-bold text-red-500 bg-[#fff5e8]">
        Product Not Found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff5e8] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/products"
          className="inline-block mb-8 bg-white px-5 py-3 rounded-2xl shadow font-bold hover:bg-orange-600 hover:text-white"
        >
          Back Products
        </Link>

        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl p-8">
          {/* Image */}
          <div className="flex justify-center items-center bg-orange-50 rounded-3xl p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-80 h-80 object-cover rounded-3xl"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold text-orange-500 mb-5">
              {product.name}
            </h1>

            <p><b>Brand:</b> {product.brand}</p>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Rating:</b> ⭐ {product.rating}</p>
            <p><b>Stock:</b> {product.stock}</p>
            <p><b>Category:</b> {product.category}</p>

            <p className="mt-4 text-gray-700">
              {product.description}
            </p>

            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}