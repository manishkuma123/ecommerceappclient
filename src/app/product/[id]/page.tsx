"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://somethinguniqueapp.onrender.com/api/product/all/${id}`);
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

  const addToCart = async (product: any) => {
    const userId = localStorage.getItem("userid");

    if (!userId) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const res = await fetch("https://somethinguniqueapp.onrender.com/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          productId: product._id,
          quantity: 1
        })
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await res.json();
      alert("Product added to cart!");
      console.log("Cart Response:", data);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  if (loading) return <div className="text-center py-8 bg-white">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-8">No product found</div>;

  return (
    <div className="container mx-auto p-6 max-w-screen-lg w-full bg-white mt-20 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 object-contain shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
          <p className="text-lg text-gray-500">Stock: {product.stock}</p>

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
