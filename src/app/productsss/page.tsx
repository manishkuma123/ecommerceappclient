"use client";

import Link from "next/link";

const products = [
  { id: "1", name: "Product 1", description: "This is a great product." },
  { id: "2", name: "Product 2", description: "This is another great product." },
  { id: "3", name: "Product 3", description: "This is a fantastic product." },
  { id: "4", name: "Product 3", description: "This is a fantastic product." },
  { id: "5", name: "Product 3", description: "This is a fantastic product." },
];

const ProductList = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Product List</h1>
      <ul className="space-y-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/product/${product.id}`} className="block">
              <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
