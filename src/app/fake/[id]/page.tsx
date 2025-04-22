"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  



  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product._id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  if (loading) return <div className="text-center py-8  bg-white">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-8">No product found</div>;

  return (
    <div className="container mx-auto p-6 max-w-screen-lg w-full bg-white mt-20 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     
        <div className="flex justify-center items-center">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-800">{product.title}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600">${product.price}</p>

         
          <motion.button
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transform transition duration-200 ease-in-out hover:bg-black hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </motion.button>

         
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
