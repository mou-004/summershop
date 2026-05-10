"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function MyProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center border border-gray-100">
        
       
        <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <FaUserCircle className="text-orange-500 text-5xl" />
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          Customize your name, photo, and account settings
        </p>

        
        <Link
          href="/update-profile"
          className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Update Profile
        </Link>

      </div>
    </div>
  );
}