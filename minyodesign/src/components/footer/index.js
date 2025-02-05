'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const handleNavigation = (e, hash) => {
    e.preventDefault();

    // If not on the home page, navigate to the home page with the hash
    if (pathname !== '/') {
      router.push(`/${hash}`);
    } else {
      // If already on the home page, scroll to the section
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', hash); // Update the URL with the hash
    }
  };

  return (
    <footer className="bg-white shadow-lg">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Website Logo */}
        <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
          <Image 
            src="/logo.png" // Change this to your actual logo
            alt="Website Logo"
            width={70}
            height={70}
            className="h-auto"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-blue-300 font-semibold text-base">
          <a href="#acasa" onClick={(e) => handleNavigation(e, '#acasa')} className="hover:opacity-70 transition-opacity">
            Acasă
          </a>
          <a href="#desprenoi" onClick={(e) => handleNavigation(e, '#desprenoi')} className="hover:opacity-70 transition-opacity">
            Despre Noi
          </a>
          <a href="#portofoliu" onClick={(e) => handleNavigation(e, '#portofoliu')} className="hover:opacity-70 transition-opacity">
            Portofoliu
          </a>
          <a href="/gdpr" className="hover:opacity-70 transition-opacity">
            GDPR
          </a>
          <a href="#contact" onClick={(e) => handleNavigation(e, '#contact')} className="hover:opacity-70 transition-opacity">
            Contact
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end space-x-5 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:opacity-70 transition-opacity"
          >
            <FaFacebook size={26} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:opacity-70 transition-opacity"
          >
            <FaInstagram size={26} />
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:opacity-70 transition-opacity"
          >
            <FaWhatsapp size={26} />
          </a>
        </div>

      </div>

      {/* Bottom Section with Visible Blue Divider */}
      <div className="relative">
        <div className="h-[1px] bg-blue-300 w-full"></div> {/* Thin, visible blue divider */}
        <div className="text-center py-3">
          <p className="text-blue-300 text-sm font-medium">
            Web Development & Concept by{' '}
            <a
              href="https://nisipeanutech.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              nisipeanutech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
