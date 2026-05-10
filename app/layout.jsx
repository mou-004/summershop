/* import "./globals.css";
import Providers from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SunCart",
  description: "Summer Essentials Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fff5e8] min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <Toaster position="top-right" />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
  */

import "./globals.css";

import Providers from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SunCart",
  description: "Summer Essentials Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fff5e8]">
        <Providers>
          <Navbar />

          {/* Toast Message */}
       <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#ffffff",
                color: "#000000",
                border: "1px solid #fed7aa",
                fontWeight: "600",
                padding: "14px 18px",
                borderRadius: "14px",
              },
              success: {
                iconTheme: {
                  primary: "#f97316",
                  secondary: "#ffffff",
                },
              },
            }}
          />

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}

