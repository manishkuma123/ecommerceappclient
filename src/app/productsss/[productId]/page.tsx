"use client";

import { notFound } from "next/navigation";

const products = [
  { id: "1", name: "Product 1", description: "This is a great product.", price: "$100", details: "Detailed information about Product 1." },
  { id: "2", name: "Product 2", description: "This is another great product.", price: "$200", details: "Detailed information about Product 2." },
  { id: "3", name: "Product 3", description: "This is a fantastic product.", price: "$300", details: "Detailed information about Product 3." },
  { id: "4", name: "Product 4", description: "This is yet another great product.", price: "$400", details: "Detailed information about Product 4." },
  { id: "5", name: "Product 5", description: "This is a fantastic product.", price: "$500", details: "Detailed information about Product 5." },
];

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound(); 
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-81">
      <h1 className="text-4xl font-semibold text-gray-900">{product.name}</h1>
      <p className="text-lg text-gray-700 mt-4">{product.description}</p>
      <p className="mt-6 text-xl font-semibold text-blue-600">{product.price}</p>
      <p className="mt-4 text-gray-600">{product.details}</p>
    </div>
  );
};

export default ProductDetail;
