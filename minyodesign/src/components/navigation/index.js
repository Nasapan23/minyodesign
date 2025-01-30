'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation'; // Updated imports for App Router

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const handleNavigation = (e, hash) => {
    e.preventDefault();
    setIsMenuOpen(false);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-[100] outline-none"
      >
        <Image
          src={isMenuOpen ? "/buton-meniu-x.svg" : "/buton-meniu.svg"}
          alt={isMenuOpen ? "Close Menu" : "Open Menu"}
          width={90}
          height={90}
          className="w-20 h-20"
        />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-blue-100 z-[99] flex items-center justify-center"
          >
            <nav className="space-y-6 text-center">
              <motion.a
                href="#acasa"
                onClick={(e) => handleNavigation(e, '#acasa')}
                className="block text-4xl font-bold text-black hover:text-blue-500 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Acasă
              </motion.a>
              <motion.a
                href="#desprenoi"
                onClick={(e) => handleNavigation(e, '#desprenoi')}
                className="block text-4xl font-bold text-black hover:text-blue-500 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Despre Noi
              </motion.a>
              <motion.a
                href="#portofoliu"
                onClick={(e) => handleNavigation(e, '#portofoliu')}
                className="block text-4xl font-bold text-black hover:text-blue-500 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Portofoliu
              </motion.a>
              <div>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="block text-4xl font-bold text-black flex items-center justify-center mx-auto gap-2 hover:text-blue-500 transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <span>Parteneri</span>
                  <motion.span
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl"
                  >
                    ▼
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4shadow-lg rounded-xl p-4 space-y-3 text-center"
                    >
                      <li>
                        <a
                          href="https://nisipeanutech.ro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-2xl font-semibold text-black hover:text-blue-500 transition-colors"
                        >
                          nisipeanutech.ro
                        </a>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}