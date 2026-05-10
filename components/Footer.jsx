export default function Footer() {
  return (
    <footer className="bg-white border-t border-orange-100 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left */}
        <div>
          <h2 className="text-4xl font-bold text-orange-500 mb-4">
            SunCart
          </h2>

          <p className="text-gray-700 mb-2">Dhaka, Bangladesh</p>
          <p className="text-gray-700 mb-2">support@suncart.com</p>
          <p className="text-gray-700">+880 1234-567890</p>
        </div>

        {/* Middle */}
        <div>
          <h3 className="text-3xl font-bold text-orange-500 mb-4">
            Social Links
          </h3>

          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-orange-500 cursor-pointer">Facebook</li>
            <li className="hover:text-orange-500 cursor-pointer">Instagram</li>
            <li className="hover:text-orange-500 cursor-pointer">Twitter</li>
            <li className="hover:text-orange-500 cursor-pointer">YouTube</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-3xl font-bold text-orange-500 mb-4">
            Privacy Policy
          </h3>

          <p className="text-gray-700 leading-7">
            Your data is protected with secure systems and trusted privacy
            standards.
          </p>
        </div>
      </div>

      <div className="border-t border-orange-100 text-center py-4 text-gray-500">
        © 2026 SunCart. All rights reserved.
      </div>
    </footer>
  );
}