"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function Navbar() {
  const { data: session, status } = useSession();

  const [liveName, setLiveName] = useState("User");
  const [liveImage, setLiveImage] = useState("");

  const avatarImage = liveImage || session?.user?.image || "";

  useEffect(() => {
    const loadUser = () => {
      const savedName =
        localStorage.getItem("customProfileName") ||
        session?.user?.name ||
        "User";

      const savedImage = localStorage.getItem("customProfileImage");

      const finalImage =
        savedImage && savedImage !== "null" && savedImage !== "undefined"
          ? savedImage
          : session?.user?.image || "";

      setLiveName(savedName);
      setLiveImage(finalImage);
    };

    loadUser();
  }, [session]);

  const handleLogout = async () => {
    localStorage.removeItem("customProfileName");
    localStorage.removeItem("customProfileImage");

    toast.success("Logged out successfully");

    await signOut({ callbackUrl: "/" });
  };

  /* React Spring Logo Animation */
  const logoAnimation = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(-30px) scale(0.8)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0px) scale(1)",
    },
    config: {
      tension: 220,
      friction: 14,
    },
  });

  return (
    <nav className="sticky top-0 z-50 px-4 md:px-10 py-4 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        {/* Logo */}
        <animated.div style={logoAnimation}>
          <Link
            href="/"
            className="text-3xl md:text-5xl font-extrabold text-orange-500 hover:scale-105 transition block"
          >
            SunCart
          </Link>
        </animated.div>

        {/* Menu */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-black">
          <Link
            href="/"
            className="font-semibold hover:text-orange-500 transition"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="font-semibold hover:text-orange-500 transition"
          >
            Products
          </Link>

          <Link
            href="/my-profile"
            className="font-semibold hover:text-orange-500 transition"
          >
            My Profile
          </Link>

          {status === "loading" ? (
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          ) : status === "authenticated" ? (
            <>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md">
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border-2 border-orange-400 bg-white"
                    onError={() => {
                      localStorage.removeItem("customProfileImage");
                      setLiveImage("");
                    }}
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-orange-500" />
                )}

                <span className="font-semibold text-sm md:text-base text-black">
                  {liveName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-semibold hover:text-orange-500 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}