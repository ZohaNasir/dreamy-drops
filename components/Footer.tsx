import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#f8f8f8] pt-16 pb-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold tracking-widest uppercase mb-6 text-gray-900">
              Dreamy Drops
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Handcrafted, minimal, and elegant jewelry for everyday wear. Ethically sourced and carefully curated to elevate your style.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/dreamy_drops8" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors text-sm font-medium">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-gray-600 hover:text-black transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=Necklaces" className="text-sm text-gray-600 hover:text-black transition-colors">Necklaces</Link></li>
              <li><Link href="/shop?category=Earrings" className="text-sm text-gray-600 hover:text-black transition-colors">Earrings</Link></li>
              <li><Link href="/shop?category=Rings" className="text-sm text-gray-600 hover:text-black transition-colors">Rings</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-600 hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link href="/care" className="text-sm text-gray-600 hover:text-black transition-colors">Jewelry Care</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black flex-grow"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Dreamy Drops. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
