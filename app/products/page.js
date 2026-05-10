import products from "@/data/products.json";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#fff5e8] p-10">
      <div className="grid md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-5 rounded-3xl shadow-lg"
          >
            <img
              src={product.image}
              className="w-28 h-28 object-cover mx-auto rounded-xl"
            />

            <h2 className="text-xl font-bold text-black text-center mt-4">
              {product.name}
            </h2>

            <p className="text-center text-orange-500 font-bold mt-2">
              ${product.price}
            </p>

            <Link
              href={`/products/${product.id}`}
              className="block text-center mt-4 bg-orange-500 text-white py-3 rounded-xl font-bold"
            >
              View Details
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}