import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        {/* Upper Footer Section - Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Get to Know Us */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">
              Get to Know Us
            </h5>
            <ul>
              <li className="mb-2">
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/events" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/in-the-media" className="hover:text-white">
                  In the Media
                </Link>
              </li>
              {/* Placeholder for Careers */}
              <li className="mb-2">
                <span className="cursor-pointer hover:text-white">Careers</span>
              </li>
            </ul>
          </div>
          {/* Solutions */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Solutions</h5>
            <ul>
              <li className="mb-2">
                <Link href="/solutions" className="hover:text-white">
                  Overview
                </Link>
              </li>
              {/* Placeholders for other solution links */}
              <li className="mb-2">
                <span className="cursor-pointer hover:text-white">
                  Industry & Technology Platforms
                </span>
              </li>
              <li className="mb-2">
                <span className="cursor-pointer hover:text-white">
                  Business Functions We Work For
                </span>
              </li>
            </ul>
          </div>
          {/* Industries */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">
              Industries
            </h5>
            <ul>
              {/* Example Industry Links - these should be generated dynamically later */}
              <li className="mb-2">
                <Link
                  href="/industry/chemicals-and-natural-resources"
                  className="hover:text-white"
                >
                  Chemicals & Natural Resources
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/industry/energy" className="hover:text-white">
                  Energy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/industry/food-and-nutrition"
                  className="hover:text-white"
                >
                  Food & Nutrition
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/industry/home-and-personal-care"
                  className="hover:text-white"
                >
                  Home & Personal Care
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/industry/industrial-equipment"
                  className="hover:text-white"
                >
                  Industrial Equipment
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/industry/life-sciences"
                  className="hover:text-white"
                >
                  Life Sciences
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/industry/mobility" className="hover:text-white">
                  Mobility
                </Link>
              </li>
            </ul>
          </div>
          {/* Perspectives & Need Help? */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">
              Perspectives
            </h5>
            <ul>
              <li className="mb-2">
                <Link href="/perspectives" className="hover:text-white">
                  By Industry
                </Link>
              </li>
              {/* Placeholder */}
              <li className="mb-2">
                <span className="cursor-pointer hover:text-white">
                  By Strategic Growth Fields
                </span>
              </li>
            </ul>
            <h5 className="text-lg font-semibold text-white mt-6 mb-4">
              Need Help?
            </h5>
            <ul>
              {/* Placeholder */}
              <li className="mb-2">
                <span className="cursor-pointer hover:text-white">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-600 mb-8" />

        {/* Lower Footer Section - Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Cheers Interactive (India) Private
            Limited. All rights reserved. FutureBridge ® is a registered
            trademark...
            {/* Placeholder for Social Links */}
          </div>
          <div className="flex space-x-4">
            {/* Placeholders for legal links */}
            <span className="cursor-pointer hover:text-white">
              Terms of Use
            </span>
            <span className="cursor-pointer hover:text-white">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-white">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
