/* "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const saved = localStorage.getItem("user");

    if (!saved) {
      toast.error("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(saved);

    if (user.email !== email) {
      toast.error("Email not matched");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    window.dispatchEvent(new Event("userChanged"));

    toast.success("Login Successfully");

    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 800);
  };

  const googleLogin = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Google User",
        email: "google@gmail.com",
      })
    );

    window.dispatchEvent(new Event("userChanged"));

    toast.success("Google Login Successful");

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f7efe1] flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md md:max-w-lg bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-orange-500 mb-8">
          Login
        </h1>

        <InputBox
          icon={<FaEnvelope />}
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <InputBox
          icon={<FaLock />}
          placeholder="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-lg mt-2 transition">
          Login
        </button>

        <button
          type="button"
          onClick={googleLogin}
          className="w-full mt-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-2xl text-lg flex justify-center items-center gap-3 transition"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-sm md:text-base text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-orange-500 font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

function InputBox({
  icon,
  placeholder,
  value,
  setValue,
  type = "text",
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 mb-4 border border-gray-200">
      <span className="text-gray-500 text-lg">{icon}</span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none text-black placeholder-gray-500 text-base md:text-lg"
      />
    </div>
  );
}
*/

"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const hasShownToast = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);

    const userName = email.split("@")[0];

    /* Save user  */
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: userName,
        email: email,
        image: `https://ui-avatars.com/api/?name=${userName}&background=f97316&color=fff`,
      })
    );

    localStorage.setItem("isLoggedIn", "true");

    setTimeout(() => {
      if (!hasShownToast.current) {
        hasShownToast.current = true;
        toast.success("Login Successful! 🎉");
      }

      router.push("/");
      router.refresh();
      setIsLoading(false);
    }, 700);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[#f7efe1] flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md md:max-w-lg bg-white/40 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 md:p-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-orange-500 mb-8">
          Login
        </h1>

        <InputBox
          icon={<FaEnvelope />}
          placeholder="Email"
          value={email}
          setValue={setEmail}
          type="email"
        />

        <InputBox
          icon={<FaLock />}
          placeholder="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-lg mt-2 transition ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-white border border-gray-300 hover:bg-orange-50 hover:border-orange-400 text-black font-semibold py-4 rounded-2xl text-lg flex justify-center items-center gap-3 transition"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-sm md:text-base text-black">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-orange-500 font-bold hover:text-orange-600 hover:underline transition"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

function InputBox({ icon, placeholder, value, setValue, type = "text" }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 mb-4 border border-gray-200 hover:border-orange-400 transition">
      <span className="text-gray-500 text-lg">{icon}</span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none text-black placeholder-gray-500"
      />
    </div>
  );
}
