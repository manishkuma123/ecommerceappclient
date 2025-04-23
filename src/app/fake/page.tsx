"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; 


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); 
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-black mt-5">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden group transform transition duration-300 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
          > 
          
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-50 object-cover mb-4 group-hover:opacity-80 transition-opacity "
            />
            <div className="p-4  ">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
              <p className="text-lg font-semibold text-gray-600 mb-4">${product.price}</p>
              <Link href={`/fake/${product.id}`} passHref className='mt-1'>
                <motion.button
                    className=" p-4 bg-black text-white py-2 rounded-md text-lg font-medium hover:text-green-400 transition-colors"
                  whileHover={{ scale: 1.1, backgroundColor: '#1D4ED8' }}
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
