"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const footerNavs = [
    {
      label: "Resources",
      items: [
        { href: '/contact', name: 'Contact' },
        { href: '/support', name: 'Support' },
        { href: '/documentation', name: 'Documentation' },
        { href: '/pricing', name: 'Pricing' },
      ],
    },
    {
      label: "About",
      items: [
        { href: '/terms', name: 'Terms' },
        { href: '/license', name: 'License' },
        { href: '/privacy', name: 'Privacy' },
        { href: '/about', name: 'About Us' },
      ],
    },
    {
      label: "Explore",
      items: [
        { href: '/showcase', name: 'Showcase' },
        { href: '/roadmap', name: 'Roadmap' },
        { href: '/language', name: 'Languages' },
        { href: '/blog', name: 'Blog' },
      ],
    },
    {
      label: "Company",
      items: [
        { href: '/partner', name: 'Partners' },
        { href: '/team', name: 'Team' },
        { href: '/career', name: 'Careers' },
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
  };

  return (
    <footer className="bg-black text-white pt-6 pb-6 text-sm sm:text-base">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        {/* Header Section */}
        <div className="space-y-6 sm:flex sm:justify-between sm:items-center">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold sm:text-2xl">
              Manish Kumar's Shopping Website
            </h3>
          </div>

          {/* Subscription Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full sm:w-auto px-4 py-2 rounded-md text-black text-sm outline-none border border-gray-300 focus:border-indigo-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 text-xs sm:text-sm">
          {footerNavs.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-2">{section.label}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="hover:text-gray-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>© 2025 Developed by Manish Kumar</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            {/* Add your social icons or links here */}
            <a href="#" aria-label="Facebook" className="hover:text-gray-400">FB</a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">TW</a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-400">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
