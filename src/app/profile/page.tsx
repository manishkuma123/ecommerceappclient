"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
 const router = useRouter()
  useEffect(() => {
   
    setTimeout(() => {
      setUserName(localStorage.getItem("username"));
      setUserEmail(localStorage.getItem("email"));
      setAddress(localStorage.getItem("userAddress"));
      setLoading(false);
    }, 400);
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('username')
    localStorage.removeItem('email')
     
    window.dispatchEvent(new Event("user-logged-out"));
   
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {loading ? (
        <div className="text-gray-600 text-lg animate-pulse">Loading profile...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {userName || "Guest User"}
                </h1>
                <p className="text-gray-500">{userEmail || "No email available"}</p>
              </div>
            </div>
          </div>

          <div className="border-t my-6" />

          <div className="space-y-4 text-gray-700">
            <div>
              <h2 className="font-semibold text-gray-800">Address</h2>
              <p>{address || "No address set"}</p>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 font-medium transition"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
