"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';

// ✅ Define Product Type
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isSale?: boolean;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://somethinguniqueapp.onrender.com/api/product/all');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
 
      <div className="bg-gray-50 min-h-screen">
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh]">
          <Image
            src="/images/screenss.png"
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
            priority
            alt="Description of image"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4 sm:px-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
              <Typewriter words={["manish kumar"]} loop={1} cursor typeSpeed={50} />
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 max-w-xl font-semibold">
              <Typewriter
                words={["Shop smarter, live better — everything you need in one place."]}
                loop={1}
                cursor
                typeSpeed={40}
                delaySpeed={1200}
              />
            </p>
            <button className="bg-black px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-white text-base sm:text-lg font-semibold hover:bg-green-400 transition duration-300">
              Shop Now
            </button>
          </div>
        </section>

        <section className="py-12 mt-10">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-600 mb-10">
              Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-3 sm:p-5 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 relative"
                >
                  {product.isSale && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-br-lg">
                      Sale
                    </div>
                  )}

                  <img
                    src={product.imageUrl}
                    alt={`Image of ${product.name}`}
                    className="object-cover rounded-md w-full h-36 sm:h-52 md:h-60"
                  />

                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mt-3">{product.name}</h3>
                  <p className="text-sm sm:text-base font-bold text-green-500 mt-1">${product.price}</p>

                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 text-lg sm:text-xl">
                      <Typewriter
                        words={["**", "***", "*****", "******"]}
                        loop={1}
                        cursor
                        typeSpeed={50}
                        delaySpeed={1000}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/product"
                className="text-blue-600 hover:bg-blue-100 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-600 transition duration-300"
              >
                View More
              </Link>
            </div>
          </div>
        </section>
      </div>

  );
};

export default Home;
