/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
      })
    );

    toast.success("Registered Successfully");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const googleRegister = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Google User",
        email: "google@gmail.com",
      })
    );

    toast.success("Google Register Success");

    window.dispatchEvent(new Event("userChanged"));

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f7efe1] flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md md:max-w-lg bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-orange-500 mb-8">
          Register
        </h1>

        <InputBox
          icon={<FaUser />}
          placeholder="Full Name"
          value={name}
          setValue={setName}
        />

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
          Register
        </button>

        <button
          type="button"
          onClick={googleRegister}
          className="w-full mt-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-2xl text-lg flex justify-center items-center gap-3 transition"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-sm md:text-base text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-bold hover:underline"
          >
            Login
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

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react"; // ADD THIS

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    localStorage.setItem(
  "user",
  JSON.stringify({
    name,
    email,
    password,
  })
);

    toast.success("Registered Successfully");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  // REAL GOOGLE LOGIN
  const googleRegister = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7efe1] flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md md:max-w-lg bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-orange-500 mb-8">
          Register
        </h1>

        <InputBox
          icon={<FaUser />}
          placeholder="Full Name"
          value={name}
          setValue={setName}
        />

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
          Register
        </button>

        <button
          type="button"
          onClick={googleRegister}
          className="w-full mt-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-2xl text-lg flex justify-center items-center gap-3 transition"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-sm md:text-base text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-bold hover:underline"
          >
            Login
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
