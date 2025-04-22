"use client";

import axios from "axios";
import { useState } from "react";
import { redirect,useRouter } from 'next/navigation'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
   

    try {
      setLoading(true);
      setError(null); 
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password
      });
      const token = response.data.token;
      const userdata = response.data.userdata;
      if (token) {
      
        localStorage.setItem("token", token); 
        localStorage.setItem("userid", userdata.userid); 
        localStorage.setItem("username", userdata.username); 
        localStorage.setItem("email", userdata.email); 
        window.dispatchEvent(new Event("user-logged-in"));
      }
  
      console.log("Response from server:", response.data);
   
      alert("Login successful!");
setEmail("")
setPassword("")


router.push('/')

    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <main className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
          <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

         
          
          
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          <button
            type="submit"
            disabled={loading} 
            className="py-2 mt-4 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
           Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
