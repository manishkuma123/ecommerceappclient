"use client";
import { useEffect, useState } from "react";

interface CartItem {
  product: {
    _id: string;
    name: string; 
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userid") : null;

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/cart/${userId}`);
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!userId || newQuantity <= 0) return;

    try {
      const res = await fetch("http://localhost:4000/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setCartItems(data.cart.items);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update item.");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!userId) return;

    try {
      const res = await fetch("http://localhost:4000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Remove failed");

      setCartItems(data.cart.items);
    } catch (error) {
      console.error("Remove error:", error);
      alert("Failed to remove item.");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (loading) return <div className="text-center mt-10">Loading your cart...</div>;

  return (
    <div className="mx-auto p-10 max-w-6xl bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl">Your cart is empty.</div>
      ) : (
        <div>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product._id} className="border-b">
                    <td className="px-6 py-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain rounded-lg shadow"
                      />
                    </td>
                    <td className="px-6 py-4">{item.product.name}</td>
                    <td className="px-6 py-4">${item.product.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="px-3 py-1 text-white bg-gray-600 rounded hover:bg-gray-700"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="px-3 py-1 text-white bg-gray-600 rounded hover:bg-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">${item.product.price * item.quantity}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-black">Total: ${totalPrice}</h3>
            <button className="px-6 py-2 text-white bg-black rounded-lg hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 