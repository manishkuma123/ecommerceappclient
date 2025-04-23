"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; 

// Define the Product type
interface Product {
  _id: string; // Adjust the type according to your API response (could be a number too)
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  stock: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Use the Product type here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://somethinguniqueapp.onrender.com/api/product/all');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); 
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white mt-10 mb-10">
      <h1 className="text-3xl font-semibold text-center text-green-700 mb-8">
        {loading ? 'Loading Products...' : 'All Products'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id} // TypeScript now knows _id exists
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition duration-300 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
          > 
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-50 object-cover mb-4 group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-500 mt-2">{product.category}</p>
              <p className="text-lg font-bold text-green-500 mt-2">${product.price}</p>
              <p className="font-bold text-green-500 mt-2">Stock: {product.stock}</p>

              <Link href={`/product/${product._id}`} passHref className='mt-1'>
                <motion.button
                    className="p-4 bg-black text-white py-2 rounded-md text-lg font-medium mt-2 hover:text-white transition-colors"
                    whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
