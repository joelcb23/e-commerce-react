import { CiLocationOn } from "react-icons/ci";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand / Contact */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-bold text-3xl mb-6">Tech Commerce</h3>
            <p className="text-slate-400 flex items-center gap-2">
              <CiLocationOn />
              <span>742 Evergreen Terrace, Springfield.</span>
            </p>
            <a
              href="mailto:joel.cruz.b03@gmail.com"
              className="my-3 text-slate-400 hover:text-white transition"
            >
              joel.cruz.b03@gmail.com
            </a>
            <a
              href="tel:+91123456789"
              className="text-slate-400 hover:text-white transition"
            >
              +91 123456789
            </a>
          </div>

          {/* Shopping */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg">Shopping</h3>
            <ul className="mt-4 flex flex-col gap-3 text-slate-400">
              <li className="hover:text-white cursor-pointer">Wishlist</li>
              <li className="hover:text-white cursor-pointer">Offers</li>
              <li className="hover:text-white cursor-pointer">Size Guide</li>
            </ul>
          </div>

          {/* Information */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg">Information</h3>
            <ul className="mt-4 flex flex-col gap-3 text-slate-400">
              <li className="hover:text-white cursor-pointer">Track Order</li>
              <li className="hover:text-white cursor-pointer">Shipping</li>
              <li className="hover:text-white cursor-pointer">Gift Cards</li>
            </ul>
          </div>

          {/* Account */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg">Account</h3>
            <ul className="mt-4 flex flex-col gap-3 text-slate-400">
              <li className="hover:text-white cursor-pointer">Cart</li>
              <li className="hover:text-white cursor-pointer">My Account</li>
              <li className="hover:text-white cursor-pointer">My Orders</li>
            </ul>
          </div>

          {/* Socials */}
          <div className="text-center">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <ul className="mt-4 flex justify-center lg:justify-start gap-6 text-slate-400">
              <li>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex flex-col items-center gap-1 hover:text-white transition"
                >
                  <FiFacebook size={20} />
                  <span className="text-sm">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex flex-col items-center gap-1 hover:text-white transition"
                >
                  <FiInstagram size={20} />
                  <span className="text-sm">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex flex-col items-center gap-1 hover:text-white transition"
                >
                  <FiTwitter size={20} />
                  <span className="text-sm">Twitter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 text-center text-sm border-t border-slate-700 pt-6 text-slate-400">
          <p>© 2025 Tech Commerce. Demo project – All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
