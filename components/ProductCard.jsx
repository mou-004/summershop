"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleViewDetails = async () => {
    const detailsUrl = `/products/${product.id}`;

    if (!session?.user) {
      router.push(`/login?callbackURL=${encodeURIComponent(detailsUrl)}`);
      return;
    }

    router.push(detailsUrl);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-[#fff4e6] rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 overflow-hidden border border-orange-100">
      
      {/* SMALL IMAGE */}
      <div className="relative w-full h-36 bg-white overflow-hidden rounded-b-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain p-3 hover:scale-105 duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Brand: {product.brand}
        </p>

        <p className="text-sm text-yellow-500 mt-1">
          ⭐ {product.rating}
        </p>

        <p className="text-2xl font-bold text-orange-500 mt-2">
          ${product.price}
        </p>

        <button
          onClick={handleViewDetails}
          disabled={isPending}
          className="mt-4 w-full block text-center bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-full font-semibold text-sm transition disabled:opacity-60"
        >
          {isPending ? "Loading..." : "View Details"}
        </button>
      </div>
    </div>
  );
}