"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCamera, FaUserEdit } from "react-icons/fa";

export default function UpdateProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("customProfileName") || "";
    const savedImage = localStorage.getItem("customProfileImage") || "";

    setName(savedName);
    setImage(savedImage);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);

    localStorage.setItem("customProfileName", name.trim());
    localStorage.setItem("customProfileImage", image.trim());

    toast.success("Profile Updated Successfully");

    setTimeout(() => {
      router.push("/my-profile");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-[#fff7ed] to-orange-100 flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl p-8 md:p-10 border border-orange-100">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <FaUserEdit className="text-2xl text-orange-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500">
            Update Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Change your name and profile photo
          </p>
        </div>

        

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold text-black">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 outline-none focus:border-orange-500 text-black"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 font-semibold text-black">
              Profile Image URL
            </label>

            <input
              type="text"
              placeholder="Paste image link here"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 outline-none focus:border-orange-500 text-black"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-lg transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}